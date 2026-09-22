import {
  CONTACT_ERROR_MESSAGE,
  createEmptyContactFormData,
  normalizeContactFormData,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormData,
} from "./contactForm.ts";

export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

type ContactHandlerOptions = {
  env?: ContactEnv;
  fetchImpl?: typeof fetch;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function buildContactEmailText(formData: ContactFormData, request: Request) {
  const lines = [
    "New contact enquiry from echoin.ink",
    "",
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Exploration: ${formData.exploration || "Not specified"}`,
    `Project URL: ${formData.projectUrl || "Not provided"}`,
    "",
    "Message:",
    formData.message,
    "",
    `Origin: ${request.headers.get("origin") || "Unavailable"}`,
    `User-Agent: ${request.headers.get("user-agent") || "Unavailable"}`,
  ];

  return lines.join("\n");
}

function validateServerPayload(payload: unknown) {
  const candidate =
    payload && typeof payload === "object"
      ? (payload as Partial<Record<keyof ContactFormData, unknown>>)
      : {};

  const formData = normalizeContactFormData(
    createEmptyContactFormData({
      name: typeof candidate.name === "string" ? candidate.name : "",
      email: typeof candidate.email === "string" ? candidate.email : "",
      exploration:
        typeof candidate.exploration === "string" ? candidate.exploration : "",
      projectUrl:
        typeof candidate.projectUrl === "string" ? candidate.projectUrl : "",
      message: typeof candidate.message === "string" ? candidate.message : "",
      company: typeof candidate.company === "string" ? candidate.company : "",
    }),
  );

  const fieldErrors = validateContactForm(formData);

  if (formData.exploration.length > 120) {
    fieldErrors.message =
      fieldErrors.message ??
      "Please shorten the enquiry details and try again.";
  }

  if (formData.company) {
    return {
      formData,
      fieldErrors: {
        message: "Your message could not be verified. Please try again.",
      } satisfies ContactFieldErrors,
    };
  }

  return {
    formData,
    fieldErrors,
  };
}

async function sendWithResend(
  formData: ContactFormData,
  request: Request,
  env: Required<ContactEnv>,
  fetchImpl: typeof fetch,
) {
  const resendResponse = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: formData.email,
      subject: `New contact enquiry from ${formData.name}`,
      text: buildContactEmailText(formData, request),
    }),
  });

  if (!resendResponse.ok) {
    return false;
  }

  return true;
}

export async function handleContactRequest(
  request: Request,
  options: ContactHandlerOptions = {},
) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return jsonResponse(
      {
        ok: false,
        message: "Please submit the contact form again.",
      },
      415,
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Please submit the contact form again.",
      },
      400,
    );
  }

  const { formData, fieldErrors } = validateServerPayload(payload);

  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse(
      {
        ok: false,
        message: CONTACT_ERROR_MESSAGE,
        fieldErrors,
      },
      400,
    );
  }

  const env = {
    RESEND_API_KEY: options.env?.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: options.env?.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: options.env?.CONTACT_TO_EMAIL,
  };

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
    return jsonResponse(
      {
        ok: false,
        message: CONTACT_ERROR_MESSAGE,
      },
      500,
    );
  }

  try {
    const delivered = await sendWithResend(
      formData,
      request,
      env as Required<ContactEnv>,
      options.fetchImpl ?? fetch,
    );

    if (!delivered) {
      return jsonResponse(
        {
          ok: false,
          message: CONTACT_ERROR_MESSAGE,
        },
        502,
      );
    }

    return jsonResponse({ ok: true }, 200);
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: CONTACT_ERROR_MESSAGE,
      },
      500,
    );
  }
}

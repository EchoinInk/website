export const CONTACT_SUCCESS_MESSAGE =
  "Thank you. Your message is on its way. Echo in Ink will review your enquiry and reply by email.";

export const CONTACT_ERROR_MESSAGE =
  "Your message could not be sent just yet. Please try again, or email directly.";

export const CONTACT_DIRECT_EMAIL = "hello@echoin.ink";

export type ContactFormState = "idle" | "submitting" | "success" | "error";

export type ContactFormData = {
  name: string;
  email: string;
  exploration: string;
  projectUrl: string;
  message: string;
  company: string;
};

export type ContactFieldName = keyof Pick<
  ContactFormData,
  "name" | "email" | "projectUrl" | "message"
>;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimValue(value: string) {
  return value.trim();
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function createEmptyContactFormData(
  overrides: Partial<ContactFormData> = {},
): ContactFormData {
  return {
    name: "",
    email: "",
    exploration: "",
    projectUrl: "",
    message: "",
    company: "",
    ...overrides,
  };
}

export function normalizeContactFormData(
  formData: ContactFormData,
): ContactFormData {
  return {
    name: trimValue(formData.name),
    email: trimValue(formData.email).toLowerCase(),
    exploration: trimValue(formData.exploration),
    projectUrl: trimValue(formData.projectUrl),
    message: trimValue(formData.message),
    company: trimValue(formData.company),
  };
}

export function validateContactForm(
  rawFormData: ContactFormData,
): ContactFieldErrors {
  const formData = normalizeContactFormData(rawFormData);
  const errors: ContactFieldErrors = {};

  if (!formData.name) {
    errors.name = "Please enter your name.";
  } else if (formData.name.length < 2) {
    errors.name = "Please enter the name you would like us to reply to.";
  } else if (formData.name.length > 80) {
    errors.name = "Please keep your name under 80 characters.";
  }

  if (!formData.email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  } else if (formData.email.length > 160) {
    errors.email = "Please keep your email address under 160 characters.";
  }

  if (formData.projectUrl) {
    if (formData.projectUrl.length > 240) {
      errors.projectUrl = "Please keep the project URL under 240 characters.";
    } else if (!isHttpUrl(formData.projectUrl)) {
      errors.projectUrl =
        "Please enter a valid project URL, including http:// or https://.";
    }
  }

  if (!formData.message) {
    errors.message = "Please tell us what you are building.";
  } else if (formData.message.length < 20) {
    errors.message = "Please share a little more detail so we can respond well.";
  } else if (formData.message.length > 2500) {
    errors.message = "Please keep your message under 2500 characters.";
  }

  return errors;
}

export class ContactSubmissionError extends Error {
  fieldErrors?: ContactFieldErrors;

  constructor(message: string, fieldErrors?: ContactFieldErrors) {
    super(message);
    this.name = "ContactSubmissionError";
    this.fieldErrors = fieldErrors;
  }
}

type SubmitContactFormOptions = {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
};

export async function submitContactForm(
  formData: ContactFormData,
  options: SubmitContactFormOptions = {},
) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 12000;
  const timeoutId = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(normalizeContactFormData(formData)),
      signal: controller.signal,
    });

    let payload: {
      ok?: boolean;
      message?: string;
      fieldErrors?: ContactFieldErrors;
    } | null = null;

    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok || payload?.ok !== true) {
      throw new ContactSubmissionError(
        payload?.message ?? CONTACT_ERROR_MESSAGE,
        payload?.fieldErrors,
      );
    }
  } catch (error) {
    if (error instanceof ContactSubmissionError) {
      throw error;
    }

    throw new ContactSubmissionError(CONTACT_ERROR_MESSAGE);
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}

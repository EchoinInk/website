import {
  CONTACT_ERROR_MESSAGE,
  createEmptyContactFormData,
} from "@/lib/contactForm";
import { handleContactRequest } from "@/lib/contactServer";

const validPayload = createEmptyContactFormData({
  name: "Avery Reed",
  email: "avery@example.com",
  exploration: "Project Inquiry",
  projectUrl: "https://example.com/project",
  message:
    "We are rebuilding a brand world and need a more considered identity and website direction.",
});

const env = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_FROM_EMAIL: "Echo in Ink <hello@studio.example>",
  CONTACT_TO_EMAIL: "hello@echoin.ink",
};

describe("handleContactRequest", () => {
  it("fails safely when Cloudflare runtime bindings are unavailable", async () => {
    const resendFetch = vi.fn();
    const response = await handleContactRequest(
      new Request("https://echoin.ink/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validPayload),
      }),
      { fetchImpl: resendFetch as typeof fetch },
    );

    expect(response.status).toBe(500);
    expect(resendFetch).not.toHaveBeenCalled();
    expect(await response.json()).toEqual({
      ok: false,
      message: CONTACT_ERROR_MESSAGE,
    });
  });

  it("rejects invalid payloads with field errors", async () => {
    const resendFetch = vi.fn();
    const response = await handleContactRequest(
      new Request("https://echoin.ink/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          createEmptyContactFormData({
            name: "",
            email: "not-an-email",
            message: "short",
          }),
        ),
      }),
      { env, fetchImpl: resendFetch as typeof fetch },
    );

    expect(response.status).toBe(400);
    expect(resendFetch).not.toHaveBeenCalled();

    const payload = await response.json();
    expect(payload.ok).toBe(false);
    expect(payload.message).toBe(CONTACT_ERROR_MESSAGE);
    expect(payload.fieldErrors.name).toBe("Please enter your name.");
    expect(payload.fieldErrors.email).toBe("Please enter a valid email address.");
  });

  it("sends valid payloads through Resend", async () => {
    const resendFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const response = await handleContactRequest(
      new Request("https://echoin.ink/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://echoin.ink",
          "User-Agent": "Vitest",
        },
        body: JSON.stringify(validPayload),
      }),
      { env, fetchImpl: resendFetch as typeof fetch },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(resendFetch).toHaveBeenCalledTimes(1);

    const [url, init] = resendFetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    });

    const resendBody = JSON.parse(init.body as string);
    expect(resendBody.reply_to).toBe(validPayload.email);
    expect(resendBody.to).toEqual([env.CONTACT_TO_EMAIL]);
    expect(resendBody.subject).toContain(validPayload.name);
    expect(resendBody.text).toContain(validPayload.message);
  });
});

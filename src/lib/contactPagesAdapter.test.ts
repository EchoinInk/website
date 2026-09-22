import { createEmptyContactFormData } from "@/lib/contactForm";
import {
  onRequest,
  onRequestPost,
  type ContactPagesContext,
} from "../../functions/api/contact";

const env = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_FROM_EMAIL: "Echo in Ink <hello@studio.example>",
  CONTACT_TO_EMAIL: "hello@echoin.ink",
};

const validPayload = createEmptyContactFormData({
  name: "Avery Reed",
  email: "avery@example.com",
  exploration: "Project Inquiry",
  projectUrl: "https://example.com/project",
  message:
    "We are rebuilding a brand world and need a more considered identity and website direction.",
});

function createContext(
  payload: unknown,
  overrides: Partial<ContactPagesContext> = {},
): ContactPagesContext {
  return {
    request: new Request("https://echoin.ink/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }),
    env,
    ...overrides,
  };
}

describe("Cloudflare Pages contact adapter", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("forwards context.env to Resend for a valid POST", async () => {
    const resendFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", resendFetch);

    const response = await onRequestPost(createContext(validPayload));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(resendFetch).toHaveBeenCalledTimes(1);

    const [url, init] = resendFetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers).toMatchObject({
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    });

    const body = JSON.parse(init.body as string);
    expect(body.from).toBe(env.CONTACT_FROM_EMAIL);
    expect(body.to).toEqual([env.CONTACT_TO_EMAIL]);
    expect(body.reply_to).toBe(validPayload.email);
  });

  it("returns field errors for an invalid payload without calling Resend", async () => {
    const resendFetch = vi.fn();
    vi.stubGlobal("fetch", resendFetch);

    const response = await onRequestPost(
      createContext(
        createEmptyContactFormData({
          name: "",
          email: "not-an-email",
          message: "short",
        }),
      ),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.fieldErrors.name).toBe("Please enter your name.");
    expect(body.fieldErrors.email).toBe("Please enter a valid email address.");
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects honeypot submissions without calling Resend", async () => {
    const resendFetch = vi.fn();
    vi.stubGlobal("fetch", resendFetch);

    const response = await onRequestPost(
      createContext({ ...validPayload, company: "Automated submission" }),
    );

    expect(response.status).toBe(400);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("fails safely when Pages runtime bindings are missing", async () => {
    const resendFetch = vi.fn();
    vi.stubGlobal("fetch", resendFetch);

    const response = await onRequestPost(
      createContext(validPayload, { env: {} }),
    );

    expect(response.status).toBe(500);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("returns a retryable gateway error when Resend rejects the request", async () => {
    const resendFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Rejected" }), { status: 400 }),
    );
    vi.stubGlobal("fetch", resendFetch);

    const response = await onRequestPost(createContext(validPayload));

    expect(response.status).toBe(502);
    expect(resendFetch).toHaveBeenCalledTimes(1);
  });

  it("preserves the shared 405 response for unsupported methods", async () => {
    const response = await onRequest({
      request: new Request("https://echoin.ink/api/contact", { method: "GET" }),
      env,
    });

    expect(response.status).toBe(405);
    expect(await response.json()).toEqual({
      ok: false,
      message: "Method not allowed.",
    });
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { primaryCapabilities, projectInquiryTypeOptions } from "@/data/servicesContent";
import { siteActionLabels } from "@/data/siteNavigation";
import { ContactPage } from "@/pages/ContactPage";

function renderContactPage(initialEntry = "/contact") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <ContactPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/^Name/), {
    target: { value: "Avery Reed" },
  });
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { value: "avery@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/^What are you trying to achieve/), {
    target: {
      value:
        "We are building a more considered studio presence and need help clarifying the identity and direction.",
    },
  });
}

describe("ContactPage", () => {
  const fetchMock = vi.fn();

  beforeAll(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("shows inline validation errors before submitting", async () => {
    renderContactPage();

    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please tell us what you are building.")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toHaveFocus();
  });

  it("validates a field on blur and associates its error accessibly", async () => {
    renderContactPage();

    const email = screen.getByLabelText(/^Email/);
    fireEvent.change(email, { target: { value: "not-an-email" } });
    fireEvent.blur(email);

    const error = await screen.findByText("Please enter a valid email address.");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby", error.id);
    expect(email).toHaveAttribute("aria-errormessage", error.id);
  });

  it("uses the shared capability taxonomy without requiring a technical diagnosis", () => {
    renderContactPage();

    expect(projectInquiryTypeOptions).toEqual([
      ...primaryCapabilities.map(({ title }) => title),
      "Digital Reset",
      "Something else / Not sure yet",
    ]);
    expect(
      screen.getByText(/you do not need to arrive with a predefined technical solution/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request a strategy session/i })).toHaveAttribute(
      "href",
      "/booking",
    );
  });

  it("preserves project intent from the established query string", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderContactPage("/contact?inquiry=project");
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText(/what has changed/i), {
      target: { value: "The current site no longer reflects the business." },
    });
    fireEvent.change(screen.getByLabelText(/when are you hoping to begin/i), {
      target: { value: "November, but flexible" },
    });
    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init?.body as string);
    expect(body.exploration).toBe("Project Inquiry");
    expect(body.message).toContain("What has changed or isn't working?");
    expect(body.message).toContain("November, but flexible");
  });

  it("submits a selected project type through the existing exploration field", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    renderContactPage();
    fillRequiredFields();
    fireEvent.click(
      screen.getByRole("button", {
        name: /what kind of project does this seem closest to/i,
      }),
    );
    fireEvent.click(screen.getByRole("option", { name: "Brand & Identity" }));
    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(init?.body as string).exploration).toBe("Brand & Identity");
  });

  it("renders the confirmed success state after a real response", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    renderContactPage();
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
        }),
      ),
    );

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Thank you. Your project enquiry is on its way.",
      ),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Echo in Ink will review your enquiry and reply by email.",
    );
  });

  it("announces submission progress and prevents duplicate submission", async () => {
    let resolveRequest: ((response: Response) => void) | undefined;
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderContactPage();
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    const form = screen.getByRole("button", { name: "Sending Project Enquiry..." }).closest("form");
    expect(form).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Sending Project Enquiry..." })).toBeDisabled();
    expect(screen.getByText("Sending your project enquiry...")).toBeInTheDocument();

    resolveRequest?.(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await screen.findByText("Thank you. Your project enquiry is on its way.");
  });

  it("shows a retryable error state and can recover on the next submit", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down")).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    renderContactPage();
    fillRequiredFields();

    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your message could not be sent just yet. Please try again, or email directly.",
    );
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Avery Reed");
    expect(screen.getByLabelText(/^Email/)).toHaveValue("avery@example.com");
    expect(screen.getByLabelText(/^What are you trying to achieve/)).toHaveValue(
      "We are building a more considered studio presence and need help clarifying the identity and direction.",
    );
    expect(screen.getByRole("button", { name: "Send Project Enquiry Again" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Send Project Enquiry Again" }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Thank you. Your project enquiry is on its way.",
      ),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Echo in Ink will review your enquiry and reply by email.",
    );
  });

  it("associates server validation errors and focuses the first invalid field", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: false,
          message: "Please check the highlighted fields and try again.",
          fieldErrors: { email: "Please use a different email address." },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      ),
    );

    renderContactPage();
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: siteActionLabels.sendProjectEnquiry }));

    const error = await screen.findByText("Please use a different email address.");
    const email = screen.getByLabelText(/^Email/);
    await waitFor(() => expect(email).toHaveFocus());
    expect(email).toHaveAttribute("aria-describedby", error.id);
    expect(email).toHaveValue("avery@example.com");
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { BookingPage } from "@/pages/BookingPage";

const motionPreference = vi.hoisted(() => ({ reduced: false }));

vi.mock("framer-motion", async () => {
  const React = await import("react");

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    initial?: unknown;
    animate?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
    variants?: unknown;
  };

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) =>
        function MotionElement({
          children,
          initial,
          animate: _animate,
          whileInView: _whileInView,
          viewport: _viewport,
          variants: _variants,
          ...props
        }: MotionProps) {
          return React.createElement(
            tag,
            {
              ...props,
              "data-motion-initial": initial === false ? "false" : undefined,
            },
            children,
          );
        },
    },
  );

  return { motion, useReducedMotion: () => motionPreference.reduced };
});

function renderBookingPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

async function moveToReviewStep() {
  fireEvent.click(
    screen.getByRole("button", { name: /continue with request/i }),
  );

  fireEvent.change(screen.getByLabelText(/preferred week/i), {
    target: { value: "Week of 6 July" },
  });
  fireEvent.change(screen.getByLabelText(/^timezone/i), {
    target: { value: "America/Los_Angeles" },
  });
  fireEvent.change(screen.getByLabelText(/preferred contact method/i), {
    target: { value: "Email reply is fine" },
  });
  fireEvent.click(screen.getByRole("button", { name: /add your details/i }));

  fireEvent.change(screen.getByLabelText(/^name/i), {
    target: { value: "Ari Example" },
  });
  fireEvent.change(screen.getByLabelText(/^email/i), {
    target: { value: "ari@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/session topic/i), {
    target: { value: "Naming direction" },
  });
  fireEvent.change(screen.getByLabelText(/short context/i), {
    target: {
      value: "The offer feels clear in feeling, but not yet in language.",
    },
  });
  fireEvent.click(screen.getByRole("button", { name: /review request/i }));

  await screen.findByText(/review the request before you send it/i);
}

describe("BookingPage", () => {
  beforeEach(() => {
    motionPreference.reduced = false;
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows validation feedback before advancing past timing details", async () => {
    renderBookingPage();

    fireEvent.click(
      screen.getByRole("button", { name: /continue with request/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /add your details/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please correct the highlighted timing details.",
    );
    expect(
      screen.getByText(
        "Name the week that feels most workable, or say that you are flexible.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Add the timezone you want the reply to use."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred week/i)).toHaveFocus();
  });

  it("presents the standalone Strategy Session contract without public pricing", () => {
    renderBookingPage();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Book focused time around one defined question.",
    );
    expect(screen.getAllByText(/60–90 minutes/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/it can stand alone/i)).toBeInTheDocument();
    expect(screen.queryByText(/\$120|\$150/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders every conversion section immediately when reduced motion is preferred", () => {
    motionPreference.reduced = true;
    const { container } = renderBookingPage();

    expect(container.querySelectorAll('[data-motion-initial="false"].ei-booking-intro-grid'))
      .toHaveLength(1);
    expect(container.querySelectorAll('[data-motion-initial="false"].ei-booking-layout'))
      .toHaveLength(1);
    expect(screen.getByRole("heading", { name: /have a larger project in mind/i }))
      .toBeInTheDocument();
  });

  it("supports failure and retry before showing the request-sent state", async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: false }), {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

    renderBookingPage();
    await moveToReviewStep();

    fireEvent.click(screen.getByRole("button", { name: /send request/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The session request service did not accept the request.",
    );

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    await waitFor(() => {
      expect(screen.getByText("Your session request is on its way.")).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        "Echo in Ink will reply with available times and a suggested next step.",
      ),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe("/api/contact");
    expect(init).toMatchObject({
      method: "POST",
      headers: expect.objectContaining({
        "Content-Type": "application/json",
      }),
    });

    const body = JSON.parse(init?.body as string);
    expect(body.exploration).toBe("Echo Session Request");
    expect(body.message).toContain("Echo Session request");
    expect(body.message).toContain("duration: 60–90 minutes");
    expect(body.message).not.toContain("price:");
    expect(body.message).toContain("preferredWeek: Week of 6 July");
    expect(body.message).toContain("timezone: America/Los_Angeles");
    expect(body.message).toContain("sessionTopic: Naming direction");
  });
});

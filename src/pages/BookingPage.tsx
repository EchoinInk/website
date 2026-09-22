import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { EchoFormField } from "@/components/ui/EchoFormField";
import { EchoFormPanel } from "@/components/ui/EchoFormPanel";
import { EchoTextarea } from "@/components/ui/EchoTextarea";
import { IconWell } from "@/components/ui/IconWell";
import {
  OrbitalVisual,
  type OrbitalVariant,
} from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { primaryCallToAction } from "@/data/siteNavigation";
import {
  StudioInquirySubmitError,
  submitStudioInquiry,
} from "@/lib/studioInquiry";
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const steps = ["Session", "Timing", "Details", "Review"] as const;

const sessionFacts = [
  { label: "Duration", value: "60–90 minutes" },
  { label: "Focus", value: "One defined question" },
  { label: "Format", value: "Private video session" },
  { label: "Reply", value: "Available times sent after review" },
];

const practicalInformation: Array<{
  title: string;
  description: string;
}> = [
  {
    title: "Timezone handling",
    description:
      "Share the timezone you actually work in. Echo in Ink replies with options in your timezone and in New Zealand time.",
  },
  {
    title: "What happens next",
    description:
      "Requests are reviewed before any time is suggested. A reply includes available times and a recommended next step.",
  },
  {
    title: "What to bring",
    description:
      "Drafts, references, screenshots or short context notes are welcome when they help explain the question.",
  },
  {
    title: "Recording and consent",
    description:
      "A recording is only made when everyone in the room agrees in advance. Nothing is recorded by default.",
  },
];

const afterRequest: Array<{
  title: string;
  description: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Request",
    description:
      "You send the week, timezone, and context that would make the session useful.",
    icon: "haloGate",
  },
  {
    title: "Review",
    description:
      "Echo in Ink reads the request and checks whether the room fits the question you are bringing.",
    icon: "threadBeacon",
  },
  {
    title: "Reply",
    description:
      "You receive available times and a suggested next step, in your timezone and in New Zealand time.",
    icon: "focusDial",
  },
  {
    title: "Confirm",
    description:
      "A session is only confirmed after a real time is offered and you choose to accept it.",
    icon: "signalBridge",
  },
];

type BookingFormData = {
  name: string;
  email: string;
  preferredWeek: string;
  timezone: string;
  topic: string;
  context: string;
  contactMethod: string;
};

type BookingFieldName = keyof BookingFormData;

type BookingFieldEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | {
      target: {
        name: string;
        value: string;
      };
    };

type BookingStatus =
  | "idle"
  | "submitting"
  | "validation-error"
  | "request-sent"
  | "request-failed";

type BookingErrors = Partial<Record<BookingFieldName, string>>;

const stepFieldMap: Array<BookingFieldName[]> = [
  [],
  ["preferredWeek", "timezone"],
  ["name", "email", "topic", "context"],
  [],
];

function scrollToBookingFlow(reducedMotion = false) {
  document
    .getElementById("booking-flow")
    ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

const bookingFieldIds: Record<BookingFieldName, string> = {
  name: "booking-name",
  email: "booking-email",
  preferredWeek: "booking-preferred-week",
  timezone: "booking-timezone",
  topic: "booking-topic",
  context: "booking-context",
  contactMethod: "booking-contact-method",
};

function firstInvalidField(errors: BookingErrors) {
  return (Object.keys(bookingFieldIds) as BookingFieldName[]).find(
    (field) => errors[field],
  );
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getFieldError(
  field: BookingFieldName,
  value: string,
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      return trimmed ? undefined : "Enter the name the reply should come back to.";
    case "email":
      if (!trimmed) {
        return "Enter the email address for the session reply.";
      }

      return validateEmail(trimmed)
        ? undefined
        : "Enter a valid email address.";
    case "preferredWeek":
      return trimmed
        ? undefined
        : "Name the week that feels most workable, or say that you are flexible.";
    case "timezone":
      return trimmed
        ? undefined
        : "Add the timezone you want the reply to use.";
    case "topic":
      return trimmed ? undefined : "Add a short session topic.";
    case "context":
      return trimmed
        ? undefined
        : "Add a short context note so the request has enough shape.";
    case "contactMethod":
      return undefined;
    default:
      return undefined;
  }
}

function findFirstInvalidStep(errors: BookingErrors) {
  const invalidFieldNames = new Set<BookingFieldName>(
    Object.keys(errors) as BookingFieldName[],
  );

  const invalidStep = stepFieldMap.findIndex((fields) =>
    fields.some((field) => invalidFieldNames.has(field)),
  );

  return invalidStep > 0 ? invalidStep : 0;
}

function getSubmissionErrorMessage(error: unknown) {
  if (error instanceof StudioInquirySubmitError) {
    if (error.code === "server" || error.code === "validation") {
      return "The session request service did not accept the request. Please try again, or email hello@echoin.ink if the problem continues.";
    }
  }

  return "The session request could not be sent right now. Please try again, or email hello@echoin.ink if you need a fallback.";
}

export function BookingPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    preferredWeek: "",
    timezone: "",
    topic: "",
    context: "",
    contactMethod: "",
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const stepRegionRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const previousStepRef = useRef(activeStep);

  const isLocked = status === "submitting" || status === "request-sent";

  useEffect(() => {
    if (status === "request-sent") {
      successRef.current?.focus();
      return;
    }

    if (status === "request-failed") {
      statusRef.current?.focus();
      return;
    }

    if (status === "validation-error") {
      previousStepRef.current = activeStep;
      return;
    }

    if (previousStepRef.current !== activeStep) {
      stepRegionRef.current?.focus({ preventScroll: true });
      previousStepRef.current = activeStep;
    }
  }, [activeStep, status]);

  useEffect(() => {
    if (status !== "validation-error") return;

    const firstInvalid = firstInvalidField(errors);
    if (firstInvalid) {
      document.getElementById(bookingFieldIds[firstInvalid])?.focus();
      previousStepRef.current = activeStep;
    }
  }, [activeStep, errors, status]);

  function setFieldValue(name: BookingFieldName, value: string) {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });

    if (status === "validation-error" || status === "request-failed") {
      setStatus("idle");
      setSubmitMessage("");
    }
  }

  function handleChange(event: BookingFieldEvent) {
    setFieldValue(event.target.name as BookingFieldName, event.target.value);
  }

  function returnToStep(step: number) {
    if (isLocked) {
      return;
    }

    setActiveStep(step);
    scrollToBookingFlow(prefersReducedMotion);
  }

  function validateFields(fieldNames: BookingFieldName[]) {
    const nextErrors: BookingErrors = {};

    fieldNames.forEach((fieldName) => {
      const error = getFieldError(fieldName, formData[fieldName]);

      if (error) {
        nextErrors[fieldName] = error;
      }
    });

    setErrors((current) => ({
      ...current,
      ...nextErrors,
    }));

    return nextErrors;
  }

  function validateAllFields() {
    const nextErrors: BookingErrors = {};

    (Object.keys(formData) as BookingFieldName[]).forEach((fieldName) => {
      const error = getFieldError(fieldName, formData[fieldName]);

      if (error) {
        nextErrors[fieldName] = error;
      }
    });

    setErrors(nextErrors);
    return nextErrors;
  }

  function handleTimingSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validateFields(["preferredWeek", "timezone"]);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("validation-error");
      setSubmitMessage("Please correct the highlighted timing details.");
      return;
    }

    setStatus("idle");
    setSubmitMessage("");
    setActiveStep(2);
    scrollToBookingFlow(prefersReducedMotion);
  }

  function handleDetailsSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validateFields(["name", "email", "topic", "context"]);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("validation-error");
      setSubmitMessage("Please correct the highlighted request details.");
      return;
    }

    setStatus("idle");
    setSubmitMessage("");
    setActiveStep(3);
    scrollToBookingFlow(prefersReducedMotion);
  }

  async function handleRequestSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validateAllFields();

    if (Object.keys(nextErrors).length > 0) {
      const invalidStep = findFirstInvalidStep(nextErrors);
      setStatus("validation-error");
      setSubmitMessage("Please correct the highlighted fields before sending your request.");
      setActiveStep(invalidStep);
      scrollToBookingFlow(prefersReducedMotion);
      return;
    }

    setStatus("submitting");
    setSubmitMessage("");

    try {
      await submitStudioInquiry({
        kind: "session-request",
        page: "booking",
        name: formData.name.trim(),
        email: formData.email.trim(),
        details: {
          session: "Echo Session",
          duration: "60 minutes",
          price: "$120-$150 NZD",
          preferredWeek: formData.preferredWeek.trim(),
          timezone: formData.timezone.trim(),
          sessionTopic: formData.topic.trim(),
          context: formData.context.trim(),
          preferredContactMethod:
            formData.contactMethod.trim() || "Email reply is fine",
        },
      });

      setStatus("request-sent");
      setSubmitMessage("");
      setActiveStep(3);
      scrollToBookingFlow(prefersReducedMotion);
    } catch (error) {
      setStatus("request-failed");
      setSubmitMessage(getSubmissionErrorMessage(error));
      scrollToBookingFlow(prefersReducedMotion);
    }
  }

  return (
    <PageShell
      atmosphere="sessions"
      theme="light"
      withTopSpacing={false}
      className="ei-booking-page"
    >
      <Helmet>
        <title>Request a Strategy Session — Echo in Ink</title>
        <meta
          name="description"
          content="Send a considered Strategy Session request with your preferred week, timezone, and context. Echo in Ink replies with available times and the clearest next step."
        />
      </Helmet>

      <Section theme="light" spacing="none" className="ei-booking-intro">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="mx-auto max-w-[1180px] ei-booking-intro-grid"
          >
            <motion.div variants={driftUp}>
              <SectionLabel label="Strategy Session request" />
              <motion.h1 variants={blurEmergence}>
                Book focused time around one defined question.
              </motion.h1>
              <motion.p variants={fadeSoft}>
                A Strategy Session is a focused 60–90 minute private video
                engagement for clarity, direction, scoping or a specific
                digital problem. It can stand alone.
              </motion.p>
            </motion.div>

            <motion.dl variants={fadeSoft} className="ei-booking-meta">
              <div>
                <dt>Format</dt>
                <dd>Session request, not instant booking</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>One defined question</dd>
              </div>
              <div>
                <dt>Reply</dt>
                <dd>Available times arrive after review</dd>
              </div>
            </motion.dl>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="booking-flow"
        theme="mist"
        transitionTo="light"
        spacing="none"
        className="ei-booking-flow-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px] ei-booking-layout"
          >
            <motion.aside variants={driftUp}>
              <EchoCard
                variant="offer"
                padding="lg"
                className="ei-booking-summary"
              >
                <IconWell size="lg" tone="violet" orbital glow>
                  <OrbitalVisual variant="synthesisStar" size={56} />
                </IconWell>

                <span className="ei-booking-summary-kicker">
                  Focused strategic engagement
                </span>
                <h2>Strategy Session</h2>
                <p>
                  For a defined question that needs clearer decisions,
                  language, direction or practical next steps.
                </p>

                <dl>
                  {sessionFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="ei-booking-summary-note">
                  <span>Best for</span>
                  <p>
                    Clarity, direction, scoping or one specific digital
                    problem—not a substitute for a broader project enquiry.
                  </p>
                </div>

                <div className="ei-booking-practical">
                  <span>Before you send</span>
                  <ul className="ei-booking-practical-list">
                    {practicalInformation.map((item) => (
                      <li key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </EchoCard>
            </motion.aside>

            <motion.div variants={fadeSoft} className="ei-booking-workspace">
              <nav aria-label="Booking progress" className="ei-booking-stepper">
                <ol>
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      data-active={activeStep === index ? "true" : "false"}
                      data-complete={
                        activeStep > index || status === "request-sent"
                          ? "true"
                          : "false"
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          index <= activeStep && !isLocked
                            ? returnToStep(index)
                            : undefined
                        }
                        disabled={index > activeStep || isLocked}
                        aria-current={activeStep === index ? "step" : undefined}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {step}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>

              <div
                ref={stepRegionRef}
                tabIndex={-1}
                className="ei-booking-step-region"
                aria-live="polite"
              >
                {status === "request-sent" ? (
                  <div ref={successRef} tabIndex={-1} className="ei-booking-confirmed">
                    <IconWell size="lg" tone="blue" orbital glow>
                      <OrbitalVisual variant="haloGate" size={56} />
                    </IconWell>
                    <SectionLabel label="Request sent" align="center" rule="none" />
                    <h2>Your session request is on its way.</h2>
                    <p>
                      Echo in Ink will reply with available times and a
                      suggested next step.
                    </p>
                    <p className="ei-booking-confirmed-caption">
                      No time is confirmed yet. Confirmation only happens after
                      a real time is offered and accepted.
                    </p>
                    <div className="ei-booking-confirmed-summary">
                      <span>{formData.preferredWeek}</span>
                      <strong>{formData.timezone}</strong>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setStatus("idle");
                        setActiveStep(0);
                        setSubmitMessage("");
                        setErrors({});
                      }}
                    >
                      Send another request
                    </Button>
                  </div>
                ) : (
                  <>
                    {submitMessage ? (
                      <div
                        ref={statusRef}
                        tabIndex={-1}
                        className="ei-booking-status"
                        data-state={
                          status === "request-failed" ||
                          status === "validation-error"
                            ? "error"
                            : "info"
                        }
                        role={
                          status === "request-failed" ||
                          status === "validation-error"
                            ? "alert"
                            : "status"
                        }
                      >
                        <p>
                          {submitMessage.includes("hello@echoin.ink") ? (
                            <>
                              {submitMessage.split("hello@echoin.ink")[0]}
                              <a href="mailto:hello@echoin.ink">
                                hello@echoin.ink
                              </a>
                              {submitMessage.split("hello@echoin.ink")[1]}
                            </>
                          ) : (
                            submitMessage
                          )}
                        </p>
                      </div>
                    ) : null}

                    {activeStep === 0 ? (
                      <div className="ei-booking-step">
                        <SectionLabel label="Step one" rule="none" />
                        <h2>Begin with a request, not a placeholder booking.</h2>
                        <p>
                          This page does not hold a slot or simulate a calendar.
                          It sends a real request with the practical details
                          needed to suggest a workable time.
                        </p>

                        <button
                          type="button"
                          className="ei-booking-session-choice"
                          data-selected="true"
                          aria-pressed="true"
                        >
                          <span>
                            <strong>Strategy Session</strong>
                            <small>
                              60–90 minutes · Private video room · One defined question
                            </small>
                          </span>
                          <span>Request flow</span>
                        </button>

                        <div className="ei-booking-step-actions">
                          <Button
                            type="button"
                            onClick={() => {
                              setActiveStep(1);
                              scrollToBookingFlow(prefersReducedMotion);
                            }}
                          >
                            Continue with request
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    {activeStep === 1 ? (
                      <div className="ei-booking-step">
                        <SectionLabel label="Step two" rule="none" />
                        <h2>Name the week and timezone that make sense.</h2>
                        <p>
                          Share a preferred week and the timezone you want the
                          reply to use. If your schedule is flexible, say so in
                          the week field.
                        </p>

                        <form
                          onSubmit={handleTimingSubmit}
                          className="ei-booking-details-form"
                          noValidate
                        >
                          <EchoFormField
                            type="text"
                            id="booking-preferred-week"
                            name="preferredWeek"
                            label="Preferred week"
                            value={formData.preferredWeek}
                            onChange={handleChange}
                            required
                            error={errors.preferredWeek}
                            placeholder="Week of 6 July, or Flexible"
                            hint="This is a preference, not a confirmed booking."
                          />

                          <div className="ei-booking-form-row">
                            <EchoFormField
                              type="text"
                              id="booking-timezone"
                              name="timezone"
                              label="Timezone"
                              value={formData.timezone}
                              onChange={handleChange}
                              required
                              error={errors.timezone}
                              placeholder="America/Los_Angeles"
                              hint="Reply times are shared in your timezone and New Zealand time."
                            />

                            <EchoFormField
                              type="text"
                              id="booking-contact-method"
                              name="contactMethod"
                              label="Preferred contact method"
                              value={formData.contactMethod}
                              onChange={handleChange}
                              placeholder="Email reply is standard; note anything else if helpful"
                              hint="Optional."
                            />
                          </div>

                          <div className="ei-booking-step-actions">
                            <Button
                              type="button"
                              variant="tertiary"
                              onClick={() => returnToStep(0)}
                            >
                              Back
                            </Button>
                            <Button type="submit">Add your details</Button>
                          </div>
                        </form>
                      </div>
                    ) : null}

                    {activeStep === 2 ? (
                      <div className="ei-booking-step">
                        <SectionLabel label="Step three" rule="none" />
                        <h2>Give the request enough shape to be useful.</h2>
                        <p>
                          A short topic and a little context are enough. You do
                          not need a polished brief before asking for the room.
                        </p>

                        <form
                          onSubmit={handleDetailsSubmit}
                          className="ei-booking-details-form"
                          noValidate
                        >
                          <div className="ei-booking-form-row">
                            <EchoFormField
                              type="text"
                              id="booking-name"
                              name="name"
                              label="Name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              error={errors.name}
                              autoComplete="name"
                              placeholder="Your name"
                            />
                            <EchoFormField
                              type="email"
                              id="booking-email"
                              name="email"
                              label="Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              error={errors.email}
                              autoComplete="email"
                              inputMode="email"
                              placeholder="your@email.com"
                            />
                          </div>

                          <EchoFormField
                            type="text"
                            id="booking-topic"
                            name="topic"
                            label="Session topic"
                            value={formData.topic}
                            onChange={handleChange}
                            required
                            error={errors.topic}
                            placeholder="Naming direction, offer clarity, website structure..."
                          />

                          <EchoTextarea
                            id="booking-context"
                            name="context"
                            label="Short context"
                            value={formData.context}
                            onChange={handleChange}
                            rows={5}
                            required
                            error={errors.context}
                            placeholder="What feels unresolved, alive, or difficult to name?"
                            hint="A few lines are enough."
                          />

                          <div className="ei-booking-step-actions">
                            <Button
                              type="button"
                              variant="tertiary"
                              onClick={() => returnToStep(1)}
                            >
                              Back
                            </Button>
                            <Button type="submit">Review request</Button>
                          </div>
                        </form>
                      </div>
                    ) : null}

                    {activeStep === 3 ? (
                      <form
                        onSubmit={handleRequestSubmit}
                        className="ei-booking-step"
                        noValidate
                      >
                        <SectionLabel label="Step four" rule="none" />
                        <h2>Review the request before you send it.</h2>
                        <p>
                          Sending this request does not confirm a booking. It
                          asks Echo in Ink to reply with real available times
                          and the clearest next step.
                        </p>

                        <dl className="ei-booking-review">
                          <div>
                            <dt>Session</dt>
                            <dd>Strategy Session · 60–90 minutes · Private video session</dd>
                          </div>
                          <div>
                            <dt>Week</dt>
                            <dd>
                              {formData.preferredWeek}
                              <span>{formData.timezone}</span>
                            </dd>
                          </div>
                          <div>
                            <dt>For</dt>
                            <dd>
                              {formData.name}
                              <span>{formData.email}</span>
                            </dd>
                          </div>
                          <div>
                            <dt>Topic</dt>
                            <dd>
                              {formData.topic}
                              <span>{formData.context}</span>
                            </dd>
                          </div>
                          <div>
                            <dt>Reply by</dt>
                            <dd>{formData.contactMethod || "Email reply is fine"}</dd>
                          </div>
                        </dl>

                        <div className="ei-booking-prototype-note">
                          <OrbitalVisual variant="haloGate" size={26} />
                          <p>
                            Nothing is confirmed until a real time is offered
                            and accepted. Recording only happens by prior
                            consent.
                          </p>
                        </div>

                        <div className="ei-booking-step-actions">
                          <Button
                            type="button"
                            variant="tertiary"
                            onClick={() => returnToStep(2)}
                          >
                            Edit details
                          </Button>
                          <Button type="submit" disabled={status === "submitting"}>
                            {status === "submitting"
                              ? "Sending request..."
                              : status === "request-failed"
                                ? "Try again"
                                : "Send request"}
                          </Button>
                        </div>
                      </form>
                    ) : null}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section theme="light" spacing="none" className="ei-booking-after">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-booking-section-heading">
              <SectionLabel label="What happens next" index="01" />
              <h2>A considered path from request to confirmed room.</h2>
            </motion.div>

            <div className="ei-booking-after-grid">
              {afterRequest.map((item, index) => (
                <motion.div key={item.title} variants={driftUp}>
                  <EchoCard
                    variant="index"
                    padding="md"
                    className="ei-booking-after-card"
                  >
                    <IconWell
                      size="sm"
                      tone={index === 3 ? "blue" : "violet"}
                    >
                      <OrbitalVisual variant={item.icon} size={28} />
                    </IconWell>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="lightElevated"
        transitionTo="deep"
        spacing="none"
        className="ei-booking-preparation"
      >
        <Container size="xl" className="relative z-10">
          <motion.div className="mx-auto max-w-[1180px]">
            <EchoFormPanel
              tone="quiet"
              splitAt="md"
              aside={
                <div className="ei-booking-preparation-quote">
                  <IconWell size="lg" tone="magenta" orbital glow>
                    <OrbitalVisual variant="innerTide" size={56} />
                  </IconWell>
                  <SectionLabel label="Preparation note" rule="none" />
                  <blockquote>
                    Arrive with the question,
                    <br />
                    not the answer.
                  </blockquote>
                </div>
              }
            >
              <div className="ei-booking-included">
                <SectionLabel label="Once the room is confirmed" rule="none" />
                <h2>The conversation stays useful after the room closes.</h2>
                <ul>
                  <li>Available times are confirmed in writing before the session exists</li>
                  <li>Recording only happens if everyone agrees in advance</li>
                  <li>Clearer decisions, language and practical next steps are the aim</li>
                  <li>A reflection note may be available after the session</li>
                </ul>
              </div>
            </EchoFormPanel>
          </motion.div>
        </Container>
      </Section>

      <Section theme="deep" spacing="none" className="ei-booking-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="A broader engagement"
          heading="Have a larger project in mind?"
          body="Go directly to the project enquiry. A Strategy Session is standalone, not a required gateway to working with Echo."
          actions={
            <>
              <Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>
              <Button to="/sessions" variant="secondary">
                View Strategy Sessions
              </Button>
            </>
          }
          headingId="booking-project-path-heading"
        />
      </Section>
    </PageShell>
  );
}

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import contactHeroDesktop from "@/assets/imagery/hero/contact-hero-desktop.png";
import contactHeroMobile from "@/assets/imagery/hero/contact-hero-mobile.png";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoFormField } from "@/components/ui/EchoFormField";
import { EchoFormPanel } from "@/components/ui/EchoFormPanel";
import { EchoSelect } from "@/components/ui/EchoSelect";
import { EchoTextarea } from "@/components/ui/EchoTextarea";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  primaryCapabilities,
  projectInquiryTypeOptions,
  strategySessionsEngagement
} from "@/data/servicesContent";
import { siteActionLabels } from "@/data/siteNavigation";
import {
  CONTACT_DIRECT_EMAIL,
  CONTACT_ERROR_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  ContactSubmissionError,
  createEmptyContactFormData,
  submitContactForm,
  validateContactField,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormState
} from "@/lib/contactForm";
import { consumeFunnelAttribution, trackFunnelEvent } from "@/lib/analytics";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const trustItems: Array<{
  title: string;
  description: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "A direct response",
    description: "Every project enquiry is read and answered personally.",
    icon: "threadBeacon"
  },
  {
    title: "No solution required",
    description: "Bring the problem, opportunity or change—not a technical diagnosis.",
    icon: "synthesisStar"
  },
  {
    title: "Private by default",
    description: "Your details and project context are kept private.",
    icon: "haloGate"
  }
];

const projectTimingOptions = [
  "As soon as practical",
  "1–2 months",
  "3–6 months",
  "Later / exploring"
] as const;

type ContactFieldEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | { target: { name: string; value: string } };

function getPreselectedInquiry(inquiry: string | null) {
  return inquiry?.trim().toLowerCase() === "project" ? "Project Inquiry" : "";
}

function buildProjectMessage(outcome: string, changedContext: string, timing: string) {
  return [
    "What are you trying to achieve?",
    outcome.trim(),
    "",
    "What has changed or isn't working?",
    changedContext.trim() || "Not provided",
    "",
    "Timing",
    timing.trim() || "Not specified"
  ].join("\n");
}

function focusFirstInvalidField(errors: ContactFieldErrors) {
  const firstField = ["name", "email", "projectUrl", "message"].find(
    (field) => errors[field as keyof ContactFieldErrors]
  );
  if (firstField) document.getElementById(firstField)?.focus();
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const [formState, setFormState] = useState<ContactFormState>("idle");
  const [formData, setFormData] = useState(() =>
    createEmptyContactFormData({ exploration: "Project Inquiry" })
  );
  const [changedContext, setChangedContext] = useState("");
  const [timing, setTiming] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const statusRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const optionalDetailsRef = useRef<HTMLDetailsElement | null>(null);
  const enquiryStartedRef = useRef(false);
  const enquiryAttributionRef = useRef<ReturnType<typeof consumeFunnelAttribution>>();

  const reveal = {
    variants: staggerContainer(STAGGER.loose, 0),
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: VIEWPORT.normal
  } as const;

  const hasFieldErrors = useMemo(() => Object.values(fieldErrors).some(Boolean), [fieldErrors]);
  const visibleProjectType = formData.exploration === "Project Inquiry" ? "" : formData.exploration;

  useEffect(() => {
    const preselectedInquiry = getPreselectedInquiry(searchParams.get("inquiry"));

    if (!preselectedInquiry) return;

    setFormData((current) => ({
      ...current,
      exploration:
        current.exploration && current.exploration !== "Project Inquiry"
          ? current.exploration
          : preselectedInquiry
    }));
  }, [searchParams]);

  useEffect(() => {
    if (formState === "success") {
      successRef.current?.focus();
      return;
    }
    if (formState === "error") {
      if (fieldErrors.projectUrl) optionalDetailsRef.current?.setAttribute("open", "");
      if (hasFieldErrors) {
        focusFirstInvalidField(fieldErrors);
      } else {
        statusRef.current?.focus();
      }
    }
  }, [fieldErrors, formState, hasFieldErrors]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const projectMessage = buildProjectMessage(formData.message, changedContext, timing);
    const nextFieldErrors = validateContactForm(formData);

    if (!nextFieldErrors.message && projectMessage.length > 2500) {
      nextFieldErrors.message =
        "Please keep the complete project description under 2500 characters.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      if (nextFieldErrors.projectUrl) optionalDetailsRef.current?.setAttribute("open", "");
      setFieldErrors(nextFieldErrors);
      setFormState("idle");
      setStatusMessage("Please check the highlighted fields and try again.");
      setAnnouncement("Please check the highlighted fields and try again.");
      focusFirstInvalidField(nextFieldErrors);
      return;
    }

    setFormState("submitting");
    setFieldErrors({});
    setStatusMessage("");
    setAnnouncement("Sending your project enquiry.");

    try {
      await submitContactForm({
        ...formData,
        message: projectMessage
      });
      trackFunnelEvent({
        event: "enquiry_submit",
        path: window.location.pathname,
        ...enquiryAttributionRef.current,
        journey: "form_completion"
      });
      setFormState("success");
      setStatusMessage(CONTACT_SUCCESS_MESSAGE);
      setAnnouncement(CONTACT_SUCCESS_MESSAGE);
    } catch (error) {
      const submissionError =
        error instanceof ContactSubmissionError
          ? error
          : new ContactSubmissionError(CONTACT_ERROR_MESSAGE);

      setFormState("error");
      setFieldErrors(submissionError.fieldErrors ?? {});
      setStatusMessage(submissionError.message);
      setAnnouncement(submissionError.message);
    }
  };

  const markEnquiryStarted = () => {
    if (!enquiryStartedRef.current) {
      enquiryStartedRef.current = true;
      enquiryAttributionRef.current = consumeFunnelAttribution();
      trackFunnelEvent({
        event: "enquiry_start",
        path: window.location.pathname,
        ...enquiryAttributionRef.current
      });
    }
  };

  const handleChange = (event: ContactFieldEvent) => {
    const { name, value } = event.target;

    if (name !== "company") markEnquiryStarted();

    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name as keyof ContactFieldErrors]) return current;
      const nextErrors = { ...current };
      delete nextErrors[name as keyof ContactFieldErrors];
      return nextErrors;
    });

    if (formState === "error") {
      setFormState("idle");
      setStatusMessage("");
    }
  };

  const handleBlur = (field: keyof ContactFieldErrors) => {
    const error = validateContactField(field, formData);

    setFieldErrors((current) => {
      const nextErrors = { ...current };
      if (error) nextErrors[field] = error;
      else delete nextErrors[field];
      return nextErrors;
    });
  };

  return (
    <PageShell
      title="Start a Project — Echo in Ink"
      description="Start a project with Echo in Ink by sharing the problem, opportunity or idea you want to make real."
      atmosphere="default"
      theme="light"
      footerTheme="light"
      footerVariant="compact"
      withTopSpacing={false}
      className="ei-contact-page"
    >
      <PageSectionHero
        eyebrow="START A PROJECT"
        title="Begin with what you're trying to make real."
        description="Share the problem, the opportunity, what has changed, what is not working, or what you want to create. You do not need to arrive with a predefined technical solution."
        offerAnchor="A clear brief is welcome, but not required."
        image={contactHeroDesktop}
        mobileImage={contactHeroMobile}
        imageAlt="A glowing violet path crossing a reflective landscape toward an illuminated monolith"
        theme="light"
        tone="editorial"
        headingId="contact-heading"
        transition="atmospheric"
        transitionTo="light"
      />

      <Section
        theme="light"
        transition="soft"
        transitionTo="mist"
        spacing="none"
        className="ei-contact-reassurance"
        aria-label="What to expect when you enquire"
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-contact-reassurance-inner">
            <div className="ei-contact-trust-grid">
              {trustItems.map((item) => (
                <motion.article key={item.title} variants={driftUp}>
                  <OrbitalVisual variant={item.icon} size={34} />
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="contact-form"
        theme="mist"
        transitionTo="lightElevated"
        spacing="none"
        className="ei-contact-form-section"
        aria-labelledby="contact-form-heading"
        data-inquiry-intent={
          searchParams.get("inquiry")?.toLowerCase() === "project" ? "project" : undefined
        }
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-contact-form-wrap">
            <motion.div variants={fadeSoft}>
              <EchoFormPanel
                tone="quiet"
                splitAt="lg"
                aside={
                  <div className="ei-contact-form-aside">
                    <OrbitalVisual variant="synthesisStar" size={58} />
                    <SectionLabel label="Start with the need" tone="accent" />
                    <h2 id="contact-form-heading">Describe the work in your own words.</h2>
                    <p>
                      A clear brief is welcome, but it is not required. Echo can help shape the
                      right response after understanding what the work needs to change.
                    </p>
                    <ul>
                      {primaryCapabilities.map((capability) => (
                        <li key={capability.id}>{capability.title}</li>
                      ))}
                      <li>Digital Reset</li>
                    </ul>
                  </div>
                }
              >
                <div className="ei-contact-form-content">
                  {formState === "success" ? (
                    <div
                      ref={successRef}
                      tabIndex={-1}
                      role="status"
                      aria-live="polite"
                      className="ei-contact-success"
                    >
                      <SectionLabel label="Enquiry sent" align="center" rule="none" />
                      <h2>Thank you. Your project enquiry is on its way.</h2>
                      <p>Echo in Ink will review your enquiry and reply by email.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate aria-busy={formState === "submitting"}>
                      <div className="ei-contact-form-heading-row">
                        <p className="ei-contact-form-kicker">Required to begin</p>
                        <p className="ei-contact-form-intro">Fields marked * are required.</p>
                      </div>

                      <div
                        ref={statusRef}
                        tabIndex={-1}
                        className="ei-contact-form-status"
                        data-state={
                          formState === "submitting"
                            ? "submitting"
                            : formState === "error" || hasFieldErrors
                              ? "error"
                              : "idle"
                        }
                        role={formState === "error" || hasFieldErrors ? "alert" : "status"}
                        aria-live={formState === "error" || hasFieldErrors ? "assertive" : "polite"}
                      >
                        <p>
                          {formState === "submitting"
                            ? "Sending your project enquiry..."
                            : statusMessage}
                        </p>
                        {(formState === "error" || hasFieldErrors) && (
                          <a href={`mailto:${CONTACT_DIRECT_EMAIL}`}>Email directly</a>
                        )}
                      </div>

                      <p className="sr-only" aria-live="polite">
                        {announcement}
                      </p>

                      <div className="ei-contact-form-row">
                        <EchoFormField
                          type="text"
                          id="name"
                          name="name"
                          label="Name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur("name")}
                          error={fieldErrors.name}
                          required
                          autoComplete="name"
                          disabled={formState === "submitting"}
                        />
                        <EchoFormField
                          type="email"
                          id="email"
                          name="email"
                          label="Email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          error={fieldErrors.email}
                          required
                          autoComplete="email"
                          inputMode="email"
                          disabled={formState === "submitting"}
                        />
                      </div>

                      <EchoTextarea
                        id="message"
                        name="message"
                        label="What are you trying to achieve?"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        error={fieldErrors.message}
                        hint="Describe the outcome, opportunity, problem or thing you want to create."
                        placeholder="Our product has grown, but the website still reflects the company we were two years ago."
                        rows={6}
                        required
                        disabled={formState === "submitting"}
                      />

                      <details ref={optionalDetailsRef} className="ei-contact-optional">
                        <summary>
                          <span className="ei-contact-optional-icon" aria-hidden="true">
                            +
                          </span>
                          <span>
                            <strong>Optional context</strong>
                            <small>
                              Add anything else that might help. You can leave this blank.
                            </small>
                          </span>
                          <span className="ei-contact-optional-chevron" aria-hidden="true">
                            ⌄
                          </span>
                        </summary>
                        <div className="ei-contact-optional-fields">
                          <EchoSelect
                            id="exploration"
                            name="exploration"
                            label="What kind of project does this seem closest to? (optional)"
                            value={visibleProjectType}
                            onChange={handleChange}
                            options={projectInquiryTypeOptions}
                            placeholder="Select an option"
                            hint="Choose the closest fit—you do not need to diagnose the solution."
                            disabled={formState === "submitting"}
                          />

                          <EchoTextarea
                            id="project-context"
                            name="projectContext"
                            label="What has changed or isn't working? (optional)"
                            value={changedContext}
                            onChange={(event) => {
                              markEnquiryStarted();
                              setChangedContext(event.target.value);
                            }}
                            placeholder="What has changed, what isn't working, or what is creating the need now?"
                            hint="Share why this matters now or what prompted the enquiry."
                            rows={4}
                            disabled={formState === "submitting"}
                          />

                          <div className="ei-contact-form-row">
                            <EchoSelect
                              id="project-timing"
                              name="projectTiming"
                              label="When are you hoping to begin? (optional)"
                              value={timing}
                              onChange={(event) => {
                                markEnquiryStarted();
                                setTiming(event.target.value);
                              }}
                              options={projectTimingOptions}
                              placeholder="Select a timeframe"
                              disabled={formState === "submitting"}
                            />
                            <EchoFormField
                              type="url"
                              id="projectUrl"
                              name="projectUrl"
                              label="Existing project URL (optional)"
                              value={formData.projectUrl}
                              onChange={handleChange}
                              onBlur={() => handleBlur("projectUrl")}
                              error={fieldErrors.projectUrl}
                              placeholder="https://"
                              hint="If something already exists online."
                              autoComplete="url"
                              inputMode="url"
                              disabled={formState === "submitting"}
                            />
                          </div>
                        </div>
                      </details>

                      <div className="ei-contact-honeypot" aria-hidden="true">
                        <EchoFormField
                          type="text"
                          id="company"
                          name="company"
                          label="Company"
                          value={formData.company}
                          onChange={handleChange}
                          autoComplete="off"
                          tabIndex={-1}
                        />
                      </div>

                      <div className="ei-contact-submit-row">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={formState === "submitting"}
                        >
                          {formState === "submitting"
                            ? "Sending Project Enquiry..."
                            : formState === "error"
                              ? "Send Project Enquiry Again"
                              : siteActionLabels.sendProjectEnquiry}
                        </Button>
                        <div className="ei-contact-submit-notes">
                          <p>You’ll receive a personal response within a few business days.</p>
                          <p>Your details and project context are kept private.</p>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </EchoFormPanel>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="lightElevated"
        spacing="none"
        className="ei-contact-session-section"
        aria-labelledby="contact-alternative-heading"
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-contact-session-inner">
            <motion.aside variants={fadeSoft} className="ei-contact-session-path">
              <picture className="ei-contact-session-art" aria-hidden="true">
                <source media="(max-width: 767px)" srcSet={contactHeroMobile} />
                <img src={contactHeroDesktop} alt="" loading="lazy" />
              </picture>
              <div>
                <SectionLabel label="A smaller, focused engagement" />
                <h2 id="contact-alternative-heading">Need focused clarity on one question?</h2>
                <p>
                  A 60–90 minute strategy session for a clearly defined problem. It can stand alone.
                </p>
              </div>
              <Button to={strategySessionsEngagement.href} variant="secondary">
                {siteActionLabels.requestStrategySession} <span aria-hidden="true">→</span>
              </Button>
            </motion.aside>
          </motion.div>
        </Container>
      </Section>
    </PageShell>
  );
}

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import contactHeroDesktop from "@/assets/imagery/hero/contact-hero-planet-dawn-desktop.webp";
import contactHeroMobile from "@/assets/imagery/hero/contact-hero-planet-dawn-mobile.webp";
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
import {
  CONTACT_DIRECT_EMAIL,
  CONTACT_ERROR_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  ContactSubmissionError,
  createEmptyContactFormData,
  submitContactForm,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormState
} from "@/lib/contactForm";
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
    if (formState === "error") statusRef.current?.focus();
  }, [formState]);

  const focusFirstInvalidField = (errors: ContactFieldErrors) => {
    const firstField = ["name", "email", "projectUrl", "message"].find(
      (field) => errors[field as keyof ContactFieldErrors]
    );
    if (firstField) document.getElementById(firstField)?.focus();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const projectMessage = buildProjectMessage(formData.message, changedContext, timing);
    const nextFieldErrors = validateContactForm(formData);

    if (!nextFieldErrors.message && projectMessage.length > 2500) {
      nextFieldErrors.message =
        "Please keep the complete project description under 2500 characters.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
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
      if (submissionError.fieldErrors) focusFirstInvalidField(submissionError.fieldErrors);
    }
  };

  const handleChange = (event: ContactFieldEvent) => {
    const { name, value } = event.target;
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
        offerAnchor="For broader work across brand, digital experiences, products and systems."
        ctaLabel="Start your enquiry"
        ctaHref="#contact-form"
        secondaryCtaLabel="View selected work"
        secondaryCtaHref="/works"
        image={contactHeroDesktop}
        mobileImage={contactHeroMobile}
        imageAlt="Atmospheric violet orbital sphere over a reflective horizon"
        theme="light"
        tone="editorial"
        headingId="contact-heading"
      />

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
                      <p className="ei-contact-form-intro">
                        Tell Echo what you are trying to achieve. Fields marked * are required.
                      </p>

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
                            : statusMessage || "A project type is helpful, but optional."}
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
                          error={fieldErrors.email}
                          required
                          autoComplete="email"
                          inputMode="email"
                          disabled={formState === "submitting"}
                        />
                      </div>

                      <EchoSelect
                        id="exploration"
                        name="exploration"
                        label="What kind of project does this seem closest to?"
                        value={visibleProjectType}
                        onChange={handleChange}
                        options={projectInquiryTypeOptions}
                        placeholder="Select an option, or leave this open"
                        hint="Optional. Choose the closest fit—you do not need to diagnose the solution."
                        disabled={formState === "submitting"}
                      />

                      <EchoTextarea
                        id="message"
                        name="message"
                        label="What are you trying to achieve?"
                        value={formData.message}
                        onChange={handleChange}
                        error={fieldErrors.message}
                        hint="Describe the outcome, opportunity, problem or thing you want to create."
                        rows={7}
                        required
                        disabled={formState === "submitting"}
                      />

                      <EchoTextarea
                        id="project-context"
                        name="projectContext"
                        label="What has changed or isn't working?"
                        value={changedContext}
                        onChange={(event) => setChangedContext(event.target.value)}
                        hint="Optional. Share why this matters now or what prompted the enquiry."
                        rows={5}
                        disabled={formState === "submitting"}
                      />

                      <div className="ei-contact-form-row">
                        <EchoFormField
                          type="text"
                          id="project-timing"
                          name="projectTiming"
                          label="When are you hoping to begin?"
                          value={timing}
                          onChange={(event) => setTiming(event.target.value)}
                          hint="Optional. A rough month, date or ‘flexible’ is enough."
                          autoComplete="off"
                          disabled={formState === "submitting"}
                        />
                        <EchoFormField
                          type="url"
                          id="projectUrl"
                          name="projectUrl"
                          label="Existing project URL"
                          value={formData.projectUrl}
                          onChange={handleChange}
                          error={fieldErrors.projectUrl}
                          hint="Optional, if something already exists online."
                          autoComplete="url"
                          inputMode="url"
                          disabled={formState === "submitting"}
                        />
                      </div>

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
                            ? "Sending..."
                            : formState === "error"
                              ? "Try again"
                              : "Start a Project"}
                        </Button>
                        <p>Your details are sent to Echo in Ink to respond to this enquiry.</p>
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
        className="ei-contact-reassurance"
        aria-labelledby="contact-alternative-heading"
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-contact-reassurance-inner">
            <div className="ei-contact-trust-grid">
              {trustItems.map((item) => (
                <motion.article key={item.title} variants={driftUp}>
                  <OrbitalVisual variant={item.icon} size={34} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              ))}
            </div>
            <motion.aside variants={fadeSoft} className="ei-contact-session-path">
              <div>
                <SectionLabel label="A smaller, focused engagement" />
                <h2 id="contact-alternative-heading">Need focused clarity on one question?</h2>
                <p>{strategySessionsEngagement.description} It can stand alone.</p>
              </div>
              <Button to={strategySessionsEngagement.href} variant="secondary">
                Book a Strategy Session
              </Button>
            </motion.aside>
          </motion.div>
        </Container>
      </Section>
    </PageShell>
  );
}

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoFormField } from "@/components/ui/EchoFormField";
import { EchoFormPanel } from "@/components/ui/EchoFormPanel";
import { EchoSelect } from "@/components/ui/EchoSelect";
import { EchoTextarea } from "@/components/ui/EchoTextarea";
import {
  OrbitalVisual,
  type OrbitalVariant,
} from "@/components/ui/OrbitalVisual";
import contactHeroDesktop from "@/assets/imagery/hero/contact-hero-planet-dawn-desktop.webp";
import contactHeroMobile from "@/assets/imagery/hero/contact-hero-planet-dawn-mobile.webp";
import {
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";
import {
  CONTACT_DIRECT_EMAIL,
  CONTACT_ERROR_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  ContactSubmissionError,
  createEmptyContactFormData,
  submitContactForm,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormState,
} from "@/lib/contactForm";

const explorationOptions = [
  "Project Inquiry",
  "Creative Direction",
  "Identity Systems",
  "Experimental Design",
  "Studio Collaboration",
  "Something Else",
];

function getPreselectedInquiry(inquiry: string | null) {
  switch (inquiry?.trim().toLowerCase()) {
    case "project":
      return "Project Inquiry";
    default:
      return "";
  }
}

const serviceRows: Array<{
  title: string;
  description: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Creative Direction",
    description: "For brands, stories, and experiences",
    icon: "quietAxis",
  },
  {
    title: "Identity Systems",
    description: "Naming, visual identity, and language",
    icon: "vectorLattice",
  },
  {
    title: "Experimental Design",
    description: "Concepts, worlds, and digital spaces",
    icon: "prismMirror",
  },
  {
    title: "Studio Collaboration",
    description: "Ongoing projects and partnerships",
    icon: "signalBridge",
  },
];

const trustItems: Array<{
  title: string;
  description: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Response within 2 days",
    description: "I personally read and respond to every message.",
    icon: "threadBeacon",
  },
  {
    title: "Meaningful conversations",
    description: "Thoughtful replies to help us explore what’s possible.",
    icon: "synthesisStar",
  },
  {
    title: "Private & respectful",
    description: "Your details and ideas are always protected.",
    icon: "haloGate",
  },
];

type ContactFieldEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | {
      target: {
        name: string;
        value: string;
      };
    };

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const [formState, setFormState] = useState<ContactFormState>("idle");
  const [formData, setFormData] = useState(() => createEmptyContactFormData());
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const statusRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const hasFieldErrors = useMemo(
    () => Object.values(fieldErrors).some(Boolean),
    [fieldErrors],
  );

  useEffect(() => {
    const preselectedInquiry = getPreselectedInquiry(searchParams.get("inquiry"));

    if (!preselectedInquiry) {
      return;
    }

    setFormData((prev) =>
      prev.exploration === preselectedInquiry
        ? prev
        : { ...prev, exploration: preselectedInquiry },
    );
  }, [searchParams]);

  useEffect(() => {
    if (formState === "success") {
      successRef.current?.focus();
      return;
    }

    if (formState === "error") {
      statusRef.current?.focus();
    }
  }, [formState]);

  const focusFirstInvalidField = (errors: ContactFieldErrors) => {
    const firstField = ["name", "email", "projectUrl", "message"].find(
      (field) => errors[field as keyof ContactFieldErrors],
    );

    if (!firstField) {
      return;
    }

    document.getElementById(firstField)?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextFieldErrors = validateContactForm(formData);

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
    setAnnouncement("Sending your message.");

    try {
      await submitContactForm(formData);
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

      if (submissionError.fieldErrors) {
        focusFirstInvalidField(submissionError.fieldErrors);
      }
    }
  };

  const handleChange = (e: ContactFieldEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name as keyof ContactFieldErrors]) {
        return prev;
      }

      const nextErrors = { ...prev };
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
      atmosphere="default"
      theme="deep"
      withTopSpacing={false}
      className="ei-contact-page"
    >
      <Helmet>
        <title>Contact — Echo in Ink</title>
        <meta
          name="description"
          content="Begin a considered conversation with Echo in Ink about what you are trying to make real."
        />
      </Helmet>

      <PageSectionHero
        eyebrow="START A CONVERSATION"
        title="Begin with what you're trying to make real."
        description="Tell me what you're building, what's changing, or what you can't quite name yet. I'll meet you in the middle of it."
        offerAnchor="A direct enquiry for identity, digital experience, systems, or worldbuilding work that needs clarity before it grows."
        ctaLabel="Send an enquiry"
        ctaHref="#contact-form"
        secondaryCtaLabel="Explore selected work"
        secondaryCtaHref="/works"
        image={contactHeroDesktop}
        mobileImage={contactHeroMobile}
        imageAlt="Atmospheric violet orbital sphere over a dark reflective horizon"
        align="left"
      />

      <Section
        id="contact-form"
        spacing="none"
        className="relative z-20 -mt-8 overflow-hidden pb-24 md:-mt-14 md:pb-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 54% 34% at 22% 4%, rgb(var(--ei-violet-rgb) / 0.08) 0%, transparent 68%), radial-gradient(ellipse 42% 28% at 78% 12%, rgb(var(--ei-halo-blue-rgb) / 0.055) 0%, transparent 72%)",
          }}
        />

        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={fadeSoft}>
              <EchoFormPanel
                tone="quiet"
                splitAt="lg"
                aside={
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgb(var(--ei-soft-neon-rgb)/0.08),transparent_34%),radial-gradient(circle_at_82%_76%,rgb(var(--ei-halo-blue-rgb)/0.055),transparent_40%)]"
                    />

                    <motion.div variants={driftUp} className="relative z-10">
                      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[rgb(var(--ei-moonlit-rgb)/0.16)] bg-[rgb(var(--ei-void-rgb)/0.34)] shadow-[inset_0_0_42px_rgb(var(--ei-violet-rgb)/0.12),0_0_34px_rgb(var(--ei-violet-rgb)/0.08)]">
                        <OrbitalVisual variant="synthesisStar" size={58} />
                      </div>

                      <h2 className="ei-type-section max-w-[12ch]">
                        Let's explore what's possible.
                      </h2>

                      <p className="ei-type-studio-body mt-5 max-w-[32ch] text-[var(--ei-color-text-secondary)]">
                        Whether you have a clear vision or just a feeling that
                        something needs to be built — start here.
                      </p>

                      <div className="mt-9 border-t border-[rgb(var(--ei-moonlit-rgb)/0.1)] pt-7">
                        <div className="grid gap-5">
                          {serviceRows.map((service) => (
                            <div
                              key={service.title}
                              className="grid grid-cols-[2.4rem_1fr] gap-4"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--ei-soft-neon-rgb)/0.24)] bg-[rgb(var(--ei-void-rgb)/0.36)] text-[rgb(var(--ei-moonlit-rgb)/0.86)] shadow-[inset_0_0_22px_rgb(var(--ei-violet-rgb)/0.075)]">
                                <OrbitalVisual
                                  variant={service.icon}
                                  size={26}
                                />
                              </div>

                              <div>
                                <h3 className="ei-type-studio-label text-[var(--ei-color-text-primary)]">
                                  {service.title}
                                </h3>
                                <p className="ei-type-studio-body-small mt-1 text-[var(--ei-color-text-tertiary)]">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <blockquote className="mt-10 max-w-[28ch] border-l border-[rgb(var(--ei-soft-neon-rgb)/0.42)] pl-5">
                        <p className="font-editorial text-[clamp(1.15rem,1.6vw,1.45rem)] italic leading-[1.55] tracking-[-0.015em] text-[rgb(var(--ei-moonlit-rgb)/0.9)]">
                          The best work begins with honest intention and clear
                          communication.
                        </p>
                      </blockquote>
                    </motion.div>
                  </>
                }
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgb(var(--ei-halo-blue-rgb)/0.055),transparent_45%)]"
                />

                <div className="relative z-10">
                  {formState === "success" ? (
                    <div
                      ref={successRef}
                      tabIndex={-1}
                      role="status"
                      aria-live="polite"
                      className="flex min-h-[430px] flex-col items-center justify-center rounded-[var(--ei-card-radius-lg)] border border-[rgb(var(--ei-moonlit-rgb)/0.1)] bg-[rgb(var(--ei-ice-white-rgb)/0.018)] px-8 py-16 text-center"
                    >
                      <p className="ei-type-section max-w-[14ch]">
                        Thank you. Your message is on its way.
                      </p>
                      <p className="ei-type-studio-body mt-6 max-w-[360px] text-[var(--ei-color-text-secondary)]">
                        Echo in Ink will reply within two working days.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      aria-busy={formState === "submitting"}
                      className="space-y-8"
                    >
                      <p className="ei-type-studio-body max-w-[40ch] text-[var(--ei-color-text-secondary)]">
                        Tell us what you are building. Echo in Ink will reply
                        personally within two working days.
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
                        role={
                          formState === "error" || hasFieldErrors
                            ? "alert"
                            : "status"
                        }
                        aria-live={
                          formState === "error" || hasFieldErrors
                            ? "assertive"
                            : "polite"
                        }
                      >
                        <p className="ei-type-studio-body-small">
                          {formState === "submitting"
                            ? "Sending your message..."
                            : statusMessage || "Fields marked * are required."}
                        </p>

                        {(formState === "error" || hasFieldErrors) && (
                          <a
                            href={`mailto:${CONTACT_DIRECT_EMAIL}`}
                            className="ei-link-distinguished mt-3 inline-flex items-center text-[0.75rem] uppercase tracking-[0.16em] text-[var(--ei-color-text-primary)]"
                          >
                            Email directly
                          </a>
                        )}
                      </div>

                      <p className="sr-only" aria-live="polite">
                        {announcement}
                      </p>

                      <div className="grid gap-6 md:grid-cols-2">
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
                          placeholder="Your name"
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
                          placeholder="your@email.com"
                        />
                      </div>

                      <EchoSelect
                        id="exploration"
                        name="exploration"
                        label="What are you exploring?"
                        value={formData.exploration}
                        onChange={handleChange}
                        options={explorationOptions}
                        placeholder="Select an option"
                        disabled={formState === "submitting"}
                      />

                      <EchoFormField
                        type="url"
                        id="projectUrl"
                        name="projectUrl"
                        label="Project URL"
                        value={formData.projectUrl}
                        onChange={handleChange}
                        error={fieldErrors.projectUrl}
                        hint="Optional, if something already exists online."
                        autoComplete="url"
                        inputMode="url"
                        disabled={formState === "submitting"}
                        placeholder="https://your-project.com"
                      />

                      <EchoTextarea
                        id="message"
                        name="message"
                        label="Tell me about what you are trying to express"
                        value={formData.message}
                        onChange={handleChange}
                        error={fieldErrors.message}
                        rows={6}
                        required
                        disabled={formState === "submitting"}
                        placeholder="Describe your project, your questions, or what feels unclear..."
                      />

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
                          placeholder=""
                        />
                      </div>

                      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={formState === "submitting"}
                          className="w-full sm:w-auto"
                        >
                          {formState === "submitting"
                            ? "Sending..."
                            : formState === "error"
                              ? "Try Again"
                              : "Send enquiry"}
                        </Button>

                        <div className="ei-type-studio-body-small flex max-w-[300px] items-start gap-3 text-[var(--ei-color-text-tertiary)]">
                          <span
                            className="mt-0.5 shrink-0 text-[rgb(var(--ei-halo-blue-rgb)/0.82)]"
                            aria-hidden="true"
                          >
                            <OrbitalVisual variant="haloGate" size={24} />
                          </span>
                          <span>
                            Your information is kept private and never shared.
                          </span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </EchoFormPanel>
            </motion.div>

            <motion.div
              variants={fadeSoft}
              className="mt-8 overflow-hidden rounded-[var(--ei-card-radius-lg)] border border-[rgb(var(--ei-moonlit-rgb)/0.12)] bg-[rgb(var(--ei-ice-white-rgb)/0.018)] shadow-[inset_0_1px_0_rgb(var(--ei-ice-white-rgb)/0.04)]"
            >
              <div className="grid gap-0 md:grid-cols-3">
                {trustItems.map((item, index) => (
                  <motion.article
                    key={item.title}
                    variants={driftUp}
                    className={`grid grid-cols-[4.5rem_1fr] gap-5 p-7 md:p-8 ${
                      index > 0
                        ? "border-t border-[rgb(var(--ei-moonlit-rgb)/0.09)] md:border-l md:border-t-0"
                        : ""
                    }`}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgb(var(--ei-soft-neon-rgb)/0.2)] bg-[rgb(var(--ei-void-rgb)/0.34)] shadow-[inset_0_0_34px_rgb(var(--ei-violet-rgb)/0.08)]">
                      <OrbitalVisual variant={item.icon} size={42} />
                    </div>

                    <div>
                      <h2 className="ei-type-studio-label text-[var(--ei-color-text-primary)]">
                        {item.title}
                      </h2>
                      <p className="ei-type-studio-body-small mt-2 max-w-[24ch] text-[var(--ei-color-text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </PageShell>
  );
}

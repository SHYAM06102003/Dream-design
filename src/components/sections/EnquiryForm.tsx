"use client";

import { Check, Compass, Loader2, MessageCircle, Ruler, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  landSizeHint,
  serviceOptions,
  topicMessagePrefix,
  type ServiceOptionId,
  type ServiceSelection,
} from "@/data/enquiry";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import {
  emptyEnquiry,
  formatEnquirySummary,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/validation";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { TextArea, TextField } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "prepared" | "error";

const serviceIcons: Record<ServiceOptionId, typeof Ruler> = {
  survey: Ruler,
  civil: Compass,
};

/**
 * Enquiry form.
 *
 * Front-end only: there is no backend or email service wired up, so the form
 * validates the details and hands the enquiry to WhatsApp rather than
 * pretending a request was sent. The service cards at the top are also
 * pre-selected when a visitor clicks "Enquire" in the Services or Process
 * sections (a `dd:select-service` event).
 */
export function EnquiryForm({ className }: { className?: string }) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function onSelect(event: Event) {
      const { id, topic } = (event as CustomEvent<ServiceSelection>).detail;
      setValues((current) => {
        // Name the service in the message, unless the visitor has written their own.
        const untouched = current.message.trim() === "" || current.message.startsWith(topicMessagePrefix);
        return {
          ...current,
          services: [id],
          message: topic && untouched ? `${topicMessagePrefix}${topic}.` : current.message,
        };
      });
      setErrors((current) => ({ ...current, services: undefined }));
      setStatus((current) => (current === "prepared" ? "idle" : current));
    }
    window.addEventListener("dd:select-service", onSelect);
    return () => window.removeEventListener("dd:select-service", onSelect);
  }, []);

  const update = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const toggleService = (id: ServiceOptionId) =>
    update(
      "services",
      values.services.includes(id)
        ? values.services.filter((item) => item !== id)
        : [...values.services, id],
    );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setNotice("Please check the highlighted fields and try again.");
      const firstKey = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(firstKey === "services" ? "[data-service]" : `#${CSS.escape(firstKey)}`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    // No backend is connected yet, this pause only reflects preparing the message.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("prepared");
    setNotice(
      "Your details are ready. This site has no server connected yet, so nothing has been sent, continue on WhatsApp and it will reach us instantly.",
    );
  }

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(formatEnquirySummary(values));
      setNotice("Enquiry copied to your clipboard.");
    } catch {
      setNotice("Copying is not available in this browser. Use WhatsApp or call us instead.");
    }
  }

  const summary = formatEnquirySummary(values);
  const isSubmitting = status === "submitting";
  const wantsSurvey = values.services.includes("survey");

  if (status === "prepared") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className={cn("rounded-md border border-line p-7 md:p-10", className)}
      >
        <p className="eyebrow">Almost there</p>
        <h3 className="mt-5 text-title">Send this through WhatsApp</h3>
        <p className="mt-4 text-body text-secondary">{notice}</p>

        <pre className="mt-6 max-h-64 overflow-auto rounded-sm border border-line bg-surface p-5 text-caption whitespace-pre-wrap text-primary">
          {summary}
        </pre>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor
            href={whatsappUrl(whatsappMessages.form(summary))}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Send on WhatsApp
          </ButtonAnchor>
          <Button onClick={copyDetails} variant="outline" size="lg">
            Copy details
          </Button>
        </div>

        <button

          suppressHydrationWarning
          type="button"
          onClick={() => {
            setStatus("idle");
            setNotice("");
          }}
          className="mt-6 text-caption text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          Edit the details
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-8 rounded-md border border-line bg-surface p-6 md:p-10", className)}
    >
      <fieldset>
        <legend className="text-caption font-medium text-secondary">
          Which service do you need?
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((option) => {
            const checked = values.services.includes(option.id);
            const Icon = serviceIcons[option.id];
            return (
              <label
                key={option.id}
                className={cn(
                  "relative flex cursor-pointer items-center gap-4 rounded-md border p-4 transition-colors duration-fast ease-standard focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent",
                  checked
                    ? "border-primary bg-primary text-inverse-strong"
                    : "border-secondary hover:border-primary",
                )}
              >
                <input
                  suppressHydrationWarning
                  type="checkbox"
                  data-service=""
                  checked={checked}
                  onChange={() => toggleService(option.id)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-sm",
                    checked ? "bg-inverse-strong text-primary" : "bg-accent-soft text-primary",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-body font-semibold">{option.label}</span>
                  <span className={cn("block text-caption", checked ? "text-inverse" : "text-secondary")}>
                    {option.hint}
                  </span>
                </span>
                {checked ? <Check className="size-5" strokeWidth={2} aria-hidden="true" /> : null}
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-caption text-secondary">Choose one, or both.</p>
        {errors.services ? (
          <p className="mt-2 text-caption text-accent" role="alert">
            {errors.services}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => update("name", event.target.value)}
        />
        <TextField
          id="phone"
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="e.g. +91 98765 43210"
          required
          value={values.phone}
          error={errors.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Optional"
          value={values.email}
          error={errors.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <TextField
          id="location"
          label="Location"
          name="location"
          placeholder="Village, town or district"
          required
          value={values.location}
          error={errors.location}
          onChange={(event) => update("location", event.target.value)}
        />
        <TextField
          id="landSize"
          label={wantsSurvey ? "Plot size" : "Plot size (if known)"}
          name="landSize"
          placeholder="Optional"
          hint={landSizeHint}
          value={values.landSize}
          error={errors.landSize}
          onChange={(event) => update("landSize", event.target.value)}
          className="sm:col-span-2"
        />
      </div>

      <TextArea
        id="message"
        label="Message"
        name="message"
        placeholder="Tell us a little about the plot or the project, and when you would like us to visit."
        value={values.message}
        error={errors.message}
        onChange={(event) => update("message", event.target.value)}
      />

      <AnimatePresence>
        {notice ? (
          <motion.p
            key={notice}
            role="status"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "overflow-hidden border-l-3 pl-4 text-body",
              status === "error" ? "border-accent text-accent" : "border-primary text-secondary",
            )}
          >
            {notice}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={1.5} aria-hidden="true" />
              Preparing
            </>
          ) : (
            <>
              Send enquiry
              <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-caption text-secondary">
          We only use these details to reply to your enquiry.
        </p>
      </div>
    </form>
  );
}

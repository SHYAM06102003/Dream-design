"use client";

import { Loader2, MessageCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import {
  budgetHint,
  floorOptions,
  houseTypeOptions,
  landSizeHint,
  serviceOptions,
  type ServiceOptionId,
} from "@/data/enquiry";
import { site } from "@/data/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import {
  emptyEnquiry,
  formatEnquirySummary,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/validation";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { CheckboxGroup, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { PhoneLink } from "@/components/PhoneLink";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "prepared" | "error";

/**
 * Project enquiry form.
 *
 * Front-end only in this version: there is no backend or email service wired
 * up, so the form validates the details and then hands the enquiry to WhatsApp
 * rather than pretending a request was sent. To connect a real backend, submit
 * to an API route or your email/CRM provider in `handleSubmit` and swap
 * `status` to "prepared" only on a successful response.
 */
export function EnquiryForm({ className }: { className?: string }) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  function focusFirstError(nextErrors: EnquiryErrors) {
    const firstKey = Object.keys(nextErrors)[0];
    if (!firstKey) return;
    const element = formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(firstKey)}`);
    element?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setNotice("Please check the highlighted fields and try again.");
      focusFirstError(nextErrors);
      return;
    }

    setStatus("submitting");

    // No backend is connected yet — this pause only reflects preparing the message.
    await new Promise((resolve) => setTimeout(resolve, 650));

    setStatus("prepared");
    setNotice(
      "Your details are ready to send. This site has no server connected yet, so nothing has been transmitted — continue on WhatsApp and it will arrive instantly.",
    );
  }

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(formatEnquirySummary(values));
      setNotice("Enquiry copied to your clipboard.");
    } catch {
      setStatus("error");
      setNotice("Copying is not available in this browser. Use WhatsApp or call us instead.");
    }
  }

  const summary = formatEnquirySummary(values);
  const isSubmitting = status === "submitting";

  return (
    <div className={cn("grid gap-10 lg:grid-cols-12 lg:gap-14", className)}>
      {/* Pitch */}
      <div className="lg:col-span-4">
        <h2 className="text-display-sm">
          Have a plot?
          <br />
          Let&rsquo;s turn it into a home.
        </h2>
        <p className="mt-6 max-w-sm text-lede text-secondary">
          Tell us about the land and what you have in mind. We usually reply with the next
          step &mdash; often a site visit and an honest view of what the plot will take.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <ButtonAnchor
            href={whatsappUrl(whatsappMessages.consultation())}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
          >
            <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
            WhatsApp us
          </ButtonAnchor>
          <PhoneLink
            className="h-14 justify-center rounded-sm border border-secondary px-6 text-caption font-medium transition-colors duration-fast ease-standard hover:border-primary hover:bg-primary hover:text-inverse-strong"
          >
            <span className="hidden sm:inline">Call </span>
            {site.phone.display}
          </PhoneLink>
        </div>

        <p className="placeholder mt-8 text-caption">
          Phone, email and office details are placeholders &mdash; update them in{" "}
          <code className="font-mono text-caption">data/site.ts</code>.
        </p>
      </div>

      {/* Form */}
      <div className="lg:col-span-7 lg:col-start-6">
        {status === "prepared" ? (
          <div className="rounded-md border border-line p-7 md:p-10">
            <p className="eyebrow">Almost there</p>
            <h3 className="mt-5 text-title">Send this through WhatsApp</h3>
            <p className="mt-4 text-body text-secondary">{notice}</p>

            <pre className="mt-6 max-h-64 overflow-auto border border-line bg-surface p-5 text-caption whitespace-pre-wrap text-primary">
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
              type="button"
              onClick={() => {
                setValues(emptyEnquiry);
                setErrors({});
                setStatus("idle");
                setNotice("");
              }}
              className="mt-6 text-caption text-secondary underline underline-offset-4 transition-colors hover:text-primary"
            >
              Edit the details
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
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
                placeholder="Include your area or country code"
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
                label="Location of the land"
                name="location"
                placeholder="Village, city or area"
                required
                value={values.location}
                error={errors.location}
                onChange={(event) => update("location", event.target.value)}
              />
              <TextField
                id="landSize"
                label="Land size"
                name="landSize"
                placeholder="e.g. 2,400 sq.ft"
                hint={landSizeHint}
                required
                value={values.landSize}
                error={errors.landSize}
                onChange={(event) => update("landSize", event.target.value)}
              />
              <TextField
                id="budget"
                label="Approximate budget"
                name="budget"
                placeholder="Optional"
                hint={budgetHint}
                value={values.budget}
                error={errors.budget}
                onChange={(event) => update("budget", event.target.value)}
              />
              <SelectField
                id="houseType"
                label="Type of house"
                name="houseType"
                options={houseTypeOptions}
                value={values.houseType}
                error={errors.houseType}
                onChange={(event) => update("houseType", event.target.value)}
              />
              <SelectField
                id="floors"
                label="Number of floors"
                name="floors"
                options={floorOptions}
                placeholder="Optional"
                value={values.floors}
                error={errors.floors}
                onChange={(event) => update("floors", event.target.value)}
              />
            </div>

            <CheckboxGroup
              legend="Required services"
              options={serviceOptions.map((option) => ({ id: option.id, label: option.label }))}
              value={values.services}
              onChange={(next) => update("services", next as ServiceOptionId[])}
              error={errors.services}
            />

            <TextArea
              id="message"
              label="Message"
              name="message"
              placeholder="Anything we should know — access, timelines, rooms you need, or an existing structure."
              value={values.message}
              error={errors.message}
              onChange={(event) => update("message", event.target.value)}
            />

            {notice ? (
              <p
                role="status"
                className={cn(
                  "border-l-3 pl-4 text-body",
                  status === "error" ? "border-accent text-accent" : "border-primary text-secondary",
                )}
              >
                {notice}
              </p>
            ) : null}

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
                    Request a consultation
                    <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </>
                )}
              </Button>

              <p className="text-caption text-secondary">
                No account needed. We only use these details to reply about your project.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

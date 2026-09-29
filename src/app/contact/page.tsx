import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Talk to us about your land. Call, WhatsApp or send the project enquiry form — land size, budget and services, and we will come back with the next step.",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us about\nyour land."
        description="Call, message or send the enquiry form — whichever is easiest. Tell us about the plot and we will come back with the next step, usually a site visit."
      />

      {/* The form lives under its own anchor so every "Start your project" CTA deep-links here. */}
      <section id="enquiry" className="surface-inset py-11 lg:py-17">
        <div className="shell">
          <EnquiryForm />
        </div>
      </section>

      <ContactSection />
      <CtaBanner />
    </>
  );
}

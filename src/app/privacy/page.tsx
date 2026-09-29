import type { Metadata } from "next";
import { formatAddress, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy policy",
  description: "How this website handles the information you send through the enquiry form.",
});

export default function PrivacyPage() {
  const lastReviewed = "Draft — review before launch";

  return (
    <article className="bg-surface py-11 lg:py-17">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 text-display-sm">Privacy policy</h1>
          <p className="placeholder mt-4 text-caption">{lastReviewed}</p>

          <div className="mt-10 space-y-8 text-body text-secondary">
            <p className="placeholder rounded-md border border-line p-6 text-body">
              This is a template, not legal advice. The owner of this website must replace it with a
              policy that matches how the business actually collects and stores data, and have it
              reviewed for their jurisdiction before the site goes live.
            </p>

            <section>
              <h2 className="text-title-sm">What this site collects</h2>
              <p className="mt-3">
                The enquiry form on this website is front-end only. It does not send your details to
                a server or store them. What you enter is used in your browser to build a message,
                which you then choose to send — through WhatsApp, or by copying it yourself. Your
                browser may hold basic, anonymous usage data through hosting and analytics providers.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">What happens when you get in touch</h2>
              <p className="mt-3">
                If you send an enquiry through WhatsApp, email or a phone call, that conversation is
                handled by the messaging or email provider you use and by {site.legalName}. The
                information you share is used only to respond to your enquiry and to discuss your
                project.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Cookies</h2>
              <p className="mt-3">
                This website does not set advertising or tracking cookies. If analytics or advertising
                tools are added later, this policy must be updated to name them and explain how to opt
                out.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Your choices</h2>
              <p className="mt-3">
                You can ask what information is held about you, request a correction, or ask for it
                to be deleted. Contact {site.legalName} at{" "}
                <a href={site.email.href} className="underline underline-offset-4 hover:text-primary">
                  {site.email.display}
                </a>{" "}
                or on WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Contact</h2>
              <p className="mt-3">
                {site.legalName}
                <br />
                {formatAddress().map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <a href={`tel:${site.phone.href}`} className="underline underline-offset-4 hover:text-primary">
                  {site.phone.display}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

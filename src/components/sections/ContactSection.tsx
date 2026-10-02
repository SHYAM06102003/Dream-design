import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { formatAddress, site } from "@/data/site";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "./EnquiryForm";

export function ContactSection() {
  const address = formatAddress();
  const hasEmail = !site.email.display.endsWith("example.com");
  const mapsHref = `${site.mapsUrl}${encodeURIComponent(address.join(", "))}`;

  const rows = [
    { icon: Phone, label: "Phone", value: site.phone.display, href: `tel:${site.phone.href}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: site.phone.display,
      href: `https://wa.me/${site.whatsapp.number.replace(/\D/g, "")}`,
    },
    ...(hasEmail
      ? [{ icon: Mail, label: "Email", value: site.email.display, href: site.email.href }]
      : []),
  ];

  return (
    <section id="contact" className="bg-surface py-14 lg:py-20">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Tell us what you need."
            description="Choose a service, share a few details and we will get back to you with the next step, usually a site visit."
          />
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
          <MagneticButton className="block">
            <a
              href={`tel:${site.phone.href}`}
              className="group flex items-center justify-between gap-4 rounded-md bg-primary p-6 text-inverse-strong transition-colors duration-slow ease-standard hover:bg-accent md:p-8"
            >
              <span>
                <span className="block text-caption text-inverse">Call us</span>
                <span className="mt-1 block text-title-sm whitespace-nowrap sm:text-title">{site.phone.display}</span>
              </span>
              <Phone className="size-6 transition-transform duration-slow group-hover:rotate-12" strokeWidth={1.4} aria-hidden="true" />
            </a>
          </MagneticButton>
          <MagneticButton className="block">
            <a
              href={`https://wa.me/${site.whatsapp.number.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-md bg-accent-soft p-6 text-primary transition-colors duration-slow ease-standard hover:bg-primary hover:text-inverse-strong md:p-8"
            >
              <span>
                <span className="block text-caption">Chat on WhatsApp</span>
                <span className="mt-1 block text-title-sm sm:text-title">Message us now</span>
              </span>
              <MessageCircle className="size-6 transition-transform duration-slow group-hover:scale-110" strokeWidth={1.4} aria-hidden="true" />
            </a>
          </MagneticButton>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <dl className="border-t border-line">
              {rows.map((row) => (
                <div key={row.label} className="border-b border-line py-5">
                  <dt className="flex items-center gap-2.5 text-caption font-medium text-secondary">
                    <row.icon className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                    {row.label}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex min-h-11 items-center text-title-sm transition-colors duration-fast ease-standard hover:text-accent"
                    >
                      {row.value}
                    </a>
                  </dd>
                </div>
              ))}

              <div className="border-b border-line py-5">
                <dt className="flex items-center gap-2.5 text-caption font-medium text-secondary">
                  <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Office
                </dt>
                <dd
                  className="mt-2 text-body"
                >
                  {address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-link mt-2"
                  >
                    Open in Google Maps
                  </a>
                </dd>
              </div>

              <div className="border-b border-line py-5">
                <dt className="text-caption font-medium text-secondary">{site.serviceArea.label}</dt>
                <dd className="mt-2 text-body">{site.serviceArea.items.join(" · ")}</dd>
              </div>

              <div className="py-5">
                <dt className="text-caption font-medium text-secondary">Follow us</dt>
                <dd className="mt-3">
                  <SocialLinks />
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.08}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

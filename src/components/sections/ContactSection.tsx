import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { formatAddress, site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function mapQuery() {
  const parts = [site.address.line1, site.address.city, site.address.region, site.address.postalCode, site.address.country]
    .map((part) => part.trim())
    .filter(Boolean);
  return encodeURIComponent(parts.join(", "));
}

export function ContactSection() {
  const address = formatAddress();
  const isPlaceholderAddress = site.address.line1.toLowerCase().includes("add your");

  const rows = [
    {
      icon: Phone,
      label: "Phone",
      value: site.phone.display,
      href: `tel:${site.phone.href}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: site.phone.display,
      href: `https://wa.me/${site.whatsapp.number.replace(/\D/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email.display,
      href: site.email.href,
    },
  ];

  return (
    <section id="contact" className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to us about your land."
            description="Call, message or send the enquiry form — whichever is easiest. We will come back with the next step."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <Reveal className="lg:col-span-5">
            <dl className="border-t border-line">
              {rows.map((row) => (
                <div key={row.label} className="border-b border-line py-5">
                  <dt className="flex items-center gap-2.5 text-caption font-medium text-secondary">
                    <row.icon className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                    {row.label}
                  </dt>
                  <dd className="mt-2.5">
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-title-sm transition-colors duration-fast ease-standard hover:text-accent"
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
                <dd className={`mt-2.5 text-title-sm ${isPlaceholderAddress ? "placeholder" : ""}`}>
                  {address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>

              <div className="border-b border-line py-5">
                <dt className="text-caption font-medium text-secondary">
                  {site.serviceArea.label}
                </dt>
                <dd className="mt-2.5 text-lede ">
                  {site.serviceArea.items.length > 0 ? (
                    site.serviceArea.items.join(" · ")
                  ) : (
                    <span className="placeholder">{site.serviceArea.note}</span>
                  )}
                </dd>
              </div>

              <div className="py-5">
                <dt className="text-caption font-medium text-secondary">
                  Business
                </dt>
                <dd className="mt-2.5 text-title-sm">
                  {site.legalName}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Map placeholder */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <div className="drafting-grid relative flex aspect-[4/3] w-full flex-col items-center justify-center border border-line bg-surface p-8 text-center">
              <MapPin className="size-8 text-accent" strokeWidth={1.2} aria-hidden="true" />
              <p className="mt-5 text-title-sm">
                {isPlaceholderAddress ? "Map goes here" : site.address.line1}
              </p>
              <p className="placeholder mt-2 max-w-xs text-caption">
                Add your office address in <code className="font-mono text-caption">data/site.ts</code> to
                show the real location.
              </p>
              <a
                href={`${site.mapsUrl}${mapQuery()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link mt-7"
              >
                Open in Google Maps
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

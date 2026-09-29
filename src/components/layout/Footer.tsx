import Link from "next/link";
import { serviceGroups } from "@/data/services";
import { footerNavigation, legalNavigation } from "@/data/navigation";
import { formatAddress, site } from "@/data/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { PhoneLink } from "@/components/PhoneLink";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Footer() {
  const year = new Date().getFullYear();
  const address = formatAddress();

  return (
    <footer className="bg-primary text-inverse-strong">
      <div className="shell py-11 lg:py-17">
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-12 lg:gap-8">
          {/* Brand + primary action */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo onDark />
            <p className="mt-6 max-w-xs text-body text-inverse">
              {site.tagline}
            </p>
            <div className="mt-8">
              <WhatsAppButton variant="onDark">WhatsApp us</WhatsAppButton>
            </div>
            <SocialLinks className="mt-8 [&_span]:border-inverse [&_a]:border-inverse [&_a]:text-inverse [&_span]:text-inverse hover:[&_a]:bg-surface hover:[&_a]:text-primary" />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-caption font-medium text-inverse">
              Navigation
            </h2>
            <ul className="mt-6 space-y-3.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="tap text-body text-inverse transition-colors duration-fast hover:text-inverse-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services — the three sections of /services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-caption font-medium text-inverse">
              Services
            </h2>
            <ul className="mt-6 space-y-3.5">
              {serviceGroups.map((group) => (
                <li key={group.id}>
                  <Link
                    href={`/services#${group.id}`}
                    className="tap text-body text-inverse transition-colors duration-fast hover:text-inverse-strong"
                  >
                    {group.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className="text-caption font-medium text-inverse">
              Contact
            </h2>
            <ul className="mt-6 space-y-3.5 text-body text-inverse">
              <li>
                <PhoneLink className="text-inverse duration-fast hover:text-inverse-strong" />
              </li>
              <li>
                <a
                  href={site.email.href}
                  className="tap transition-colors duration-fast hover:text-inverse-strong"
                >
                  {site.email.display}
                </a>
              </li>
              {address.map((line) => (
                <li key={line} className="placeholder">
                  {line}
                </li>
              ))}
              {site.serviceArea.items.length > 0 ? (
                <li>{site.serviceArea.items.join(" · ")}</li>
              ) : null}
            </ul>
            <ArrowLink
              href="/contact"
              className="mt-8 border-inverse text-inverse hover:text-inverse-strong"
            >
              All contact details
            </ArrowLink>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary pb-[env(safe-area-inset-bottom)]">
        <div className="shell flex flex-col gap-4 py-7 text-caption text-inverse md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              © {year} {site.legalName}. All rights reserved.
            </span>
            <span aria-hidden="true" className="text-inverse">
              —
            </span>
            <Link
              href="/credits"
              className="tap underline underline-offset-4 transition-colors duration-fast hover:text-inverse-strong"
            >
              Image credits
            </Link>
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap transition-colors duration-fast hover:text-inverse-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

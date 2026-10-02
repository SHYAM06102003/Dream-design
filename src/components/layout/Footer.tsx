"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { offerings } from "@/data/offerings";
import { legalNavigation, navigation } from "@/data/navigation";
import { formatAddress, site } from "@/data/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { PhoneLink } from "@/components/PhoneLink";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  const address = formatAddress();
  const hasEmail = !site.email.display.endsWith("example.com");

  return (
    <footer data-nav-dark className="grain relative isolate overflow-hidden bg-primary text-inverse-strong">
      <div className="border-b border-secondary">
        <div className="shell flex flex-col gap-8 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Start here</p>
            <p className="mt-6 max-w-3xl text-display-sm text-balance">
              Have a plot or a project? Let&rsquo;s measure it and plan it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticButton>
              <Link
                href="/#contact"
                className="inline-flex h-16 items-center rounded-sm bg-accent-soft px-8 text-caption font-semibold text-primary transition-colors duration-fast ease-standard hover:bg-inverse-strong"
              >
                Get a quote
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </div>
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
            <SocialLinks className="mt-8 [&_a]:border-inverse [&_a]:text-inverse hover:[&_a]:bg-surface hover:[&_a]:text-primary" />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-caption font-medium text-inverse">
              Navigation
            </h2>
            <ul className="mt-6 space-y-3.5">
              {navigation.map((item) => (
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

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-caption font-medium text-inverse">
              Services
            </h2>
            <ul className="mt-6 space-y-3.5">
              {offerings.map((offering) => (
                <li key={offering.id}>
                  <Link
                    href="/#services"
                    className="tap text-body text-inverse transition-colors duration-fast hover:text-inverse-strong"
                  >
                    {offering.label}
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
              {hasEmail ? (
                <li>
                  <a
                    href={site.email.href}
                    className="tap transition-colors duration-fast hover:text-inverse-strong"
                  >
                    {site.email.display}
                  </a>
                </li>
              ) : null}
              {address.map((line) => (
                <li key={line}>
                  {line}
                </li>
              ))}
              {site.serviceArea.items.length > 0 ? (
                <li>{site.serviceArea.items.join(" · ")}</li>
              ) : null}
            </ul>
            <ArrowLink
              href="/#contact"
              className="mt-8 border-inverse text-inverse hover:text-inverse-strong"
            >
              Send an enquiry
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

      {/* Closing wordmark: the company name, oversized, fading into the page edge */}
      <div aria-hidden="true" className="pointer-events-none overflow-hidden select-none">
        <motion.p
          initial={{ opacity: 0, y: "30%" }}
          whileInView={{ opacity: 1, y: "0%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
          className="-mb-[0.16em] bg-gradient-to-b from-inverse-strong/35 via-inverse-strong/12 to-transparent bg-clip-text pt-6 text-center text-[13.6vw] leading-[0.95] font-semibold tracking-[-0.045em] whitespace-nowrap text-transparent"
        >
          Dream Design
        </motion.p>
      </div>
    </footer>
  );
}

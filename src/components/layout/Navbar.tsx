"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/**
 * Sticky site header.
 * Transparent over the home hero, then settles onto a solid, blurred bar.
 * The trigger only turns solid after a small scroll so the hero stays clean.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = pathname === "/";
  const solid = scrolled || !overHero;
  const onDark = overHero && !solid;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 14);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-90 pt-[env(safe-area-inset-top)] transition-colors duration-slow ease-standard",
          solid
            ? "border-b border-line bg-surface"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-12 items-center justify-between gap-6 md:h-13">
          <Logo onDark={onDark} />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {navigation.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative inline-flex min-h-11 items-center text-caption font-medium transition-colors duration-fast",
                    onDark
                      ? "text-inverse hover:text-inverse-strong"
                      : isActive
                        ? "text-primary"
                        : "text-secondary hover:text-primary",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-fast ease-standard",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-4">
            <a
              href={whatsappUrl(whatsappMessages.consultation())}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "tap hidden items-center gap-2 text-caption font-medium transition-colors duration-fast md:inline-flex",
                onDark ? "text-inverse hover:text-inverse-strong" : "text-secondary hover:text-primary",
              )}
            >
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
              WhatsApp
            </a>

            <ButtonLink
              href="/contact#enquiry"
              size="sm"
              variant={onDark ? "onDark" : "primary"}
              className="hidden md:inline-flex"
            >
              Start your project
            </ButtonLink>

            {/* Phone action — the bar has room for exactly one on a small
                screen, and the header CTA is hidden below md. */}
            <a
              href={whatsappUrl(whatsappMessages.consultation())}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-sm border transition-colors duration-fast ease-standard md:hidden",
                onDark
                  ? "border-inverse text-inverse-strong"
                  : "border-secondary text-primary hover:border-primary",
              )}
            >
              <span className="sr-only">Start your project on WhatsApp</span>
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-sm border transition-colors duration-fast ease-standard lg:hidden",
                onDark
                  ? "border-inverse text-inverse-strong"
                  : "border-secondary text-primary hover:border-primary",
              )}
            >
              <span className="sr-only">Open menu</span>
              <svg
                viewBox="0 0 20 20"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                aria-hidden="true"
              >
                <path d="M2 6h16M2 14h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}

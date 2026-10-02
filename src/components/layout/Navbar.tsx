"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, sectionIds } from "@/data/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
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
  // True while a dark section ([data-nav-dark]) sits directly under the bar.
  const [overDarkSection, setOverDarkSection] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = pathname === "/";
  const activeId = useActiveSection(sectionIds, overHero);
  const solid = scrolled || !overHero;
  const darkGlass = solid && overDarkSection;
  const onDark = (overHero && !solid) || darkGlass;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 14);
        const below = (headerRef.current?.offsetHeight ?? 56) + 1;
        const el = document.elementFromPoint(window.innerWidth / 2, below);
        setOverDarkSection(Boolean(el?.closest("[data-nav-dark]")));
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-90 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter,box-shadow] duration-slow ease-standard",
          !solid
            ? "border-b border-transparent bg-transparent"
            : darkGlass
              ? // Frosted glass over dark sections: dark tint, light text.
                "border-b border-inverse/10 bg-primary/55 backdrop-blur-xl backdrop-saturate-150"
              : // Frosted glass over light sections: the page shows through, blurred.
                "border-b border-line/60 bg-surface/70 shadow-[0_1px_24px_rgb(28_24_20/0.06)] backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <div className="shell flex h-12 items-center justify-between gap-6 md:h-13">
          <Logo onDark={onDark} />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {navigation.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
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
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current opacity-50 transition-transform duration-fast ease-standard group-hover:scale-x-100"
                  />
                  {isActive ? (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-current"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
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

            <MagneticButton className="hidden md:inline-block">
            <ButtonLink
              href="/#contact"
              size="sm"
              variant={onDark ? "onDark" : "primary"}
              
            >
              Get a quote
            </ButtonLink>
            </MagneticButton>

            {/* Phone action, the bar has room for exactly one on a small
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
              <span className="sr-only">Chat on WhatsApp</span>
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </a>

            <button

              suppressHydrationWarning
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

      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </>
  );
}

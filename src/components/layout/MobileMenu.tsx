"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { PhoneLink } from "@/components/PhoneLink";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { ButtonAnchor } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/**
 * Full-screen mobile navigation.
 * Escape closes it, Tab is trapped inside the panel, focus returns to the
 * trigger, and the page behind is inert to scrolling.
 */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-100 flex flex-col bg-surface lg:hidden"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        >
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-5 pt-[env(safe-area-inset-top)] sm:px-8">
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-sm border border-secondary transition-colors duration-fast ease-standard hover:border-primary"
            >
              <span className="sr-only">Close menu</span>
              <svg
                viewBox="0 0 20 20"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                aria-hidden="true"
              >
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-8">
            <ul className="divide-y divide-line border-y border-line">
              {navigation.map((item, index) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.06 + index * 0.045,
                      ease: [0.2, 0, 0, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-3.5 text-display-sm transition-colors duration-fast ease-standard sm:py-4",
                        isActive
                          ? "border-l-3 border-accent pl-4 text-accent"
                          : "text-primary hover:text-accent",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight
                        className="size-5 opacity-40"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

          </nav>

          {/* Pinned below the scrolling list: on a short phone the primary
              action must never be the thing that falls below the fold. */}
          <div className="shrink-0 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
            <motion.div
              className="flex flex-col gap-3"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.34 }}
            >
              <ButtonAnchor
                href={whatsappUrl(whatsappMessages.consultation())}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Start your project
              </ButtonAnchor>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-1">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap items-center gap-2 text-caption text-secondary transition-colors duration-fast ease-standard hover:text-primary"
                >
                  <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  WhatsApp
                </a>
                <PhoneLink className="text-caption text-secondary transition-colors duration-fast ease-standard hover:text-primary" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

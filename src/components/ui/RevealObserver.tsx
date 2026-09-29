"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";
const REVEALED_CLASS = "is-revealed";

/**
 * One IntersectionObserver for every scroll reveal on the site.
 *
 * Keeps `[data-reveal]` elements plain server-rendered elements (no client
 * component per section) while still delivering a single, cheap observer.
 * Elements are visible by default; the `js` class on <html> — set before paint
 * in the root layout — is what allows the hidden start state.
 *
 * This lives in the root layout, so it outlives every page. The scan therefore
 * re-runs on each route change: a client-side navigation swaps the DOM under a
 * layout that never remounts, so without the re-scan the new page's reveals
 * would never be observed and would sit at `opacity: 0` — a blank page that only
 * a full refresh would fix. `useEffect` runs after the commit, so the incoming
 * page's nodes are already in the document by the time the scan runs.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supported = !reduceMotion && typeof IntersectionObserver !== "undefined";

    const observer: IntersectionObserver | null = supported
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add(REVEALED_CLASS);
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
        )
      : null;

    /** Observe every still-hidden reveal in a node or subtree. */
    const watch = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((node) => {
        // Already showing — left alone so a re-scan never re-animates anything.
        if (node.classList.contains(REVEALED_CLASS)) return;
        // Reduced motion, or no observer support: never leave content hidden.
        if (observer) observer.observe(node);
        else node.classList.add(REVEALED_CLASS);
      });
    };

    watch(document);

    if (!observer) return;

    // Catches reveals inserted after the scan — a client component that mounts
    // more content on the page already being viewed. A reveal is only ever
    // appended to, so one childList pass per batch is enough.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) watch(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

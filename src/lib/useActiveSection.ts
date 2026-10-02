"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section the reader is currently in.
 *
 * A section is "active" once its top edge has passed a line a third of the way
 * down the viewport, so the highlight changes as a heading reaches the reading
 * area rather than the instant a sliver of the next section appears. At the very
 * bottom of the page the last section wins, so a short final section can still
 * be reached.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = ids[0] ?? null;

      if (atBottom) {
        current = ids[ids.length - 1] ?? current;
      } else {
        for (const id of ids) {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return enabled ? active : null;
}

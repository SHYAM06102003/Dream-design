"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts up to `to` once when scrolled into view. Use only for real numbers. */
export function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduce) return;
    ref.current.textContent = "0";
  }, [reduce]);

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.2, 0, 0, 1],
      onUpdate: (value) => {
        node.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <>
      <span ref={ref}>{to}</span>
      {suffix}
    </>
  );
}

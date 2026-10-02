"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin reading-progress line along the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-0.5 origin-left bg-accent"
    />
  );
}

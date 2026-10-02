"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Travel distance, in pixels. */
  distance?: number;
  as?: "div" | "li" | "section" | "article" | "header";
};

/** Fade-and-rise when scrolled into view, once. Reduced motion is handled by MotionProvider. */
export function Reveal({ children, className, delay = 0, distance = 24, as = "div" }: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </Tag>
  );
}

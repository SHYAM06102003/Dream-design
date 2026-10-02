"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TextRevealProps = {
  /** One entry per visual line; each line rises out of its own mask. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" plays immediately (hero); "view" plays when scrolled into view. */
  trigger?: "mount" | "view";
};

const line = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 0.95, ease: [0.2, 0, 0, 1] as const } },
};

/** Line-by-line masked headline reveal. The text stays in the DOM for crawlers and screen readers. */
export function TextReveal({
  lines,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.12,
  trigger = "view",
}: TextRevealProps) {
  const Tag = motion[as] as typeof motion.h2;
  const play =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...play}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((content, index) => (
        <span key={index} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className="block" variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

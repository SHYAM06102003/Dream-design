import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Travel distance, in pixels. Keep small: the motion token is a 300ms fade. */
  distance?: number;
  as?: "div" | "li" | "section" | "article" | "header";
};

/**
 * Fade-and-rise reveal used across the site.
 *
 * Deliberately minimal: a single short transition, triggered once when the
 * element enters the viewport, and switched off entirely when the visitor has
 * asked for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 8,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      className={cn(className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-distance": `${distance}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

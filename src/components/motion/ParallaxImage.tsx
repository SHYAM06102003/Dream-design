"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Fraction of the frame the picture travels; 0.1 is subtle. */
  depth?: number;
  /**
   * Tailwind object-position classes, to keep the subject in frame when cropped.
   * Can differ per screen size, e.g. "object-[50%_45%] lg:object-[50%_62%]".
   */
  positionClassName?: string;
};

/** A framed photograph that unmasks on entry and drifts slightly as the page scrolls. */
export function ParallaxImage({ src, alt, sizes, className, priority, depth = 0.1, positionClassName }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${depth * 50}%`, `${depth * 50}%`]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: [0.2, 0, 0, 1] }}
      className={cn("relative overflow-hidden rounded-md bg-line", className)}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{ y, top: `-${depth * 50}%`, bottom: `-${depth * 50}%` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", positionClassName)} />
      </motion.div>
    </motion.div>
  );
}

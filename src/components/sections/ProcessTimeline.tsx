"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

function StepText({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <>
      <h3 className="text-title-sm">
        {step.title}
      </h3>
      <p className="mt-2 text-caption text-secondary">{step.summary}</p>
    </>
  );
}

/**
 * Six-stage journey.
 * Horizontal rail with a scroll-driven progress line from `lg` up; a vertical
 * timeline with the same behaviour on small screens.
 */
export function ProcessTimeline({ className }: { className?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const rawScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rawScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressX = useSpring(rawScaleX, { stiffness: 120, damping: 30, mass: 0.4 });
  const progressY = useSpring(rawScaleY, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={railRef} className={cn(className)}>
      {/* ---------- Desktop / tablet landscape: horizontal rail ---------- */}
      <ol className="relative hidden lg:grid lg:grid-cols-6 lg:gap-6">
        {/* Rail */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-2 h-px bg-line"
        >
          <motion.div
            className="h-px origin-left bg-accent"
            style={reduceMotion ? { scaleX: 1 } : { scaleX: progressX }}
          />
        </div>

        {processSteps.map((step, index) => (
          <li key={step.id} className="relative pt-12">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0.5 flex size-3 items-center justify-center rounded-full border border-accent bg-surface"
            />
            <span className="text-title font-semibold text-accent">
              {step.number}
            </span>
            <div className="mt-4 pr-4">
              <StepText step={step} />
              <p className="mt-4 border-t border-line pt-3 text-caption text-secondary">
                {step.outcome}
              </p>
            </div>
            {index === 0 ? <span className="sr-only">First stage</span> : null}
          </li>
        ))}
      </ol>

      {/* ---------- Mobile: vertical timeline ---------- */}
      <ol className="relative lg:hidden">
        <div
          aria-hidden="true"
          className="absolute left-[0.4375rem] top-2 bottom-2 w-px bg-line"
        >
          <motion.div
            className="w-px origin-top bg-accent"
            style={reduceMotion ? { scaleY: 1 } : { scaleY: progressY }}
          />
        </div>

        {processSteps.map((step) => (
          <li key={step.id} className="relative pb-10 pl-10 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 flex size-3.5 items-center justify-center rounded-full border border-accent bg-surface"
            />
            <div className="flex items-baseline gap-3">
              <span className="text-title font-semibold text-accent">
                {step.number}
              </span>
              <h3 className="text-title-sm">{step.title}</h3>
            </div>
            <p className="mt-2 text-body text-secondary">{step.summary}</p>
            <p className="mt-3 text-caption text-primary">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

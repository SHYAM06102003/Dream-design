"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Compass, Ruler } from "lucide-react";
import { useId, useRef, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { offerings, type Offering, type OfferingId } from "@/data/offerings";
import { cn } from "@/lib/utils";

type OfferingTabsProps = {
  /** "services" shows what each offering covers; "process" shows how it is delivered. */
  mode: "services" | "process";
  /** Render on the dark surface. */
  onDark?: boolean;
};

const icons: Record<OfferingId, typeof Ruler> = { survey: Ruler, civil: Compass };
const ease = [0.2, 0, 0, 1] as const;

/** Tells the enquiry form which service the visitor was looking at. */
function chooseService(id: OfferingId) {
  window.dispatchEvent(new CustomEvent("dd:select-service", { detail: id }));
}

const panel: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease } },
};
const item: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/**
 * Two large, clearly clickable cards (Survey and Civil Consultant) and the
 * detail panel for whichever is selected. One component serves both the
 * Services and the Process sections so they behave identically.
 */
export function OfferingTabs({ mode, onDark = false }: OfferingTabsProps) {
  const [selected, setSelected] = useState<OfferingId>("survey");
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = offerings.find((o) => o.id === selected) ?? offerings[0];

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % offerings.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + offerings.length) % offerings.length;
    else return;
    event.preventDefault();
    const id = offerings[next].id;
    setSelected(id);
    tabRefs.current[id]?.focus();
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <div
          role="tablist"
          aria-label={mode === "services" ? "Choose a service" : "Choose a process"}
          className={cn(
            "relative inline-flex w-full rounded-full border p-1.5 sm:w-auto",
            onDark ? "border-secondary" : "border-line bg-accent-soft/40",
          )}
        >
          {offerings.map((offering, index) => {
            const Icon = icons[offering.id];
            const isActive = offering.id === selected;
            return (
              <button
                suppressHydrationWarning
                key={offering.id}
                ref={(node) => {
                  tabRefs.current[offering.id] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${offering.id}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelected(offering.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "relative isolate flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full px-5 text-caption font-semibold whitespace-nowrap transition-colors duration-slow ease-standard sm:flex-none sm:px-7",
                  isActive
                    ? onDark
                      ? "text-primary"
                      : "text-inverse-strong"
                    : onDark
                      ? "text-inverse hover:text-inverse-strong"
                      : "text-secondary hover:text-primary",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId={`${baseId}-pill`}
                    aria-hidden="true"
                    className={cn("absolute inset-0 -z-10 rounded-full", onDark ? "bg-accent-soft" : "bg-primary")}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                {offering.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className={cn("text-body", onDark ? "text-inverse" : "text-secondary")}
          >
            {active.pitch}
          </motion.p>
        </AnimatePresence>
      </div>


      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="mt-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active.id} variants={panel} initial="initial" animate="animate" exit="exit">
            {mode === "services" ? (
              <ServiceDetail offering={active} />
            ) : (
              <ProcessDetail offering={active} onDark={onDark} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServiceDetail({ offering }: { offering: Offering }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <motion.div variants={item} className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <ParallaxImage
            src={offering.image.src}
            alt={offering.image.alt}
            positionClassName={offering.image.positionClassName}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] w-full lg:aspect-[4/5]"
          />
          <p className="mt-3 flex items-center gap-3 text-caption text-secondary">
            <span aria-hidden="true" className="h-px w-8 bg-secondary" />
            {offering.title}
          </p>
        </div>
      </motion.div>

      <div className="lg:col-span-7">
        <motion.h3 variants={item} className="text-title">
          {offering.title}
        </motion.h3>
        <motion.p variants={item} className="mt-4 max-w-2xl text-lede text-secondary">
          {offering.intro}
        </motion.p>

        <ul className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {offering.deliverables.map((entry, index) => (
            <motion.li
              key={entry.title}
              variants={item}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group border-t border-line py-5"
            >
              <p className="flex items-center gap-3 text-caption font-medium text-accent">
                0{index + 1}
                <span aria-hidden="true" className="h-px w-6 bg-accent/40 transition-all duration-slow group-hover:w-10" />
              </p>
              <h4 className="mt-2 text-body font-semibold">{entry.title}</h4>
              <p className="mt-2 text-body text-secondary">{entry.description}</p>
            </motion.li>
          ))}
        </ul>

        <motion.div variants={item} className="mt-8 rounded-md bg-accent-soft/50 p-6">
          <p className="text-caption font-semibold">Useful when you are&hellip;</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {offering.suitedFor.map((entry) => (
              <li key={entry} className="rounded-lg border border-accent/30 bg-surface px-4 py-2 text-caption">
                {entry}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <MagneticButton className="block sm:inline-block">
            <a
              href="#contact"
              onClick={() => chooseService(offering.id)}
              className="group/cta flex min-h-14 w-full items-center justify-between gap-3 rounded-sm bg-primary px-6 py-3 sm:inline-flex sm:w-auto sm:justify-start text-caption font-semibold text-inverse-strong transition-colors duration-fast ease-standard hover:bg-accent"
            >
              {offering.cta.enquire}
              <ArrowUpRight
                className="size-4 transition-transform duration-slow ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}

/** Timeline: a line draws down the page as the steps are read; the step in the middle of the screen lights up. */
function ProcessDetail({ offering, onDark }: { offering: Offering; onDark: boolean }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <motion.div variants={item} className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className={cn("text-caption font-medium", onDark ? "text-accent-soft" : "text-accent")}>
            {offering.process.length} steps
          </p>
          <h3 className={cn("mt-3 text-title", onDark && "text-inverse-strong")}>{offering.title}</h3>
          <p className={cn("mt-4 text-body", onDark ? "text-inverse" : "text-secondary")}>{offering.intro}</p>
          <div className="mt-8">
            <MagneticButton className="block sm:inline-block">
              <a
                href="#contact"
                onClick={() => chooseService(offering.id)}
                className={cn(
                  "group/cta flex min-h-14 w-full items-center justify-between gap-3 rounded-sm px-6 py-3 text-caption sm:inline-flex sm:w-auto sm:justify-start font-semibold transition-colors duration-fast ease-standard",
                  onDark
                    ? "bg-accent-soft text-primary hover:bg-inverse-strong"
                    : "bg-primary text-inverse-strong hover:bg-accent",
                )}
              >
                {offering.cta.start}
                <ArrowUpRight
                  className="size-4 transition-transform duration-slow ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </a>
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      <ol ref={listRef} className="relative lg:col-span-8">
        <span
          aria-hidden="true"
          className={cn("absolute top-3 bottom-3 left-[1.35rem] w-px", onDark ? "bg-secondary" : "bg-line")}
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: draw }}
          className={cn("absolute top-3 bottom-3 left-[1.35rem] w-px origin-top", onDark ? "bg-accent-soft" : "bg-accent")}
        />
        {offering.process.map((step, index) => (
          <motion.li
            key={step.title}
            initial="off"
            whileInView="on"
            viewport={{ margin: "-42% 0px -42% 0px" }}
            className="relative flex gap-6 pb-12 last:pb-0"
          >
            <motion.span
              variants={{
                off: {
                  backgroundColor: onDark ? "#1c1814" : "#faf6ef",
                  color: onDark ? "#ece2d3" : "#1c1814",
                  scale: 1,
                },
                on: {
                  backgroundColor: onDark ? "#e9d3b2" : "#1c1814",
                  color: onDark ? "#1c1814" : "#faf6ef",
                  scale: 1.12,
                },
              }}
              transition={{ duration: 0.4, ease }}
              className={cn(
                "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border text-caption font-semibold",
                onDark ? "border-secondary" : "border-line",
              )}
            >
              {index + 1}
            </motion.span>
            <motion.div
              variants={{ off: { opacity: 0.5, x: 0 }, on: { opacity: 1, x: 6 } }}
              transition={{ duration: 0.4, ease }}
              className="pt-1.5"
            >
              <h4 className={cn("text-title-sm", onDark && "text-inverse-strong")}>{step.title}</h4>
              <p className={cn("mt-2 max-w-xl text-body", onDark ? "text-inverse" : "text-secondary")}>
                {step.description}
              </p>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

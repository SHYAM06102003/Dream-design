"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, FileCheck2, FolderOpen, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { Offering, Service } from "@/data/offerings";
import { cn } from "@/lib/utils";
import { ServiceIllustration } from "./ServiceIllustration";

type ServiceExplorerProps = {
  offering: Offering;
  /** Called when a visitor asks about one particular service. */
  onEnquire: (service: Service) => void;
};

const ease = [0.2, 0, 0, 1] as const;
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Every service under one offering.
 * Laptop and up: the list stays on the left while the chosen service is
 * explained on the right. Phone and tablet: the same list opens in place.
 */
export function ServiceExplorer({ offering, onEnquire }: ServiceExplorerProps) {
  const { services } = offering;
  const [selectedId, setSelectedId] = useState(services[0].id);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selectedIndex = Math.max(
    0,
    services.findIndex((service) => service.id === selectedId),
  );
  const selected = services[selectedIndex];

  function select(id: string) {
    setSelectedId(id);
    // On a phone the panel that was open above collapses, which would leave the
    // tapped row off screen. Bring it back under the navigation bar.
    requestAnimationFrame(() => {
      const row = rowRefs.current[id];
      if (!row || window.matchMedia(DESKTOP_QUERY).matches) return;
      const top = row.getBoundingClientRect().top;
      if (top < 80) window.scrollBy({ top: top - 88 });
    });
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
      <ul className="border-b border-line lg:sticky lg:top-24 lg:col-span-4 lg:flex lg:flex-col lg:gap-1 lg:self-start lg:border-b-0">
        {services.map((service, index) => {
          const isActive = service.id === selected.id;
          return (
            <li key={service.id} className="border-t border-line lg:border-t-0">
              <button
                suppressHydrationWarning
                ref={(node) => {
                  rowRefs.current[service.id] = node;
                }}
                type="button"
                aria-expanded={isActive}
                onClick={() => select(service.id)}
                className={cn(
                  "group flex w-full items-center gap-4 py-4 text-left transition-colors duration-fast ease-standard lg:rounded-sm lg:px-4 lg:py-3",
                  isActive ? "lg:bg-primary lg:text-inverse-strong" : "lg:hover:bg-accent-soft/50",
                )}
              >
                <span
                  className={cn(
                    "w-7 shrink-0 text-caption font-medium tabular-nums text-accent",
                    isActive && "lg:text-accent-soft",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-semibold">{service.title}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-caption text-secondary",
                      isActive ? "lg:text-inverse" : "lg:hidden",
                    )}
                  >
                    {service.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border lg:hidden",
                    isActive ? "border-primary bg-primary text-inverse-strong" : "border-line text-primary",
                  )}
                >
                  {isActive ? <Minus className="size-4" strokeWidth={1.8} /> : <Plus className="size-4" strokeWidth={1.8} />}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className={cn(
                    "hidden size-4 shrink-0 transition-all duration-slow ease-standard lg:block",
                    isActive ? "opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                  )}
                />
              </button>
              {isActive ? (
                <div className="pb-8 lg:hidden">
                  <ServicePanel
                    service={service}
                    offering={offering}
                    position={`${index + 1} of ${services.length}`}
                    onEnquire={onEnquire}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-8 lg:block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease } }}
          >
            <ServicePanel
              framed
              service={selected}
              offering={offering}
              position={`${selectedIndex + 1} of ${services.length}`}
              onEnquire={onEnquire}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

type ServicePanelProps = {
  service: Service;
  offering: Offering;
  /** e.g. "3 of 6". */
  position: string;
  onEnquire: (service: Service) => void;
  /** Card treatment used on wide screens. */
  framed?: boolean;
};

function ServicePanel({ service, offering, position, onEnquire, framed = false }: ServicePanelProps) {
  const { visual } = service;
  const frame = cn(
    "aspect-[16/10] w-full",
    framed && "rounded-none border-0 border-b xl:aspect-[2/1]",
  );

  return (
    <article className={cn(framed && "overflow-hidden rounded-md border border-line bg-surface")}>
      {visual.type === "photo" ? (
        <div className={cn("relative overflow-hidden rounded-md border border-line bg-line", frame)}>
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className={cn("object-cover", visual.positionClassName)}
          />
        </div>
      ) : (
        <ServiceIllustration id={service.id} alt={visual.alt} className={frame} />
      )}

      <div className={cn(framed ? "p-8 xl:p-10" : "pt-6")}>
        <p className="text-caption font-medium text-accent">
          {offering.label} · {position}
        </p>
        <h4 className="mt-2 text-title">{service.title}</h4>
        <p className="mt-4 text-body text-secondary">{service.description}</p>

        {service.terms ? (
          <dl className="mt-6 flex flex-col gap-2 rounded-sm bg-accent-soft/50 p-5 text-caption">
            {service.terms.map((entry) => (
              <div key={entry.term}>
                <dt className="inline font-semibold">{entry.term}: </dt>
                <dd className="inline text-secondary">{entry.meaning}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-caption font-semibold">What we do</p>
            <ul className="mt-4 flex flex-col gap-3">
              {service.includes.map((entry) => (
                <li key={entry} className="flex gap-3 text-caption">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-caption font-semibold">What you receive</p>
            <ul className="mt-4 flex flex-col gap-3">
              {service.receive.map((entry) => (
                <li key={entry} className="flex gap-3 text-caption">
                  <FileCheck2 className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.6} aria-hidden="true" />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-caption font-semibold">You need this when&hellip;</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {service.neededWhen.map((entry) => (
              <li key={entry} className="rounded-lg border border-accent/30 bg-accent-soft/40 px-4 py-2 text-caption">
                {entry}
              </li>
            ))}
          </ul>
        </div>

        {service.keepReady ? (
          <div className="mt-6">
            <p className="flex items-center gap-2 text-caption font-semibold">
              <FolderOpen className="size-4 text-accent" strokeWidth={1.6} aria-hidden="true" />
              Keep these ready
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.keepReady.map((entry) => (
                <li key={entry} className="rounded-lg border border-dashed border-secondary/50 px-4 py-2 text-caption text-secondary">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8">
          <MagneticButton className="block sm:inline-block">
            <a
              href="#contact"
              onClick={() => onEnquire(service)}
              className="group/cta flex min-h-14 w-full items-center justify-between gap-3 rounded-sm bg-primary px-6 py-3 text-caption font-semibold text-inverse-strong transition-colors duration-fast ease-standard hover:bg-accent sm:inline-flex sm:w-auto sm:justify-start"
            >
              Enquire about this service
              <ArrowUpRight
                className="size-4 transition-transform duration-slow ease-standard group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </a>
          </MagneticButton>
        </div>
      </div>
    </article>
  );
}

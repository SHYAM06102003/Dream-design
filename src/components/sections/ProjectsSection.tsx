"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, projectsIntro, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 1024px)";

/** True on laptop-sized screens. Server render and first paint use the mobile layout. */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/**
 * Side-scrolling project gallery.
 * Laptop and up: the section pins while vertical scrolling slides the row sideways.
 * Phone and tablet: a native swipe row with snap points.
 */
export function ProjectsSection() {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const distanceMV = useMotionValue(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distanceMV.get());

  // How far the row has to travel: its full width minus what fits on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distanceMV.set(d);
      setDistance(d);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(track);
    window.addEventListener("resize", schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isDesktop, distanceMV]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-surface"
      style={isDesktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          isDesktop
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16"
            : "py-14",
        )}
      >
        <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={projectsIntro.eyebrow}
            title={projectsIntro.title}
            description={isDesktop ? undefined : projectsIntro.description}
          />
          <Reveal className="hidden shrink-0 items-center gap-3 text-caption text-secondary md:flex">
            <span>{isDesktop ? "Scroll to explore" : "Swipe to explore"}</span>
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Reveal>
        </div>

        <motion.ul
          ref={trackRef}
          style={isDesktop ? { x } : undefined}
          aria-label="Projects"
          className={cn(
            "mt-10 flex gap-4 lg:mt-12 lg:gap-6",
            isDesktop
              ? "w-max pr-[max(3rem,env(safe-area-inset-right))] pl-[max(3rem,env(safe-area-inset-left))]"
              : "snap-rail snap-x snap-mandatory overflow-x-auto scroll-px-6 px-6 pb-4 sm:scroll-px-10 sm:px-10",
          )}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              onOpen={() => setOpenIndex(index)}
            />
          ))}
          <li className="flex w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
            <div className="flex w-full flex-col justify-between rounded-md bg-primary p-8 text-inverse-strong">
              <p className="eyebrow eyebrow-on-dark">Your plot next</p>
              <div>
                <p className="text-title">Have a plot or a plan in mind?</p>
                <p className="mt-3 text-body text-inverse">
                  Tell us about it and we will take it from survey to a clear plan.
                </p>
                <Link
                  href="/#contact"
                  className="mt-8 inline-flex h-14 items-center gap-2 rounded-sm bg-accent-soft px-6 text-caption font-semibold text-primary transition-colors duration-fast ease-standard hover:bg-inverse-strong"
                >
                  Start your project
                  <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        </motion.ul>

        {isDesktop ? (
          <div className="shell mt-10">
            <div className="h-px w-full bg-line">
              <motion.div className="h-px origin-left bg-primary" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        ) : (
          <p className="shell mt-2 flex items-center gap-2 text-caption text-secondary md:hidden">
            Swipe to see all {projects.length} projects
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </p>
        )}
      </div>

      <Lightbox index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  return (
    <li className="w-[78vw] shrink-0 snap-start sm:w-[26rem] lg:w-[min(40vw,36rem)]">
      <button
        suppressHydrationWarning
        type="button"
        onClick={onOpen}
        aria-label={`View ${project.title} larger`}
        className="group block w-full text-left"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-line">
          <Image
            src={project.src}
            alt={project.alt}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 26rem, 78vw"
            className="object-cover transition-transform duration-[900ms] ease-standard group-hover:scale-[1.05]"
          />
          <span className="absolute top-4 left-4 rounded-lg bg-surface/90 px-3 py-1.5 text-caption font-medium backdrop-blur-sm">
            {project.kind}
          </span>
          <span className="absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-full bg-surface/90 text-primary opacity-100 transition-all duration-slow ease-standard lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            <Expand className="size-4" strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="text-title-sm transition-colors duration-fast group-hover:text-accent">
            {project.title}
          </h3>
          <span className="shrink-0 text-caption text-secondary">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        {project.location || project.year ? (
          <p className="mt-1 text-caption text-secondary">
            {[project.location, project.year].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </button>
    </li>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const project = index === null ? null : projects[index];

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + projects.length) % projects.length);
    },
    [index, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [index, onClose, step]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[120] flex flex-col bg-primary/95 text-inverse-strong backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between">
            <p className="text-caption text-inverse">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <button
              suppressHydrationWarning
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-inverse transition-colors hover:bg-inverse-strong hover:text-primary"
            >
              <span className="sr-only">Close</span>
              <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-4 sm:px-16">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={project.src} alt={project.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>

            {(["prev", "next"] as const).map((dir) => (
              <button
                suppressHydrationWarning
                key={dir}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(dir === "next" ? 1 : -1);
                }}
                className={cn(
                  "absolute top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-primary transition-colors hover:bg-accent-soft",
                  dir === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4",
                )}
              >
                <span className="sr-only">{dir === "next" ? "Next project" : "Previous project"}</span>
                {dir === "next" ? (
                  <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <div className="shell shrink-0 py-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-caption text-accent-soft">{project.kind}</p>
            <p className="mt-1 text-title">{project.title}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

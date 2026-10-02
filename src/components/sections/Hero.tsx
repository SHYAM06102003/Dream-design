"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Compass, Ruler } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TextReveal } from "@/components/motion/TextReveal";
import { images } from "@/data/images";
import { site } from "@/data/site";

const ease = [0.2, 0, 0, 1] as const;

/** Cinematic hero: unmasked photograph, masked headline lines, staggered supporting copy. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const years = new Date().getFullYear() - site.since;

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      ref={ref}
      id="home"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-primary text-inverse-strong [@media(max-height:560px)]:min-h-0"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.2, ease }}
      >
        <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/25 to-transparent" />
      </motion.div>

      {/* Drafting grid, a quiet nod to survey sheets */}
      <motion.div
        aria-hidden="true"
        className="blueprint-grid absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6 }}
      />

      <motion.div style={{ y: copyY }} className="shell flex flex-1 flex-col justify-end pt-28 pb-10 md:pt-40 md:pb-14">
        <div className="max-w-4xl">
          <motion.p className="eyebrow eyebrow-on-dark" {...rise(0.5)}>
            {site.descriptor} &middot; Since {site.since}
          </motion.p>

          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.7}
            className="mt-8 text-display-lg text-inverse-strong"
            lines={["Know your land.", <>Plan your <em className="italic">home</em>.</>]}
          />

          <motion.p className="mt-8 max-w-xl text-lede text-inverse" {...rise(1.25)}>
            Accurate land surveys and practical civil consultancy for homes and plots in Annur, trusted since {site.since}.
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" {...rise(1.4)}>
            <MagneticButton>
              <Link
                href="/#contact"
                className="group/btn inline-flex h-14 items-center gap-2 rounded-sm bg-accent-soft px-6 text-caption font-semibold text-primary transition-colors duration-fast ease-standard hover:bg-inverse-strong"
              >
                Get a quote
                <ArrowUpRight
                  className="size-4 transition-transform duration-slow ease-standard group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            </MagneticButton>
            <Link
              href="/#services"
              className="inline-flex h-14 items-center rounded-sm border border-inverse px-6 text-caption font-semibold text-inverse-strong transition-colors duration-fast ease-standard hover:bg-inverse-strong hover:text-primary"
            >
              Explore our services
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid gap-6 border-t border-secondary pt-6 md:mt-20 md:grid-cols-[1fr_auto] md:items-end"
          {...rise(1.6)}
        >
          <dl className="grid grid-cols-3 gap-4 sm:max-w-xl">
            <div>
              <dt className="text-caption text-inverse">Years serving</dt>
              <dd className="mt-1 text-title font-semibold">
                <AnimatedCounter to={years} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-caption text-inverse">Core services</dt>
              <dd className="mt-1 flex items-center gap-2 text-title font-semibold">
                <AnimatedCounter to={2} />
                <Ruler className="size-4 text-accent-soft" strokeWidth={1.5} aria-hidden="true" />
                <Compass className="size-4 text-accent-soft" strokeWidth={1.5} aria-hidden="true" />
              </dd>
            </div>
            <div>
              <dt className="text-caption text-inverse">Based in</dt>
              <dd className="mt-1 text-title-sm font-semibold">Annur, Tamil Nadu</dd>
            </div>
          </dl>

          <a
            href="#services"
            className="hidden items-center gap-4 text-caption text-inverse transition-colors duration-fast hover:text-inverse-strong md:inline-flex"
          >
            Scroll
            <span className="relative block h-12 w-px overflow-hidden bg-secondary">
              <motion.span
                className="absolute inset-x-0 top-0 block h-1/2 bg-surface"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

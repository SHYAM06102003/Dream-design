"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/about";
import { serviceCount } from "@/data/offerings";
import { site } from "@/data/site";

export function AboutSection() {
  const years = new Date().getFullYear() - site.since;

  return (
    <section id="about" className="surface-inset relative overflow-hidden py-14 lg:py-24">
      <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ParallaxImage
                src={about.image.src}
                alt={about.image.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full lg:aspect-[4/5]"
              />
              <Reveal delay={0.2}>
                <p className="mt-4 flex items-center gap-3 text-caption text-secondary">
                  <span aria-hidden="true" className="h-px w-8 bg-secondary" />
                  {about.image.caption}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} size="title" />

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-5">
                {about.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-lede text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 border-y border-line py-8 sm:grid-cols-3">
                <div>
                  <dd className="text-display-sm leading-none text-accent">
                    <AnimatedCounter to={years} suffix="+" />
                  </dd>
                  <dt className="mt-3 text-caption text-secondary">Years of experience, since {site.since}</dt>
                </div>
                <div>
                  <dd className="text-display-sm leading-none text-accent">
                    <AnimatedCounter to={serviceCount} />
                  </dd>
                  <dt className="mt-3 text-caption text-secondary">Services offered</dt>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dd className="text-title leading-tight font-semibold text-accent">Annur</dd>
                  <dt className="mt-3 text-caption text-secondary">Where we work</dt>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Why Dream Design: numbered, large type */}
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="Why Dream Design" title={"What you can\nrely on."} size="title" />
            </div>
          </div>

          <ul className="lg:col-span-8">
            {about.points.map((point, index) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
                whileHover="hover"
                className="group relative grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-8 last:border-b sm:grid-cols-[6rem_1fr] sm:gap-x-10"
              >
                <motion.span
                  variants={{ hover: { x: 6 } }}
                  className="text-display-sm leading-none text-accent/40 transition-colors duration-slow group-hover:text-accent"
                >
                  0{index + 1}
                </motion.span>
                <motion.div variants={{ hover: { x: 6 } }}>
                  <h3 className="text-title-sm">{point.title}</h3>
                  <p className="mt-2 max-w-xl text-body text-secondary">{point.description}</p>
                </motion.div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[600ms] ease-standard group-hover:scale-x-100"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

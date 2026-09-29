"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { services, servicesIntro, serviceGroupById } from "@/data/services";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, formatIndex } from "@/lib/utils";

/**
 * Services list.
 * On wide screens a single sticky image follows the reader down the list and
 * cross-fades between services; on small screens each row carries its own image.
 */
export function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="surface-inset py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={servicesIntro.eyebrow}
            title={servicesIntro.title}
            description={servicesIntro.description}
            action={<ArrowLink href="/services">All services</ArrowLink>}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky visual, desktop only. Below `lg` this whole block is
              `display: none`, so the browser never fetches these five images on
              a phone and each row below carries its own instead. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="frame aspect-[4/5] w-full">
                {services.map((service, index) => (
                  <Image
                    key={service.id}
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className={cn(
                      "object-cover transition-opacity duration-slow ease-standard",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
              <p className="mt-4 text-caption text-secondary">
                {formatIndex(active)} / {String(services.length).padStart(2, "0")}
                <span className="mx-3 text-secondary">—</span>
                {services[active].title}
              </p>
            </div>
          </div>

          {/* Service rows */}
          <ul className="lg:col-span-6 lg:col-start-7">
            {services.map((service, index) => {
              const group = serviceGroupById.get(service.group);

              return (
                <Reveal as="li" key={service.id} delay={index * 0.06}>
                  <article
                    id={service.id}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group border-t border-line py-8 last:border-b md:py-10"
                  >
                    <Link
                      href={`/services#${service.id}`}
                      className="flex items-start gap-5 md:gap-8"
                    >
                      <span className="text-title font-semibold text-accent transition-colors duration-fast ease-standard">
                        {service.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        {/* Which section of /services this belongs to. */}
                        {group ? (
                          <p className="text-caption text-accent">
                            {group.number} &middot; {group.title}
                          </p>
                        ) : null}

                        <div className="mt-2 flex items-center justify-between gap-4">
                          <h3 className="text-title-sm md:text-title">
                            {service.title}
                          </h3>
                          <ArrowUpRight
                            className="mt-1 size-5 shrink-0 text-secondary transition-all duration-fast ease-standard group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                            strokeWidth={1.3}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-2 max-w-xl text-lede text-primary">
                          {service.summary}
                        </p>

                        {/* Compact image for small screens only */}
                        <div className="frame mt-6 aspect-[16/10] w-full lg:hidden">
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 0px, 100vw"
                            className="object-cover"
                          />
                        </div>

                        {/* Bulleted on a phone, inline from `lg` up. The list is
                            part of the service, so it does not disappear on a
                            small screen. */}
                        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                          {service.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-caption text-secondary"
                            >
                              <span
                                aria-hidden="true"
                                className="size-1 shrink-0 bg-accent lg:hidden"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

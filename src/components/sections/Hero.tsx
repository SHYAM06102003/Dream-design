import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { intro } from "@/data/content";
import { images } from "@/data/images";
import { site } from "@/data/site";

/**
 * Home page hero.
 *
 * Server component: the entrance sequence is pure CSS (see globals.css), so the
 * largest element on the page ships without client JavaScript.
 */
export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-primary text-inverse-strong [@media(max-height:560px)]:min-h-0"
    >
      {/* Photograph */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="hero-settle object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-primary/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent"
        />
      </div>

      <div className="shell flex flex-1 flex-col justify-end pt-28 pb-10 [@media(max-height:560px)]:pt-20 md:pt-40 md:pb-14">
        <div className="max-w-4xl">
          <p
            className="hero-enter eyebrow eyebrow-on-dark"
            style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
          >
            Land · Survey · Design · Build
          </p>

          <h1
            className="hero-enter mt-8 text-display-lg text-inverse-strong"
            style={{ "--enter-delay": "0.2s" } as React.CSSProperties}
          >
            From your land to
            <br />
            your <em className="italic">dream</em> home.
          </h1>

          <p
            className="hero-enter mt-8 max-w-xl text-lede text-inverse"
            style={{ "--enter-delay": "0.34s" } as React.CSSProperties}
          >
            Land surveying, architectural planning and complete home construction —
            handled under one roof.
          </p>

          <div
            className="hero-enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ "--enter-delay": "0.46s" } as React.CSSProperties}
          >
            <ButtonLink href="/contact#enquiry" variant="highlight" size="lg">
              Start your project
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/projects" variant="onDarkGhost" size="lg">
              View our projects
            </ButtonLink>
          </div>
        </div>

        {/* Process chain + scroll cue */}
        <div
          className="hero-fade mt-14 flex flex-col gap-6 border-t border-secondary pt-6 md:mt-20 md:flex-row md:items-center md:justify-between"
          style={{ "--enter-delay": "0.7s" } as React.CSSProperties}
        >
          <ol className="-mx-1 flex flex-wrap items-center gap-x-3 gap-y-2 px-1 text-caption text-inverse sm:gap-x-4">
            {intro.chain.map((step, index) => (
              <li key={step} className="flex items-center gap-3 sm:gap-4">
                <span className="transition-colors duration-fast hover:text-inverse-strong">{step}</span>
                {index < intro.chain.length - 1 ? (
                  <ArrowDown
                    className="hidden size-3 -rotate-90 opacity-50 sm:block"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>

          <a
            href="#intro"
            className="group hidden items-center gap-4 text-caption text-inverse transition-colors duration-fast hover:text-inverse-strong md:inline-flex"
          >
            Scroll
            <span className="relative block h-12 w-px overflow-hidden bg-secondary">
              <span className="hero-scroll-line absolute inset-0 block bg-surface" />
            </span>
          </a>
        </div>
      </div>

      {/* Corner caption, mirroring an architectural drawing sheet */}
      <p className="pointer-events-none absolute bottom-6 right-5 hidden text-caption text-inverse lg:block">
        {site.name} — land to home
      </p>
    </section>
  );
}

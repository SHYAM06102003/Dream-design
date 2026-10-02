import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Survey & Civil Consultant in Annur, Dream Design",
  description:
    "Dream Design, land survey and civil consultancy serving Annur since 2012. Boundary and contour surveys, house planning, estimation and site supervision.",
});

export default function HomePage() {
  return (
    <>
      {site.heroVideo ? (
        <section id="home">
          <ScrollLockedVideoHero
            videoSrc={site.heroVideo}
            videoSrcMobile={site.heroVideoMobile}
            scrubDistance={1600}
            releaseDistance={120}
            title="Know your land. Plan your home."
            stages={[
              {
                at: 0,
                label: "The empty plot",
                caption: "Every home starts with land. Before anything is built, it has to be measured.",
              },
              {
                at: 0.12,
                label: "Surveyed and planned",
                caption: "Boundaries, levels and layout are recorded, then the plan is drawn to fit the plot.",
              },
              {
                at: 0.33,
                label: "Taking shape",
                caption: "Construction follows the approved drawings, with checks at every stage.",
              },
              {
                at: 0.55,
                label: "Your finished home",
                caption: "From a measured plot to a home built the way it was designed.",
              },
            ]}
            endContent={
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#contact"
                  className="inline-flex h-14 items-center gap-2 rounded-sm bg-accent-soft px-6 text-caption font-semibold text-primary transition-colors duration-fast ease-standard hover:bg-inverse-strong"
                >
                  Get a quote
                  <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" />
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex h-14 items-center rounded-sm border border-inverse px-6 text-caption font-semibold text-inverse-strong transition-colors duration-fast ease-standard hover:bg-inverse-strong hover:text-primary"
                >
                  Explore our services
                </Link>
              </div>
            }
          />
        </section>
      ) : (
        <Hero />
      )}
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

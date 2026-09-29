import type { Metadata } from "next";
import { Check } from "lucide-react";
import { JourneySection } from "@/components/sections/JourneySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GallerySection } from "@/components/sections/GallerySection";
import { buildGallery } from "@/data/gallery";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { processIntro, processSteps } from "@/data/process";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/process",
  title: "Process",
  description:
    "Six defined stages from bare land to a completed home: site visit, land survey, planning and design, itemised estimate, construction and handover.",
});

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow={processIntro.eyebrow}
        title="Land → survey → design → build."
        description={processIntro.description}
      />

      <JourneySection variant="full" />
      <ProcessSection />

      {/* Stage detail */}
      <section className="surface-inset py-11 lg:py-17">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Stage by stage</p>
            <h2 className="mt-6 max-w-2xl text-display-sm">
              What each stage involves, and what you walk away with.
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.05}>
                <article className="border-t border-line pt-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-title font-semibold text-accent">
                      {step.number}
                    </span>
                    <h3 className="text-title">{step.title}</h3>
                  </div>

                  <p className="mt-4 text-lede text-primary">
                    {step.summary}
                  </p>
                  <p className="mt-3 text-body text-secondary">{step.detail}</p>

                  <p className="mt-5 flex gap-3 border-t border-line pt-4 text-body ">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.6} aria-hidden="true" />
                    <span>
                      <span className="font-medium">You get: </span>
                      {step.outcome}
                    </span>
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <GallerySection
        eyebrow={buildGallery.eyebrow}
        title={buildGallery.title}
        description={buildGallery.description}
        items={buildGallery.items}
        featureFirst
        action={<ArrowLink href="/projects">See finished projects</ArrowLink>}
      />

      <CtaBanner />
    </>
  );
}

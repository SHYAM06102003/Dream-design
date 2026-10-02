import { sections } from "@/data/offerings";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingTabs } from "./OfferingTabs";

export function ProcessSection() {
  return (
    <section id="process" data-nav-dark className="bg-primary py-14 text-inverse-strong lg:py-20">
      <div className="shell">
        <Reveal>
          <SectionHeading
            onDark
            eyebrow={sections.process.eyebrow}
            title={sections.process.title}
            description={sections.process.description}
          />
        </Reveal>
        <Reveal className="mt-12 lg:mt-16" delay={0.08}>
          <OfferingTabs mode="process" onDark />
        </Reveal>
      </div>
    </section>
  );
}

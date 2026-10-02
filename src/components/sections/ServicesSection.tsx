import { sections } from "@/data/offerings";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingTabs } from "./OfferingTabs";

export function ServicesSection() {
  return (
    <section id="services" className="bg-surface py-14 lg:py-20">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={sections.services.eyebrow}
            title={sections.services.title}
            description={sections.services.description}
          />
        </Reveal>
        <Reveal className="mt-12 lg:mt-16" delay={0.08}>
          <OfferingTabs mode="services" />
        </Reveal>
      </div>
    </section>
  );
}

import { benefits, whyUsIntro } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatIndex } from "@/lib/utils";

/**
 * Tangible reasons to choose this approach.
 * Deliberately free of invented statistics, awards or client counts.
 */
export function WhyChooseUs() {
  return (
    <section className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={whyUsIntro.eyebrow}
            title={whyUsIntro.title}
            description={whyUsIntro.description}
          />
        </Reveal>

        <ul className="mt-14 grid gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12">
          {benefits.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.id}
              delay={index * 0.06}
              className="border-t border-line pt-6 sm:border-t-0 sm:pt-0 lg:border-t lg:pt-6"
            >
              <span className="text-title font-semibold text-accent">
                {formatIndex(index)}
              </span>
              <h3 className="mt-4 text-title-sm">
                {benefit.title}
              </h3>
              <p className="mt-3 max-w-sm text-body text-secondary">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

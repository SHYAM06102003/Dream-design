import { intro, introPillars } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

/** Trust / positioning section: the promise, then the four pillars. */
export function IntroSection() {
  return (
    <section id="intro" className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{intro.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-display-sm">{intro.title}</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.12}>
              <p className="text-lede text-secondary">{intro.description}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="/process"
                className="arrow-link mt-8"
              >
                See the full process
              </a>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-0">
          {introPillars.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.id}
              delay={index * 0.08}
              className="lg:border-l lg:border-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="text-title font-semibold text-accent">
                {pillar.number}
              </span>
              <h3 className="mt-5 text-title">
                {pillar.title}
              </h3>
              <p className="mt-3 text-body text-secondary">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import { about } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * About section.
 * All copy is placeholder until the owner replaces it in data/about.ts —
 * no history, credentials or team facts have been invented.
 */
export function AboutSection() {
  const { portrait } = about;

  return (
    <section id="about" className="surface-inset py-11 lg:py-17">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="frame aspect-[4/5] w-full">
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="placeholder mt-4 text-caption">
                {portrait.caption}
              </figcaption>
            </figure>
          </Reveal>

          {/* Story */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <SectionHeading eyebrow={about.eyebrow} title={about.title} size="title" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5">
                {about.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-lede text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.14}>
                <div>
                  <h3 className="text-body font-medium">
                    {about.approach.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {about.approach.points.map((point) => (
                      <li key={point} className="flex gap-3 text-body ">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div>
                  <h3 className="text-body font-medium">
                    {about.values.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {about.values.points.map((point) => (
                      <li key={point} className="flex gap-3 text-body ">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.22}>
              <div className="mt-12 border-t border-line pt-6">
                <h3 className="text-body font-medium">
                  {about.serviceArea.title}
                </h3>
                <p className="placeholder mt-3 text-body">{about.serviceArea.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

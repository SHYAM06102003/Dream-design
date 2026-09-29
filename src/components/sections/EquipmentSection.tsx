import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { images } from "@/data/images";
import { equipment, surveyDeliverables, surveyIntro, type Equipment } from "@/data/equipment";
import { EquipmentIcon } from "@/components/ui/EquipmentIcon";
import { cn } from "@/lib/utils";

function EquipmentCard({ item, className }: { item: Equipment; className?: string }) {
  const photo = images[item.image];

  return (
    <article className={className}>
      <div className="frame aspect-[4/3] w-full">
        <Image
          src={photo.src}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
          className="object-cover"
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
      </div>

      <div className="mt-5 flex items-start gap-3 border-t border-line pt-5">
        <EquipmentIcon name={item.icon} className="mt-1 size-5 shrink-0 text-accent" />
        <div>
          <h4 className="text-title-sm">{item.name}</h4>
          <p className="mt-1.5 text-caption text-accent">{item.role}</p>
        </div>
      </div>

      <p className="mt-4 text-body text-secondary">{item.detail}</p>
      <p className="mt-4 border-t border-line pt-3 text-caption text-secondary">{item.spec}</p>
    </article>
  );
}

/**
 * Survey equipment, in the order a survey actually runs: locate, measure,
 * level, set out, draw. Each item pairs a photograph with the words a client
 * needs to understand why the instrument matters.
 */
export function EquipmentSection() {
  return (
    <section id="survey-equipment" className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={surveyIntro.eyebrow}
            title={surveyIntro.title}
            description={surveyIntro.description}
            action={<ArrowLink href="/process">See the survey stage</ArrowLink>}
            as="h3"
          />
        </Reveal>

        {/* Phones: a snap carousel. Eight stacked cards is eight screens of
            scrolling on a 375px screen; side-scrolling keeps the section to
            roughly one and keeps the text at a comfortable measure. */}
        <ul
          className="snap-rail -mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:hidden"
          tabIndex={0}
          role="group"
          aria-label="Survey equipment — scroll sideways for the full list"
        >
          {equipment.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              delay={index * 0.05}
              className="w-[78vw] max-w-[19rem] shrink-0 snap-start"
            >
              <EquipmentCard item={item} />
            </Reveal>
          ))}
        </ul>

        <ul className="mt-14 hidden gap-x-10 gap-y-12 border-t border-line pt-10 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {equipment.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 0.05}>
              <EquipmentCard item={item} />
            </Reveal>
          ))}
        </ul>

        {/* What the client actually receives */}
        <Reveal>
          <div className="mt-16 grid gap-8 border-t border-line pt-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">The output</p>
              <h4 className="mt-6 text-title">
                The readings are the job. The drawing is what you keep.
              </h4>
              <p className="mt-5 text-body text-secondary">
                Instruments collect numbers; the plan is what makes them useful. Every survey
                closes out as a scaled drawing you can hand to an architect, a builder or a
                bank — and a file you can open yourself.
              </p>
              <p className="placeholder mt-6 text-caption">
                Sample plan shown below. Replace with this project&rsquo;s own survey once it
                exists.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-8 sm:grid-cols-2">
                {surveyDeliverables.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-line pt-4 text-body">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className={cn(
                  "drafting-grid mt-10 flex items-center justify-center border border-line p-4 sm:p-6",
                  "aspect-[16/10] w-full",
                )}
              >
                <Image
                  src={images.blueprintPlan.src}
                  alt={images.blueprintPlan.alt}
                  width={images.blueprintPlan.width}
                  height={images.blueprintPlan.height}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

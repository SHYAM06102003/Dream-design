import { ArrowDown } from "lucide-react";
import { journeyIntro, journeyStages } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StageVisual } from "@/components/ui/StageVisual";
import { cn } from "@/lib/utils";

type JourneySectionProps = {
  /** `home` keeps visuals compact; `full` adds detail copy for the process page. */
  variant?: "home" | "full";
};

/**
 * The land → home transformation, stage by stage.
 * Alternating rows on wide screens, a continuous vertical spine on small ones.
 */
export function JourneySection({ variant = "home" }: JourneySectionProps) {
  const isFull = variant === "full";
  const tone = isFull ? "dark" : "light";

  return (
    <section
      id="journey"
      className={cn(
        "py-11 lg:py-17",
        isFull ? "bg-primary text-inverse-strong" : "border-b border-line bg-surface",
      )}
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={journeyIntro.eyebrow}
            title={journeyIntro.title}
            description={journeyIntro.description}
            onDark={isFull}
          />
        </Reveal>

        <ol className="mt-16 lg:mt-24">
          {journeyStages.map((stage, index) => {
            const flip = index % 2 === 1;

            return (
              <Reveal
                as="li"
                key={stage.id}
                className="group relative border-t border-line pb-14 last:border-b lg:pb-0"
              >
                <div
                  className={cn(
                    "grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16",
                    flip && "lg:[&>*:first-child]:order-2",
                  )}
                >
                  {/* Visual */}
                  <div className="lg:col-span-6">
                    <StageVisual
                      visual={stage.visual}
                      tone={tone}
                      className={cn(
                        "aspect-[4/3] w-full",
                        isFull && "lg:aspect-[16/11]",
                      )}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  {/* Copy */}
                  <div className="lg:col-span-5 lg:px-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "text-title font-semibold",
                          isFull ? "text-inverse" : "text-accent",
                        )}
                      >
                        {stage.number}
                      </span>
                      <span
                        className={cn(
                          "text-caption ",
                          isFull ? "text-inverse" : "text-secondary",
                        )}
                      >
                        {stage.label}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        "mt-5",
                        isFull ? "text-title md:text-display-sm text-inverse-strong" : "text-title md:text-display-sm",
                      )}
                    >
                      {stage.title}
                    </h3>

                    <p
                      className={cn(
                        "mt-4 max-w-lg ",
                        isFull ? "text-inverse" : "text-secondary",
                      )}
                    >
                      {stage.description}
                    </p>

                    {index < journeyStages.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-8 hidden items-center gap-3 text-caption lg:inline-flex",
                          isFull ? "text-inverse" : "text-secondary",
                        )}
                      >
                        <ArrowDown className="size-3.5" strokeWidth={1.4} />
                        Next stage
                      </span>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

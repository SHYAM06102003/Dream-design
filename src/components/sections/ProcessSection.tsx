import { processIntro } from "@/data/process";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

/** "How we work" — the six stage journey. */
export function ProcessSection() {
  return (
    <section id="process" className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={processIntro.eyebrow}
            title={processIntro.title}
            description={processIntro.description}
            action={<ArrowLink href="/process">Full process</ArrowLink>}
          />
        </Reveal>

        <div className="mt-14 lg:mt-20">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}

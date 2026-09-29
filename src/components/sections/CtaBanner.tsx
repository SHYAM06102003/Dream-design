import { ArrowUpRight } from "lucide-react";
import { ctaBanner } from "@/data/about";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing conversion band, reused on the inner pages.
 * Deliberately two actions — start a project or look at the work first.
 */
export function CtaBanner() {
  return (
    <section className="bg-primary py-11 text-inverse-strong lg:py-17">
      <div className="shell">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow eyebrow-on-dark">{ctaBanner.eyebrow}</p>
              <h2 className="mt-6 text-display-sm text-balance">
                {ctaBanner.title.split("\n").map((line, index) => (
                  <span key={line + index} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-body text-inverse">
                {ctaBanner.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={ctaBanner.primary.href} variant="onDark">
                  {ctaBanner.primary.label}
                  <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={ctaBanner.secondary.href} variant="onDarkGhost">
                  {ctaBanner.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

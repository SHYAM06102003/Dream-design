import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Small supporting row under the description (e.g. page meta). */
  meta?: ReactNode;
  className?: string;
};

/**
 * Shared page header for every inner route.
 * Owns the single `h1` on the page and the top spacing the sticky navbar needs.
 */
export function PageHeader({ eyebrow, title, description, meta, className }: PageHeaderProps) {
  return (
    <section className={cn("border-b border-line pt-32 pb-11 lg:pt-36 lg:pb-17", className)}>
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="max-w-4xl text-display-sm text-balance">
            {title.split("\n").map((line, index) => (
              <span key={line + index} className="block">
                {line}
              </span>
            ))}
          </h1>
          {description ? (
            <p className="mt-7 max-w-2xl text-lede text-secondary">{description}</p>
          ) : null}
          {meta ? <div className="mt-8">{meta}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

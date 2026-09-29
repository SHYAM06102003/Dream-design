import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Use "\n" to force a line break in the display heading. */
  title: string;
  description?: string;
  /** Optional link rendered to the right on wide screens. */
  action?: ReactNode;
  onDark?: boolean;
  className?: string;
  /** Heading level for correct document outline. */
  as?: "h1" | "h2" | "h3";
  size?: "section" | "title";
};

/**
 * Section heading — slate-media-house/components/section-layout.md §3
 *
 * One idea per section. The eyebrow is sentence case, the heading uses the
 * display token, and the measure on the description is capped.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  onDark = false,
  className,
  as: Tag = "h2",
  size = "section",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className={cn("eyebrow", onDark && "eyebrow-on-dark")}>{eyebrow}</p>
        ) : null}
        <Tag
          className={cn(
            "mt-6 text-balance",
            size === "section" ? "text-display-sm" : "text-title",
            onDark && "text-inverse-strong",
          )}
        >
          {title.split("\n").map((line, index) => (
            <span key={line + index} className="block">
              {line}
            </span>
          ))}
        </Tag>
        {description ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lede",
              onDark ? "text-inverse" : "text-secondary",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

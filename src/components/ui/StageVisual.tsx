import Image from "next/image";
import type { Visual } from "@/data/images";
import { Axonometric } from "@/components/drawings/Axonometric";
import { FloorPlan } from "@/components/drawings/FloorPlan";
import { SitePlan } from "@/components/drawings/SitePlan";
import { cn } from "@/lib/utils";

const drawings = {
  sitePlan: SitePlan,
  floorPlan: FloorPlan,
  axonometric: Axonometric,
} as const;

type Tone = "light" | "dark";

const toneStyles: Record<Tone, { frame: string; drawing: string }> = {
  light: { frame: "rounded-md border border-line bg-surface", drawing: "border-line bg-surface text-primary" },
  dark: { frame: "rounded-md border border-secondary bg-primary", drawing: "border-secondary bg-primary text-inverse" },
};

/**
 * Renders a visual declared in data/images.ts: either a photograph or one of
 * the built-in vector drawings. Keeps the journey honest — a survey, a plan and
 * a massing study are drawings, not photographs.
 */
export function StageVisual({
  visual,
  tone = "light",
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
}: {
  visual: Visual;
  tone?: Tone;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const styles = toneStyles[tone];

  if (visual.kind === "photo") {
    return (
      <div className={cn("relative overflow-hidden", styles.frame, className)}>
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    );
  }

  const Drawing = drawings[visual.drawing];

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md border p-6 md:p-10",
        styles.drawing,
        className,
      )}
    >
      <Drawing className="h-auto w-full max-w-2xl" />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import type { BeforeAfter } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Draggable before/after comparison.
 *
 * Built on a real range input so the control is keyboard operable and
 * announced correctly — the visible handle is drawn on top of it.
 */
export function BeforeAfterSlider({ item }: { item: BeforeAfter }) {
  const [position, setPosition] = useState(50);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelId = useId();

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  }, []);

  return (
    <figure className="group">
      <div className="relative aspect-[16/11] w-full overflow-hidden border border-line bg-surface select-none">
        {/* After (base layer) */}
        <Image
          src={item.after.image}
          alt={item.after.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />

        {/* Before (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden={position === 0}
        >
          <Image
            src={item.before.image}
            alt={item.before.alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute top-4 left-4 rounded-sm bg-surface px-3 py-2 text-caption font-medium text-primary">
          {item.before.label}
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-sm bg-primary px-3 py-2 text-caption font-medium text-inverse-strong">
          {item.after.label}
        </span>

        {/* Divider + handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-surface"
          style={{ left: `${position}%` }}
        >
          <span
            className={cn(
              "absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-primary transition-transform duration-fast ease-standard group-hover:scale-105",
            )}
          >
            <svg viewBox="0 0 24 12" className="w-5" fill="none" stroke="currentColor" strokeWidth={1.3}>
              <path d="M9.5 1 5 6l4.5 5M14.5 1 19 6l-4.5 5" />
            </svg>
          </span>
        </div>

        {/* Accessible control */}
        <label id={labelId} htmlFor={`ba-${item.id}`} className="sr-only">
          Compare before and after — drag, or use the arrow keys
        </label>
        <input
          ref={inputRef}
          id={`ba-${item.id}`}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          onKeyDown={onKeyDown}
          aria-labelledby={labelId}
          aria-valuetext={`${position}% before, ${100 - position}% after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:cursor-ew-resize [&::-moz-range-thumb]:h-11 [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent"
        />
      </div>

      <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-title-sm">{item.title}</p>
        <p className="placeholder text-caption">{item.note}</p>
      </figcaption>
    </figure>
  );
}

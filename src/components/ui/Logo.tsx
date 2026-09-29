import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** `mark` for the compact mobile/footer use, `full` for the navbar. */
  variant?: "full" | "mark";
  onDark?: boolean;
  className?: string;
};

/**
 * Wordmark + mark. The mark is a plot boundary containing a roof line —
 * land and home in one glyph.
 */
export function Logo({ variant = "full", onDark = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity duration-fast hover:opacity-70",
        onDark && "text-inverse-strong",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        className="size-7 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        aria-hidden="true"
      >
        <path d="M3.4 3.4h25.2v25.2H3.4z" strokeOpacity={0.35} />
        <path d="M8 18.4 16 11l8 7.4" strokeLinecap="square" />
        <path d="M11 18.4V25h10v-6.6" />
      </svg>
      {variant === "full" ? (
        <span className="text-title-sm font-semibold">
          {site.name}
        </span>
      ) : (
        <span className="sr-only">{site.name}</span>
      )}
    </Link>
  );
}

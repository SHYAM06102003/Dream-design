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
 * Wordmark + mark. The mark is a roof with a DD monogram, matching the shop sign.
 */
export function Logo({ variant = "full", onDark = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 transition-opacity sm:gap-3 duration-fast hover:opacity-70",
        onDark && "text-inverse-strong",
        className,
      )}
    >
      <svg
        viewBox="0 0 48 40"
        className="h-9 w-auto shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
      >
        {/* Roof and chimney */}
        <path d="M2 21 24 4l22 17" strokeLinecap="square" />
        <path d="M34 11V5h4v10" />
        {/* DD monogram */}
        <path d="M15 17h5a6 6 0 0 1 0 12h-5zM25 17h5a6 6 0 0 1 0 12h-5z" strokeWidth={1.2} />
        {/* Base swoosh */}
        <path d="M8 32c8 6 24 6 32 0" strokeLinecap="round" />
      </svg>
      {variant === "full" ? (
        <span className="flex flex-col leading-tight">
          <span className="text-[1.125rem] font-semibold whitespace-nowrap min-[380px]:text-title-sm">{site.name}</span>
          <span className="hidden text-caption opacity-70 sm:block">
            {site.descriptor} · Since {site.since}
          </span>
        </span>
      ) : (
        <span className="sr-only">{site.name}</span>
      )}
    </Link>
  );
}

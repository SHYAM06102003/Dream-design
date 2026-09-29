import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Button — slate-media-house/components/button.md
 *
 * Five variants, three sizes, one radius. Every value is a token.
 * `ButtonLink` renders a link that looks like a button; `Button` renders a real
 * control. A button that navigates is a defect, and a link that commits an
 * action is a defect.
 */

const base =
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-sm text-caption font-medium transition-colors duration-fast ease-standard";

/** Per components/button.md §3. `onDark` pairs are for inverse surfaces. */
const variants = {
  /** Filled black. One per view at most. */
  primary: "bg-primary text-inverse-strong hover:bg-secondary",
  /** Filled clay. Reserved for the single most important action on a page. */
  secondary: "bg-accent text-inverse-strong hover:bg-primary",
  /** Filled accent-soft, black label — 14.65:1 on the fill. */
  highlight: "bg-accent-soft text-primary hover:bg-primary hover:text-inverse-strong",
  /** 1px border, transparent fill. */
  outline:
    "border border-secondary text-primary hover:border-primary hover:bg-primary hover:text-inverse-strong",
  /** Text only. */
  ghost: "text-secondary hover:text-primary",
  /** Outlined, for a photograph or a `surface.inverse` band. */
  onDark:
    "border border-inverse text-inverse-strong hover:bg-inverse-strong hover:text-primary",
  /** Text only, for a photograph or a `surface.inverse` band. */
  onDarkGhost: "text-inverse hover:text-inverse-strong",
} as const;

const sizes = {
  sm: "h-11 px-4",
  md: "h-12 px-5",
  lg: "h-14 px-6 font-semibold",
} as const;

type CommonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

/**
 * A `tel:`, `mailto:` or off-site link that looks like a button. `ButtonLink`
 * covers in-app routes only; this one must never point at a local path.
 */
export function ButtonAnchor({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"a">) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

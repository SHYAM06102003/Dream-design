import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  children: string;
};

/** Link variant `arrow` — see slate-media-house/components/link.md §3. */
export function ArrowLink({ children, className, ...props }: ArrowLinkProps) {
  return (
    <Link className={cn("arrow-link", className)} {...props}>
      {children}
      <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type PhoneLinkProps = {
  className?: string;
  /** Hide the handset icon. */
  bare?: boolean;
  /** Optional text before the number, e.g. "Call". */
  children?: ReactNode;
};

/**
 * The only place a `tel:` link is built, so the number and its presentation
 * stay consistent. Colour is left to the caller.
 */
export function PhoneLink({ className, bare = false, children }: PhoneLinkProps) {
  return (
    <a
      href={`tel:${site.phone.href}`}
      className={cn("tap gap-2.5 transition-colors duration-fast", className)}
    >
      {!bare ? (
        <Phone className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      ) : null}
      {children ?? <span>{site.phone.display}</span>}
    </a>
  );
}

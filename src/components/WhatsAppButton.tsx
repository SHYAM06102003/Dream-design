import { MessageCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { ButtonAnchor } from "@/components/ui/Button";

type WhatsAppButtonProps = {
  /** Pre-filled message. Defaults to the general message from data/site.ts. */
  message?: string;
  className?: string;
  children?: React.ReactNode;
  /** `bare` is a text link; the rest map to the shared button variants. */
  variant?: "solid" | "outline" | "onDark" | "bare";
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

const buttonVariants = {
  solid: "primary",
  outline: "outline",
  onDark: "onDark",
} as const;

/**
 * Every WhatsApp link on the site goes through this component, so the number
 * and default message only ever live in `data/site.ts`. It is a link, so it
 * renders `ButtonAnchor` rather than a button.
 */
export function WhatsAppButton({
  message = whatsappMessages.general(),
  className,
  children,
  variant = "solid",
  ...props
}: WhatsAppButtonProps) {
  const href = whatsappUrl(message);
  const label = children ?? `WhatsApp ${site.phone.display}`;

  if (variant === "bare") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2.5 text-body transition-colors duration-fast ease-standard hover:text-accent",
          className,
        )}
        {...props}
      >
        <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <ButtonAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={buttonVariants[variant]}
      size="lg"
      className={className}
      {...props}
    >
      <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
      {label}
    </ButtonAnchor>
  );
}

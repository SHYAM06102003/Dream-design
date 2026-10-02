import { site } from "@/data/site";

/**
 * Builds a wa.me deep link with a pre-filled, URL-encoded message.
 * The number comes from `data/site.ts` only, never hardcode it in a component.
 */
export function whatsappUrl(message: string = site.whatsapp.defaultMessage) {
  const number = site.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Contextual message builders, so each surface speaks to the visitor's intent. */
export const whatsappMessages = {
  general: () => site.whatsapp.defaultMessage,
  consultation: () =>
    "Hi, I would like to enquire about a land survey or civil consultancy.",
  form: (summary: string) => `Hi, I would like to make an enquiry.\n\n${summary}`,
} as const;

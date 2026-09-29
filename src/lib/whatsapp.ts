import { site } from "@/data/site";

/**
 * Builds a wa.me deep link with a pre-filled, URL-encoded message.
 * The number comes from `data/site.ts` only — never hardcode it in a component.
 */
export function whatsappUrl(message: string = site.whatsapp.defaultMessage) {
  const number = site.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Contextual message builders, so each surface speaks to the visitor's intent. */
export const whatsappMessages = {
  general: () => site.whatsapp.defaultMessage,
  consultation: () =>
    "Hi, I would like to book a consultation about building a house on my land.",
  survey: () => "Hi, I need a land survey for my plot. Could we discuss a site visit?",
  design: () => "Hi, I would like help with a house plan and 3D design for my land.",
  construction: () => "Hi, I would like a construction estimate for my home.",
  renovation: () => "Hi, I need a renovation or extension for my existing house.",
  project: (title: string) => `Hi, I saw the ${title} project and would like to talk about a similar build.`,
  form: (summary: string) => `Hi, I would like to request a consultation.\n\n${summary}`,
} as const;

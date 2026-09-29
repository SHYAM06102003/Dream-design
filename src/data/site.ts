/**
 * ============================================================================
 * CENTRAL BUSINESS CONFIGURATION
 * ----------------------------------------------------------------------------
 * This is the only file that needs editing to make the website "real".
 * Every value marked `PLACEHOLDER` is intentionally generic — nothing about the
 * business has been invented. Replace each one with the real detail.
 * ============================================================================
 */

export const site = {
  /** Business name shown in the navbar, footer, metadata and schema. */
  name: "Dream Design",
  legalName: "Dream Design",

  /**
   * PLACEHOLDER — one line describing the business.
   * Used on the home page hero strip and in the footer.
   */
  tagline: "Land surveying, architecture and home construction — under one roof.",

  /** PLACEHOLDER — full description used for SEO metadata. */
  description:
    "A single team taking you from bare land to a finished home: land surveying, floor plan and architectural design, 3D visualisation, construction contracts, renovation and full project coordination.",

  /**
   * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in .env.local for production.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /** Default Open Graph image (must be an absolute URL or a root-relative path). */
  ogImage: "/opengraph-image",

  /* ------------------------------------------------------------------ *
   * WHATSAPP — the single source of truth for the WhatsApp number.
   * Use the full international number, digits only, no "+" or spaces.
   * e.g. 919876543210 for +91 98765 43210
   * ------------------------------------------------------------------ */
  whatsapp: {
    /** PLACEHOLDER — replace with the real WhatsApp business number. */
    number: "919999999999",
    /** Pre-filled message used by every generic WhatsApp button. */
    defaultMessage: "Hi, I would like to discuss building a house on my land.",
  },

  /** PLACEHOLDER — replace with the real phone number. */
  phone: {
    display: "+91 00000 00000",
    href: "+910000000000",
  },

  /** PLACEHOLDER — replace with the real email address. */
  email: {
    display: "hello@example.com",
    href: "mailto:hello@example.com",
  },

  /** PLACEHOLDER — replace with the real office address. */
  address: {
    line1: "Add your office address",
    line2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
  },

  /**
   * PLACEHOLDER — Google Maps link for the office / project location.
   * The `query` below is a Google Maps search URL.
   */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=",

  /** PLACEHOLDER — add the areas you actually serve. */
  serviceArea: {
    label: "Service Area",
    note: "Add the locations you serve here.",
    items: [] as string[],
  },

  /**
   * PLACEHOLDER — social profiles. Leave `href` empty ("") until the real
   * profile exists; the footer renders an unlinked, clearly inert icon so the
   * site never ships a dead link.
   */
  social: [
    { label: "Instagram", href: "", icon: "instagram" },
    { label: "Facebook", href: "", icon: "facebook" },
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "YouTube", href: "", icon: "youtube" },
  ] as const,

  /**
   * PLACEHOLDER — small proof points that must be factual.
   * These are written as capabilities, not claims, so nothing is fabricated.
   */
  capabilities: [
    "Land survey",
    "Architectural design",
    "Construction",
    "Renovation",
  ],
} as const;

export type Site = typeof site;

/** Formatted, human-readable office address (skips empty placeholder lines). */
export function formatAddress() {
  const { line1, line2, city, region, postalCode, country } = site.address;
  return [line1, line2, [city, region].filter(Boolean).join(", "), postalCode, country]
    .map((part) => part.trim())
    .filter(Boolean);
}

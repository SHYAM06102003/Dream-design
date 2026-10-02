/**
 * ============================================================================
 * CENTRAL BUSINESS CONFIGURATION
 * ----------------------------------------------------------------------------
 * This is the only file that needs editing to make the website "real".
 * Every value marked `PLACEHOLDER` is intentionally generic, nothing about the
 * business has been invented. Replace each one with the real detail.
 * ============================================================================
 */

export const site = {
  /** Business name shown in the navbar, footer, metadata and schema. */
  name: "Dream Design",
  legalName: "Dream Design",
  /** Descriptor shown under the name on the shop sign. */
  descriptor: "Survey & Civil Consultant",
  /** Year the business was established (from the shop sign). */
  since: 2012,

  /**
   * PLACEHOLDER, one line describing the business.
   * Used on the home page hero strip and in the footer.
   */
  tagline: "Survey & Civil Consultant, serving clients since 2012.",

  /** PLACEHOLDER, full description used for SEO metadata. */
  description:
    "Dream Design is a survey and civil consultancy, serving clients since 2012: land surveying, floor plan and civil design, 3D visualisation, construction support, renovation and project coordination.",

  /**
   * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in .env.local for production.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  /**
   * Scroll-scrubbed hero video (plot to finished home), in /public/videos.
   * Set to "" to fall back to the photo hero.
   */
  heroVideo: process.env.NEXT_PUBLIC_HERO_VIDEO ?? "/videos/Hero.mp4",
  /** Lighter 720p version of the hero video for phones. */
  heroVideoMobile: "/videos/Hero-mobile.mp4",

  /** Default Open Graph image (must be an absolute URL or a root-relative path). */
  ogImage: "/opengraph-image",

  /* ------------------------------------------------------------------ *
   * WHATSAPP, the single source of truth for the WhatsApp number.
   * Use the full international number, digits only, no "+" or spaces.
   * e.g. 919876543210 for +91 98765 43210
   * ------------------------------------------------------------------ */
  whatsapp: {
    number: "919786992496",
    /** Pre-filled message used by every generic WhatsApp button. */
    defaultMessage: "Hi, I would like to enquire about your survey and civil consultancy services.",
  },

  phone: {
    display: "+91 97869 92496",
    href: "+919786992496",
  },

  /** PLACEHOLDER, replace with the real email address. */
  email: {
    display: "hello@example.com",
    href: "mailto:hello@example.com",
  },

  /** Office address. */
  address: {
    line1: "No 11/51, Near Katholic Bank",
    line2: "Avinashi Main Road",
    city: "Annur, Avinashi",
    region: "Tamil Nadu",
    postalCode: "641653",
    country: "India",
  },

  /**
   * PLACEHOLDER, Google Maps link for the office / project location.
   * The `query` below is a Google Maps search URL.
   */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=",

  /** Where the business works. */
  serviceArea: {
    label: "Service area",
    note: "Annur",
    items: ["Annur"] as string[],
  },

  /**
   * PLACEHOLDER, social profiles. Leave `href` empty ("") until the real
   * profile exists; the footer renders an unlinked, clearly inert icon so the
   * site never ships a dead link.
   */
  social: [
    { label: "Instagram", href: "https://www.instagram.com/dream__design__official/", icon: "instagram" },
    { label: "LinkedIn", href: "https://in.linkedin.com/in/shanthini-siva-b740822a3", icon: "linkedin" },
  ] as const,

} as const;


/** Formatted, human-readable office address (skips empty placeholder lines). */
export function formatAddress() {
  const { line1, line2, city, region, postalCode, country } = site.address;
  return [line1, line2, [city, region].filter(Boolean).join(", "), postalCode, country]
    .map((part) => part.trim())
    .filter(Boolean);
}

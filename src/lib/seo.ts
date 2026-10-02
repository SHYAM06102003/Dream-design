import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/projects". */
  path?: string;
  /** Absolute or root-relative image URL for social cards. */
  image?: string;
  type?: "website" | "article";
};

/**
 * Builds consistent, non-stuffed metadata for every route.
 * Titles follow "Page, Brand" so the brand stays visible in search results.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const socialImage = new URL(image ?? site.ogImage, site.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

/** LocalBusiness JSON-LD. Placeholder values only, fill in from data/site.ts. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    slogan: site.descriptor,
    foundingDate: String(site.since),
    description: site.description,
    url: site.url,
    telephone: site.phone.display,
    email: site.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceArea.items,
  };
}

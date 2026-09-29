import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { localBusinessJsonLd } from "@/lib/seo";
import { site } from "@/data/site";
import "./globals.css";

/* One grotesque family for the whole site (slate-media-house/README.md §2).
   The stack is `Host Grotesk, Candara, sans-serif`; Host Grotesk is not
   distributable as a web font, so Instrument Sans stands in for it and
   Candara remains the first system fallback. */
const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans-face",
  display: "swap",
});

const defaultTitle = "Land Surveying, Architecture & Home Construction";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: `${defaultTitle} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "land surveying",
    "house plan",
    "architectural design",
    "3D house design",
    "home construction",
    "house renovation",
    "residential builder",
    "construction contract",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  formatDetection: { telephone: true, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${defaultTitle} | ${site.name}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${defaultTitle} | ${site.name}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** The page surface is a single flat colour, so one theme colour is correct. */
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables the hidden start state for scroll reveals (see globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className="min-h-screen bg-surface font-sans text-primary">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-sm focus:bg-primary focus:px-5 focus:py-3 focus:text-caption focus:text-inverse-strong"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}

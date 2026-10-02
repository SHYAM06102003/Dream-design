import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type IconName = (typeof site.social)[number]["icon"];

/**
 * Minimal brand glyphs. Kept as inline SVG so no icon-library dependency or
 * remote request is needed for social marks.
 */
const paths: Record<IconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.4 10.2v7M7.4 7.2v.1M11.2 17.2v-7M11.2 12.6c0-1.4 1-2.4 2.4-2.4s2.4 1 2.4 2.4v4.6" />
    </>
  ),
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {site.social.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-secondary text-primary transition-colors duration-fast ease-standard hover:border-primary hover:bg-primary hover:text-inverse-strong"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {paths[social.icon]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

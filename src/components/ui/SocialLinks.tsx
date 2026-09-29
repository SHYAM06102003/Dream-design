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
  facebook: <path d="M14.5 8.5h2.2V5.6h-2.6c-2.2 0-3.6 1.4-3.6 3.7v1.6H8.2v2.9h2.3V21h3v-7.2h2.3l.4-2.9h-2.7V9.7c0-.8.3-1.2 1-1.2Z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.4 10.2v7M7.4 7.2v.1M11.2 17.2v-7M11.2 12.6c0-1.4 1-2.4 2.4-2.4s2.4 1 2.4 2.4v4.6" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" />
    </>
  ),
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {site.social.map((social) => {
        const isConfigured = social.href !== "";
        const classes = cn(
          "inline-flex size-11 items-center justify-center rounded-sm border border-secondary text-primary transition-colors duration-fast ease-standard",
          isConfigured && "hover:border-primary hover:bg-primary hover:text-inverse-strong",
          !isConfigured && "cursor-default text-secondary",
        );

        return (
          <li key={social.label}>
            {isConfigured ? (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={classes}
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
            ) : (
              <span
                className={classes}
                title={`${social.label} — add the link in data/site.ts`}
                aria-disabled="true"
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
                <span className="sr-only">{social.label} — link not set</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

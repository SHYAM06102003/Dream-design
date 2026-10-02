/**
 * Every photograph on the site, in one place. All of them are Dream Design's
 * own pictures in /public/images. To swap one, drop the new file in that folder
 * and update `src` (file names are case-sensitive on most hosts) and `alt`.
 */

export type PhotoVisual = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  office: {
    src: "/images/Office.png",
    alt: "Dream Design office front on Avinashi Main Road with the Survey & Civil Consultant signboard",
    width: 1448,
    height: 1086,
  },
  survey: {
    src: "/images/survey-1.webp",
    alt: "Surveyor setting up a total station on a tripod on a grassy plot",
    width: 574,
    height: 1020,
  },
  /** Fallback hero, used only when no hero video is configured. */
  hero: {
    src: "/images/Project-1.webp",
    alt: "Contemporary corner residence designed by Dream Design",
    width: 1360,
    height: 765,
  },
} satisfies Record<string, PhotoVisual>;

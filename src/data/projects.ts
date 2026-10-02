/**
 * Projects shown in the side-scrolling "Our projects" section, in order.
 *
 * Only what the pictures show is written here. Add a `location` or `year`
 * to any project when you want it displayed; leave them out otherwise.
 */

export type Project = {
  id: string;
  title: string;
  /** Short label shown on the card, e.g. what kind of work it is. */
  kind: "3D elevation design" | "Completed house";
  src: string;
  alt: string;
  width: number;
  height: number;
  location?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Contemporary corner residence",
    kind: "3D elevation design",
    src: "/images/Project-1.webp",
    alt: "3D elevation of a contemporary two-storey corner residence with stone cladding and a Dream Design site board",
    width: 1360,
    height: 765,
  },
  {
    id: "project-2",
    title: "Two-storey residence with timber accents",
    kind: "3D elevation design",
    src: "/images/Project-2.webp",
    alt: "3D elevation of a two-storey residence with timber-finish panels and a rooftop terrace",
    width: 1360,
    height: 719,
  },
  {
    id: "project-3",
    title: "Duplex residence with balcony",
    kind: "3D elevation design",
    src: "/images/Project-3.webp",
    alt: "3D elevation of a duplex residence with a blue and grey facade and a glass-railed balcony",
    width: 1020,
    height: 1020,
  },
  {
    id: "project-4",
    title: "Two-storey family home",
    kind: "Completed house",
    src: "/images/Project-4.webp",
    alt: "Completed two-storey house with a yellow, grey and terracotta facade",
    width: 1334,
    height: 1020,
  },
  {
    id: "project-5",
    title: "Compact two-storey home",
    kind: "Completed house",
    src: "/images/Project-5.jpg",
    alt: "Completed compact two-storey house with a white facade and timber gates",
    width: 528,
    height: 624,
  },
];

export const projectsIntro = {
  eyebrow: "Our projects",
  title: "Designed on paper,\nbuilt on the ground.",
  description:
    "A selection of homes we have planned and designed, from 3D elevations to completed houses. Tap any project to see it larger.",
};

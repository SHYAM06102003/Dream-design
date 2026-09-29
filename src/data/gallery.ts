/**
 * ============================================================================
 * GALLERIES
 * ----------------------------------------------------------------------------
 * Two image groups that used to have no content on the site: the work while it
 * is still half built, and the interiors at the end of it. Each item carries the
 * photograph, the words a client would want with it, and a credit so
 * /credits stays complete.
 *
 * All photographs are CC-licensed placeholders (see /public/images/CREDITS.md).
 * Swap the file names for real project photography and the layout holds.
 * ============================================================================
 */

export type GalleryItem = {
  id: string;
  /** Key in `images.ts`. */
  image:
    | "buildHalfFinished"
    | "construction"
    | "constructionAlt"
    | "interiorKitchen"
    | "interiorLiving"
    | "interiorBathroom";
  alt: string;
  /** Small caption under the image. */
  caption: string;
  /** One line of context — a stage, a room, a decision. */
  note: string;
  /** Fraction of the width the item spans on large screens. */
  span?: "wide" | "normal";
};

export const buildGallery = {
  eyebrow: "On site",
  title: "Half built is the honest part.",
  description:
    "Most projects spend months in this state — structure up, roof on, services open, and every decision still visible. These are the stages clients rarely get to see, and the ones that decide whether the finished house feels right.",
  items: [
    {
      id: "structure",
      image: "buildHalfFinished",
      alt: "Two storey house part built, with the concrete frame and upper floor slab in place and the roof not yet covered",
      caption: "Frame and first floor slab",
      note: "Set-out on site, poured to the levels on the survey drawing.",
      span: "wide",
    },
    {
      id: "site-works",
      image: "construction",
      alt: "Residential building under construction with scaffolding across the facade and materials stacked on the site",
      caption: "Scaffold and services",
      note: "Electrical, plumbing and waterproofing run before the walls close.",
    },
    {
      id: "envelope",
      image: "constructionAlt",
      alt: "New residential building taking shape on an active construction site, with the upper floors still open",
      caption: "Envelope going on",
      note: "Walls, windows and the first line of defence against the weather.",
    },
  ] satisfies GalleryItem[],
};

export const interiorGallery = {
  eyebrow: "Interior design",
  title: "The rooms people\nactually live in.",
  description:
    "A plan is a diagram; a room is a volume. Interior design is where the daylight, the circulation, the storage and the finishes are decided together — and it is the part of the job clients tell us they notice most.",
  items: [
    {
      id: "kitchen",
      image: "interiorKitchen",
      alt: "Modern fitted kitchen with stone worktops, integrated appliances and full height units",
      caption: "Kitchen",
      note: "Work triangle, worktop run and storage sized to how the household cooks.",
      span: "wide",
    },
    {
      id: "living",
      image: "interiorLiving",
      alt: "Open plan living space with a low ceiling, timber joinery and a raised floor platform",
      caption: "Living space",
      note: "Ceiling height, daylight and the furniture layout, drawn before joinery.",
    },
    {
      id: "bathroom",
      image: "interiorBathroom",
      alt: "Bathroom interior with tiled walls, a pedestal basin and a shower over the bath",
      caption: "Bathroom",
      note: "Wet areas, falls and waterproofing detailed with the plumbing layout.",
    },
  ] satisfies GalleryItem[],
};

/** Interior design is a discipline, not an add-on. Used on the services page. */
export const interiorDesignPoints = [
  "Space planning before anything is bought — the layout decides the budget",
  "Daylight study for every room that has a window",
  "Circulation that works at 7am and at 9pm",
  "Storage planned into the walls, not added to the room",
  "Material and finish schedule with alternatives at three price levels",
  "Lighting plan for day use, evening use and the kitchen specifically",
];

/**
 * Two interiors shown on a project page. Kept separate from the gallery so the
 * project template can render a shorter band, and labelled as samples there.
 */
export const interiorSamples = [
  {
    id: "kitchen",
    src: "/images/interior-04.jpg",
    alt: "Modern open plan kitchen with timber cabinetry, stone benchtop and pendant lighting",
    caption: "Kitchen and dining",
    note: "Benchtop run, appliance positions and the dining clearances set out with the plan.",
  },
  {
    id: "living",
    src: "/images/interior-05.jpg",
    alt: "Bright living room with built-in joinery, skylights and a raised platform overlooking the space",
    caption: "Living space",
    note: "Joinery drawn into the structure, with the lighting plan agreed before first fix.",
  },
] as const;

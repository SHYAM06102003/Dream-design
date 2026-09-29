import { images, type DrawingVisual, type PhotoVisual } from "./images";

/**
 * Builds a project photo from the centralised image library, so a file path or
 * crop only ever changes in one place. Alt text stays project-specific.
 */
function photo(visual: { src: string; width: number; height: number }, alt: string): PhotoVisual {
  return { kind: "photo", src: visual.src, alt, width: visual.width, height: visual.height };
}

/**
 * ============================================================================
 * PROJECT SHOWCASE DATA
 * ----------------------------------------------------------------------------
 * The four entries below are SAMPLE records used to demonstrate the layout.
 * They are not real projects and no real client, site or cost is implied —
 * every one is flagged `isPlaceholder: true` and the UI labels them as samples.
 *
 * Photography comes from the shared library in ./images, so swapping a file
 * happens in one place. Nothing here is CMS-backed yet: the array below is
 * shaped like a collection, so replacing it with a CMS query later means
 * changing this file's internals, not the components.
 *
 * To publish real work: duplicate an entry, set `isPlaceholder: false`, fill in
 * the fields with the real project, and add the photographs to /public/images.
 * ============================================================================
 */

export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  /** Short category shown as the project type, e.g. "New Build". */
  category: string;
  /** Built-up area label, e.g. "2,400 sq.ft". */
  area: string;
  year: string;
  /** One or two sentence summary for the grid card. */
  summary: string;
  /** Longer narrative for the detail page. */
  description: string;
  /** The design thinking behind the project. */
  concept: string;
  /** Services delivered on this project. */
  scope: string[];
  image: PhotoVisual;
  /** Detail page imagery: finished, construction and interior photography. */
  gallery: PhotoVisual[];
  /** Optional vector floor plan; falls back to the built-in drawing. */
  floorPlan?: DrawingVisual;
  /** Scope of the land → home journey this project represents. */
  journey: string[];
  isPlaceholder: boolean;
};

export const projects: Project[] = [
  {
    id: "p1",
    slug: "modern-residence",
    title: "Modern Residence",
    location: "Location placeholder",
    category: "New build",
    area: "2,400 sq.ft",
    year: "2026",
    summary:
      "A single-storey family home organised around a shaded courtyard, with the living spaces opening fully to the plot.",
    description:
      "This project covers the complete journey from an unbuilt plot to a finished home. The brief was simple: a family wanted three bedrooms, generous living space and a house that stayed cool through the afternoon. The plan answers that with a central courtyard that pulls daylight and air into every room, while a deep roof overhang keeps the glazed walls in shade.",
    concept:
      "The house is arranged as three parallel bars — living, sleeping and service — linked by a glazed circulation spine. Keeping the rooms in single-depth bands means every space can be cross-ventilated, and the courtyard sits exactly where the family spends most of its evening.",
    scope: ["Land survey", "Architectural planning", "3D design", "Complete construction"],
    image: photo(images.hero, "Contemporary single-storey residence with a low profile and landscaped garden"),
    gallery: [
      photo(images.livingRoom, "Open plan living area looking onto the courtyard"),
      photo(images.construction, "The house during the structural phase of construction"),
      photo(images.kitchen, "Kitchen finished with stone worktops"),
      photo(images.buildHalfFinished, "The frame and first floor slab part way through construction"),
    ],
    journey: ["Surveyed plot", "Approved floor plan", "3D design sign-off", "Completed home"],
    isPlaceholder: true,
  },
  {
    id: "p2",
    slug: "contemporary-villa",
    title: "Contemporary Villa",
    location: "Location placeholder",
    category: "New build",
    area: "3,150 sq.ft",
    year: "2026",
    summary:
      "A two-storey villa that steps down the slope of the land, keeping the ground floor open and private above.",
    description:
      "The plot fell gently away from the road, so the design works with the fall instead of fighting it. Living spaces occupy the upper level to capture the view, while bedrooms sit at ground level for coolness and privacy. Retaining walls and stepped terraces make the slope part of the architecture.",
    concept:
      "Split levels were chosen over a flat base because they reduce the amount of cut-and-fill on the site. Each half-level lands on the natural contour, which lowers retaining costs and gives every room a direct relationship with the garden.",
    scope: ["Land survey", "Architectural planning", "3D design", "Complete construction"],
    image: photo(images.homeA, "Two storey villa with deep roof overhang and front terrace"),
    gallery: [
      photo(images.constructionAlt, "The villa structure taking shape on site"),
      photo(images.bedroom, "Principal bedroom with full height glazing"),
      photo(
        images.interiorLiving,
        "Living space finished with built-in joinery and a raised platform",
      ),
    ],
    journey: ["Surveyed plot", "Approved floor plan", "3D design sign-off", "Completed home"],
    isPlaceholder: true,
  },
  {
    id: "p3",
    slug: "urban-family-home",
    title: "Urban Family Home",
    location: "Location placeholder",
    category: "New build",
    area: "1,850 sq.ft",
    year: "2025",
    summary:
      "A compact family house on a narrow plot, designed around vertical light rather than extra footprint.",
    description:
      "On a narrow plot the usual answer is to build upward and let the ground floor go dark. This house does the opposite: a full height lightwell runs through the centre of the plan, pulling daylight into the middle of the ground floor and giving the stairs a view of planting.",
    concept:
      "The plan is a simple rectangle, but the void at its centre changes how the whole house feels. Kitchen, dining and living all read the same planted space, and no internal room relies on artificial light during the day.",
    scope: ["Land survey", "Architectural planning", "3D design", "Complete construction"],
    image: photo(images.homeB, "Compact family house with brick and render facade"),
    gallery: [
      photo(images.render3d, "3D visualisation of the house design before construction"),
      photo(images.kitchen, "Kitchen beside the central lightwell"),
      photo(images.interiorBathroom, "First floor bathroom finished in wall tile with a glass shower"),
    ],
    journey: ["Surveyed plot", "Approved floor plan", "3D design sign-off", "Completed home"],
    isPlaceholder: true,
  },
  {
    id: "p4",
    slug: "minimalist-residence",
    title: "Minimalist Residence",
    location: "Location placeholder",
    category: "Renovation",
    area: "1,200 sq.ft",
    year: "2025",
    summary:
      "An existing house stripped back and rebuilt internally, with new glazing and a reworked kitchen.",
    description:
      "The original house was structurally sound but planned around small dark rooms. Rather than demolishing it, the renovation opened the rear wall, added a full height glazed screen and rebuilt the kitchen around the new opening. The result is a much larger-feeling home on the same footprint.",
    concept:
      "Keeping the existing frame saved both budget and embodied carbon. The design works with what was already good about the house and spends the money where it changes how the family lives.",
    scope: ["Architectural planning", "3D design", "Renovation"],
    image: photo(images.livingRoom, "Renovated open plan interior with new full height glazing"),
    gallery: [
      photo(images.homeC, "The renovated house seen from the street"),
      photo(images.bedroom, "Bedroom reworked during the renovation"),
      photo(images.buildHalfFinished, "The property opened up during the structural stage of the work"),
      photo(
        images.interiorKitchen,
        "Kitchen refitted during the renovation with stone worktops",
      ),
    ],
    journey: ["Existing house", "Renovation design", "3D design sign-off", "Finished home"],
    isPlaceholder: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const projectsIntro = {
  eyebrow: "Selected work",
  title: "Selected residences",
  description:
    "A look at how the same process — survey, plan, design, build — resolves differently on every plot.",
};

/**
 * ============================================================================
 * CENTRALISED IMAGE SYSTEM
 * ----------------------------------------------------------------------------
 * Every photograph on the site is declared here. To use the real photography:
 *   1. drop the files into /public/images
 *   2. point `src` at the new file name
 *   3. update `alt` so it describes the new image for screen readers and SEO
 *
 * The bundled files are CC-licensed placeholders — see /public/images/CREDITS.md.
 * They are only here so the layout reads correctly before real photos exist.
 * ============================================================================
 */

export type Credit = {
  /** Commons file name or short source label. */
  title: string;
  author: string;
  license: string;
  source: string;
};

export type PhotoVisual = {
  kind: "photo";
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: Credit;
};

/** Vector drawings render inline, so they stay crisp and on-brand. */
export type DrawingVisual = {
  kind: "drawing";
  drawing: "sitePlan" | "floorPlan" | "axonometric";
  alt: string;
};

export type Visual = PhotoVisual | DrawingVisual;

const carotflower = (title: string): Credit => ({
  title,
  author: "Andre Carrotflower",
  license: "CC BY-SA 4.0",
  source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replace(/ /g, "_"))}`,
});

const lemay = (title: string): Credit => ({
  title,
  author: "Warren LeMay",
  license: "CC BY-SA 2.0",
  source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replace(/ /g, "_"))}`,
});

const commons = (title: string, author = "See source page", license = "CC BY-SA"): Credit => ({
  title,
  author,
  license,
  source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replace(/ /g, "_"))}`,
});

export const images = {
  /* --- Hero ------------------------------------------------------------ */
  hero: {
    kind: "photo",
    src: "/images/hero-home.jpg",
    alt: "Contemporary detached house with clean horizontal lines and a landscaped front garden",
    width: 1600,
    height: 960,
    credit: carotflower("Howard W. Cowan House, Buffalo, New York - 20220111.jpg"),
  } satisfies PhotoVisual,

  /* --- Land / survey / build / finished -------------------------------- */
  land: {
    kind: "photo",
    src: "/images/land-01.jpg",
    alt: "Cleared, unbuilt plot of land with open boundary and access road",
    width: 1600,
    height: 901,
    credit: commons("An empty plot of land on Fishleigh Road, Roundswell, Barnstaple - geograph.org.uk - 8248204.jpg", "Roger A Smith"),
  } satisfies PhotoVisual,

  landAlt: {
    kind: "photo",
    src: "/images/land-03.jpg",
    alt: "Open undeveloped land awaiting development",
    width: 1600,
    height: 1200,
    credit: commons("Empty Land near Commonwealth MRT Station, June 2026.jpg", "GoAheadFan95"),
  } satisfies PhotoVisual,

  construction: {
    kind: "photo",
    src: "/images/construction-01.jpg",
    alt: "Residential building under construction with scaffolding and site works",
    width: 1600,
    height: 811,
    credit: commons("Dalian China Construction-site-01.jpg", "CEphoto, Uwe Aranas", "CC BY-SA 3.0"),
  } satisfies PhotoVisual,

  constructionAlt: {
    kind: "photo",
    src: "/images/construction-02.jpg",
    alt: "New residential building taking shape on an active construction site",
    width: 1600,
    height: 1200,
    credit: commons("New Apartment Building Under Construction - panoramio.jpg"),
  } satisfies PhotoVisual,

  render3d: {
    kind: "photo",
    src: "/images/render-01.jpg",
    alt: "3D architectural visualisation of a contemporary residence",
    width: 1600,
    height: 1200,
    credit: commons("Contemporary Residence with Gable Windows – 3D Architectural Visualization.jpg", "Tuantranseo", "CC BY 4.0"),
  } satisfies PhotoVisual,


  /* --- Survey equipment, drawings, construction, interiors ------------ */
  surveyTotalStation: {
    kind: "photo",
    src: "/images/survey-01.jpg",
    alt: "Total station on a tripod set up on open ground, pointing towards a prism target during a land survey",
    width: 1600,
    height: 1200,
    credit: commons("TS by The sea.jpg", "Riccardo.salvini", "CC BY 4.0"),
  } satisfies PhotoVisual,

  surveyLevels: {
    kind: "photo",
    src: "/images/survey-02.jpg",
    alt: "Archaeologists and surveyors using an automatic level and levelling staff across a marked-out site",
    width: 1600,
    height: 1200,
    credit: commons("Archaeologists using a dumpy level to survey a trench.jpg", "LP B, Oxford Archaeology", "CC BY 4.0"),
  } satisfies PhotoVisual,

  surveyLevelKit: {
    kind: "photo",
    src: "/images/survey-03.jpg",
    alt: "Surveyor's automatic level mounted on a tripod, ready to take readings",
    width: 1600,
    height: 1067,
    credit: commons("Kraft Wien level (5689).jpg", "Gampe", "CC BY-SA 4.0"),
  } satisfies PhotoVisual,

  surveyGnss: {
    kind: "photo",
    src: "/images/survey-04.jpg",
    alt: "GNSS survey receiver mounted on a tripod with its antenna raised for satellite positioning",
    width: 1600,
    height: 3651,
    credit: { title: "Trimble GNSS Messausrüstung R980 Empfänger.jpg", author: "Best Tech Nick 25", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Trimble_GNSS_Messausr%C3%BCstung_R980_Empf%C3%A4nger.jpg" },
  } satisfies PhotoVisual,

  blueprintPlan: {
    kind: "photo",
    src: "/images/blueprint-01.jpg",
    alt: "Architectural floor plan drawing showing room layout and dimensions",
    width: 1600,
    height: 1340,
    credit: { title: "Bolduc House Floor Plan--Ste Genevieve MO.png", author: "Drawn by Frank R. Leslie", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Bolduc_House_Floor_Plan--Ste_Genevieve_MO.png" },
  } satisfies PhotoVisual,

  blueprintDrawing: {
    kind: "photo",
    src: "/images/blueprint-02.jpg",
    alt: "Historic architectural plan drawing on paper with measured lines and title block",
    width: 1600,
    height: 1362,
    credit: { title: "Farrago, Hornsea, Original Architectural Plan, 1909.jpg", author: "David Reynard Robinson (1843-1913)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Farrago,_Hornsea,_Original_Architectural_Plan,_1909.jpg" },
  } satisfies PhotoVisual,

  buildHalfFinished: {
    kind: "photo",
    src: "/images/construction-03.jpg",
    alt: "Two storey house under construction, with concrete footings, blockwork and the first floor structure partially complete",
    width: 1600,
    height: 1060,
    credit: { title: "A house under construction.jpg", author: "Goose Green Photography", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:A_house_under_construction.jpg" },
  } satisfies PhotoVisual,

  interiorKitchen: {
    kind: "photo",
    src: "/images/interior-04.jpg",
    alt: "Modern open plan kitchen with timber cabinetry, stone benchtop and pendant lighting",
    width: 1600,
    height: 1205,
    credit: { title: "Interior of Kitchen Cafe 2025-01-29.jpg", author: "Andy Li", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Interior_of_Kitchen_Cafe_2025-01-29.jpg" },
  } satisfies PhotoVisual,

  interiorLiving: {
    kind: "photo",
    src: "/images/interior-05.jpg",
    alt: "Bright living room with built-in joinery, skylights and a raised platform overlooking the space",
    width: 1600,
    height: 1200,
    credit: lemay("Studio, Paul Schweiker House and Studio, Meacham Road, Schaumburg, IL.jpg"),
  } satisfies PhotoVisual,

  interiorBathroom: {
    kind: "photo",
    src: "/images/interior-06.jpg",
    alt: "Modern bathroom with white wall tiles, a built-in vanity, mirror and a glass shower enclosure",
    width: 1600,
    height: 1200,
    credit: commons("First-Floor Bathroom in Shrewsbury House, Shooter's Hill (03).jpg", "Ethan Doyle White", "CC BY-SA 4.0"),
  } satisfies PhotoVisual,

  /* --- Interiors ------------------------------------------------------- */
  livingRoom: {
    kind: "photo",
    src: "/images/interior-01.jpg",
    alt: "Open plan living room with full height glazing and a view of the garden",
    width: 1600,
    height: 1200,
    credit: lemay("Living Room, Paul Schweiker House and Studio, Meacham Road, Schaumburg, Illinois.jpg"),
  } satisfies PhotoVisual,

  kitchen: {
    kind: "photo",
    src: "/images/interior-02.jpg",
    alt: "Modern fitted kitchen with stone worktops and integrated appliances",
    width: 1600,
    height: 1063,
    credit: commons("Sustainable Kitchen - Flickr - Jeremy Levine Design.jpg", "Jeremy Levine", "CC BY 2.0"),
  } satisfies PhotoVisual,

  bedroom: {
    kind: "photo",
    src: "/images/interior-03.jpg",
    alt: "Principal bedroom with fireplace and full height windows",
    width: 1600,
    height: 1200,
    credit: lemay("Master Bedroom Fireplace, Paul Schweiker House and Studio, Meacham Road, Schaumburg, Illinois.jpg"),
  } satisfies PhotoVisual,

  /* --- Houses used for the showcase grid ------------------------------- */
  homeA: {
    kind: "photo",
    src: "/images/home-02.jpg",
    alt: "Two storey family house with a deep roof overhang and front terrace",
    width: 1600,
    height: 1199,
    credit: carotflower("George Urban House, Cheektowaga, New York - 20191017.jpg"),
  } satisfies PhotoVisual,

  homeB: {
    kind: "photo",
    src: "/images/home-03.jpg",
    alt: "Detached house with mixed brick and render facade and integral garage",
    width: 1600,
    height: 1200,
    credit: carotflower("Thomas J. Gardner House, Buffalo, New York - 20220401.jpg"),
  } satisfies PhotoVisual,

  homeC: {
    kind: "photo",
    src: "/images/home-05.jpg",
    alt: "Contemporary home set back from the road behind established planting",
    width: 1600,
    height: 1200,
    credit: carotflower("Jones-Henrich House, Buffalo, New York - 20211227.jpg"),
  } satisfies PhotoVisual,
} as const;

/**
 * The six storytelling stages: land → survey → plan → 3D → build → home.
 * Swap a `drawing` for a `photo` at any time to use real project imagery.
 */
export const stageVisuals = {
  land: images.land,
  survey: images.surveyTotalStation,
  plan: {
    kind: "drawing",
    drawing: "floorPlan",
    alt: "Two dimensional house floor plan with room labels and dimension lines",
  } satisfies DrawingVisual,
  design: images.render3d,
  build: images.construction,
  home: images.hero,
} as const satisfies Record<string, Visual>;

/**
 * Attribution for every bundled photograph, derived from the `credit` field
 * above so there is one source of truth. Rendered on /credits.
 */
export const imageCredits = Object.values(images)
  .filter((visual) => visual.kind === "photo" && visual.credit)
  .map((visual) => {
    const photo = visual as PhotoVisual;
    return {
      file: photo.src.replace(/^\//, ""),
      ...(photo.credit as Credit),
    };
  })
  .sort((a, b) => a.file.localeCompare(b.file));

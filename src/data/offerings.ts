/**
 * The two things Dream Design does, and every service under each of them.
 * Everything on the single-page site - the services section, the process
 * section and the enquiry form, reads from this file, so a change here shows
 * up everywhere.
 */

export type OfferingId = "survey" | "civil";

type ProcessStep = {
  title: string;
  description: string;
};

/**
 * Picture shown with a service.
 * - `photo` is one of Dream Design's own pictures in /public/images.
 * - `drawing` is a line illustration from `ServiceIllustration.tsx`, looked up
 *   by the service `id`. To replace a drawing with a real photograph, drop the
 *   file in /public/images and change the visual to `{ type: "photo", ... }`.
 */
export type ServiceVisual =
  | { type: "photo"; src: string; alt: string; positionClassName?: string }
  | { type: "drawing"; alt: string };

export type Service = {
  /** Also the key of the drawing in `ServiceIllustration.tsx`. */
  id: string;
  title: string;
  /** One line shown in the service list. */
  summary: string;
  /** Plain-language explanation for someone who has never needed this before. */
  description: string;
  /** Abbreviations a first-time visitor may not know. */
  terms?: { term: string; meaning: string }[];
  /** What Dream Design does as part of this service. */
  includes: string[];
  /** What the client has in hand at the end. */
  receive: string[];
  /** Typical situations, helps a visitor recognise their own need. */
  neededWhen: string[];
  /** Papers worth bringing to the first meeting. */
  keepReady?: string[];
  visual: ServiceVisual;
};

export type Offering = {
  id: OfferingId;
  /** Short label used on tabs and form options. */
  label: string;
  /** Longer name used in headings. */
  title: string;
  /** One-line pitch shown on the selector card. */
  pitch: string;
  /** Opening paragraph in the detail panel. */
  intro: string;
  /** Every service offered under this heading, in the order shown. */
  services: Service[];
  process: ProcessStep[];
  /** Button labels: one for the service panel, one for the process panel. */
  cta: { enquire: string; start: string };
};

export const offerings: Offering[] = [
  {
    id: "survey",
    label: "Survey",
    title: "Land Survey",
    pitch: "Know exactly what you own before you buy, divide or build.",
    intro:
      "Accurate field measurement of your land, its boundaries, area, levels and features, drawn up as a clear plan you can rely on for construction, sale, division or a boundary dispute.",
    services: [
      {
        id: "revenue-survey",
        title: "Revenue survey",
        summary: "FMB boundary fixing and partition work.",
        description:
          "Every piece of land is recorded by the revenue department as a small measured sketch. We take that sketch to the ground: measure the land, find where the recorded boundary lines actually fall and mark the corners, so you, your neighbours and the records all agree. When a property is being shared within a family or sold in parts, we measure and mark each share as well.",
        terms: [
          {
            term: "FMB",
            meaning:
              "Field Measurement Book, the revenue department's measured sketch of each survey number.",
          },
        ],
        includes: [
          "FMB sketch and patta details checked against the land as it stands",
          "Boundary lines and corner points fixed on the ground with survey instruments",
          "Partition work: each share measured and marked to the agreed extent",
          "Any gap or encroachment between the record and the ground pointed out",
        ],
        receive: [
          "Corner points marked on site with stones or pegs",
          "A measured sketch showing every boundary length and the area",
          "For a partition, a sketch showing each share and its extent",
        ],
        neededWhen: [
          "Fencing or building a compound wall",
          "A boundary doubt with a neighbour",
          "Dividing family property",
          "Checking the extent before buying",
        ],
        keepReady: ["Patta / chitta", "FMB sketch", "Sale deed or parent document"],
        visual: {
          type: "drawing",
          alt: "Sketch of a land parcel with corner stones, boundary measurements and a dashed line dividing it into two shares",
        },
      },
      {
        id: "layout-marking",
        title: "Layout design & marking",
        summary: "Plotted layouts drawn and marked on site, as per DTCP rules.",
        description:
          "Turning a piece of land into house plots takes more than drawing lines. A layout needs roads of the right width, plots of a usable shape and space set aside for parks and public use, in the way the DTCP rules ask for. We survey the land, design the layout on it and then mark every road and plot on the ground.",
        terms: [
          {
            term: "DTCP",
            meaning:
              "Directorate of Town and Country Planning, the Tamil Nadu authority that approves layouts and buildings outside the Chennai metropolitan area.",
          },
        ],
        includes: [
          "Boundary and level survey of the whole land",
          "Layout drawn with roads, plots and reserved open space",
          "Dimensions and area worked out for every plot",
          "Roads and plot corners marked on site with stones or pegs",
        ],
        receive: [
          "Layout drawing with a numbered plot schedule",
          "Every plot and road marked on the ground",
          "Area statement for plots, roads and open space",
        ],
        neededWhen: [
          "Developing land into house plots",
          "Selling land as individual plots",
          "Preparing a layout for DTCP approval",
          "Re-marking plots in an existing layout",
        ],
        keepReady: ["Patta / chitta", "FMB sketch", "Sale deed"],
        visual: {
          type: "drawing",
          alt: "Plan of a plotted layout with numbered house plots on both sides of a road and a reserved open space",
        },
      },
      {
        id: "contour-survey",
        title: "Contour survey",
        summary: "The levels and slopes of your land, drawn as contour lines.",
        description:
          "A contour survey shows the height of the ground across your land. Levels are taken on a regular grid and joined into contour lines, so anyone reading the drawing can see where the land is high, where it is low and which way rainwater will run. It is the starting point for planning earthwork, drainage, roads and foundation levels.",
        includes: [
          "Spot levels taken on a grid across the site",
          "Contour lines drawn at an interval that suits the land",
          "High points, low points and the direction of drainage marked",
          "Levels tied to a fixed reference point kept on site",
        ],
        receive: [
          "Contour map with spot levels",
          "Cross-sections of the ground where they are needed",
          "The drawing as a print and as a soft copy for your engineer",
        ],
        neededWhen: [
          "Building on sloping or uneven land",
          "Planning earth filling or cutting",
          "Designing drainage or roads",
          "Levelling farm land, ponds and bunds",
        ],
        visual: {
          type: "drawing",
          alt: "Contour map with nested contour lines labelled by level, spot level marks and an arrow showing the direction water flows",
        },
      },
      {
        id: "building-marking",
        title: "Building marking",
        summary: "Your plan marked out on the plot before work begins.",
        description:
          "Before the first trench is dug, the building has to be placed on the plot exactly as drawn. We transfer the plan to the ground: the building outline, the space left from each boundary and the centre of every column and footing. Getting this right on day one avoids mistakes that are very costly to correct once concrete is poured.",
        includes: [
          "Plot boundaries and setbacks checked against the plan",
          "Building corners and wall centre lines marked",
          "Column and footing centres set out",
          "Diagonals checked so that the building is square",
        ],
        receive: [
          "Marking on site, ready for excavation",
          "Reference points kept outside the work area for re-checking",
          "A level reference for the plinth",
        ],
        neededWhen: [
          "Starting a new house or building",
          "Adding an extension",
          "Before excavating for footings",
          "Aligning a compound wall",
        ],
        keepReady: ["Approved building plan", "Column layout drawing"],
        visual: {
          type: "drawing",
          alt: "Plot plan showing a building outline set back from the boundary, with column centres on a lettered and numbered grid and diagonals checked",
        },
      },
      {
        id: "topographical-survey",
        title: "Topographical survey",
        summary: "A complete map of the land and everything on it.",
        description:
          "A topographical survey records the land as it exists today: its boundaries and levels, and every feature on it, such as buildings, wells, trees, electric poles, roads, drains and fences. Designers use it as the base drawing, so that what they plan fits what is really there.",
        includes: [
          "Boundaries and ground levels measured",
          "Existing buildings, walls and fences located",
          "Roads, access, drains and utility lines picked up",
          "Trees, wells and water bodies recorded",
        ],
        receive: [
          "Scaled topographical plan of the site",
          "Levels and contours on the same drawing",
          "The drawing as a print and as a soft copy for your designer",
        ],
        neededWhen: [
          "Before designing a house, layout or factory",
          "Large sites and farm land",
          "Road, pipeline or drainage works",
          "Your architect asks for a site plan",
        ],
        visual: {
          type: "photo",
          src: "/images/survey-1.webp",
          alt: "Surveyor setting up a total station on a tripod on a grassy plot",
          // Tall photo in a wide frame: keeps the surveyor and the instrument in view.
          positionClassName: "object-[50%_40%]",
        },
      },
      {
        id: "quantity-survey",
        title: "Quantity survey",
        summary: "Earthwork and work quantities measured, not guessed.",
        description:
          "When earth is cut, filled or carted away, payment depends on quantity. We measure the ground before and after the work and calculate the volume from those levels, so the owner and the contractor both work from the same measured figure. The same method is used for stockpiles, road formation and site levelling.",
        includes: [
          "Levels taken before the work starts and after it is done",
          "Cut and fill volumes calculated from the levels",
          "Stockpile and excavation volumes measured",
          "Work done on site measured for checking contractor bills",
        ],
        receive: [
          "Quantity statement with the calculations",
          "Level sheets and cross-sections that back up the figures",
        ],
        neededWhen: [
          "Site levelling and earth filling",
          "Road and layout formation",
          "Checking a contractor's bill",
          "Pond, quarry or excavation work",
        ],
        visual: {
          type: "drawing",
          alt: "Cross-section of ground showing the existing ground line, the planned level, and the areas to be cut and filled",
        },
      },
    ],
    process: [
      {
        title: "Enquiry & documents",
        description:
          "Tell us where the land is and what you need. We review the sale deed, patta or other records you have.",
      },
      {
        title: "Site visit",
        description:
          "We visit the plot, confirm the boundaries with you and plan the survey around the terrain.",
      },
      {
        title: "Field measurement",
        description:
          "Boundaries, levels and features are measured with survey instruments and recorded point by point.",
      },
      {
        title: "Computation & drawing",
        description:
          "The field data is checked, the area is computed and a scaled plan is prepared.",
      },
      {
        title: "Handover & marking",
        description:
          "You receive the drawing, and boundary points are marked on site where required.",
      },
    ],
    cta: { enquire: "Enquire about a land survey", start: "Book a survey" },
  },
  {
    id: "civil",
    label: "Civil Consultant",
    title: "Civil Consultancy",
    pitch: "Design, approvals, estimates and construction for your building.",
    intro:
      "From the first floor plan to the finished building, we design, estimate, get the approvals and build, so decisions are made early, on paper, where they cost the least.",
    services: [
      {
        id: "construction",
        title: "Construction",
        summary: "Your house or building built, from foundation to finishing.",
        description:
          "We take up the construction of houses and buildings, working from the approved drawings and an agreed estimate. Because the survey, the design and the building work are handled by the same team, what gets built matches what was planned.",
        includes: [
          "Site marking, excavation and foundation",
          "Columns, beams and slabs built to the structural drawings",
          "Brickwork, plastering, flooring and finishing work",
          "Checks at every stage, with regular updates to you",
        ],
        receive: [
          "A completed building, as per the agreed drawings",
          "Stage-by-stage progress you can follow",
          "One team answerable from start to finish",
        ],
        neededWhen: [
          "Building a new house",
          "Shops and commercial buildings",
          "Adding a floor or an extension",
          "Renovating an older building",
        ],
        keepReady: ["Land documents", "Approved plan, if you have one", "Your budget and timeline"],
        visual: {
          type: "photo",
          src: "/images/Project-4.webp",
          alt: "Completed two-storey house with a yellow, grey and terracotta facade",
          positionClassName: "object-center",
        },
      },
      {
        id: "estimation",
        title: "Estimation",
        summary: "Know what the building will cost before you start.",
        description:
          "An estimate works out what your building will need: the quantity of cement, steel, bricks, sand and other materials, the labour, and the total cost. It is calculated from the drawings, item by item, so you can plan your budget or loan and compare contractor quotations fairly.",
        includes: [
          "Quantities taken from the plan and structural drawings",
          "Item-wise abstract of materials, labour and cost",
          "Current local rates applied",
          "Cost split by stage, to plan your payments",
        ],
        receive: ["Detailed estimate with an abstract", "Material quantity list", "Stage-wise cost break-up"],
        neededWhen: [
          "Fixing a budget for a new house",
          "Applying for a housing loan",
          "Comparing contractor quotations",
          "Before a renovation or extension",
        ],
        keepReady: ["Building plan", "Your preferred finishes and materials"],
        visual: {
          type: "drawing",
          alt: "Estimate sheet with item rows and a total, beside bars showing the share of cement, steel, bricks and labour",
        },
      },
      {
        id: "dtcp-approvals",
        title: "DTCP approvals",
        summary: "Layout and site approvals, from drawings to follow-up.",
        description:
          "To sell plots or build on newly developed land, the layout or site usually needs approval from the DTCP. The process needs a survey, drawings in the required format and a set of land documents. We prepare the drawings, put the file together and follow it through each stage.",
        terms: [
          {
            term: "DTCP",
            meaning:
              "Directorate of Town and Country Planning, the Tamil Nadu authority that approves layouts and buildings outside the Chennai metropolitan area.",
          },
        ],
        includes: [
          "Land and documents checked before applying",
          "Layout or site drawings prepared in the required format",
          "Application file put together with the land records",
          "Follow-up with the authority, and corrections attended to",
        ],
        receive: [
          "Complete drawing and application set",
          "Clear guidance on what is needed at each stage",
          "A copy of everything submitted, for your records",
        ],
        neededWhen: [
          "Developing a plotted layout",
          "Selling plots that buyers want approved",
          "Getting a single site approved",
          "Buyers need approved plots for bank loans",
        ],
        keepReady: ["Patta / chitta", "FMB sketch", "Sale deed", "Encumbrance certificate (EC)"],
        visual: {
          type: "drawing",
          alt: "Layout drawing sheet with a tick mark, above four steps: survey, drawing, file and approval",
        },
      },
      {
        id: "building-plan-approval",
        title: "Building plan approval",
        summary: "Plan approval applied for online, through the single window portal.",
        description:
          "Before construction starts, the building plan has to be approved by the local body or planning authority. In Tamil Nadu the application is made online, through the government's single window portal. We draw the plan to the building rules, upload it with your documents and attend to any queries that are raised.",
        terms: [
          {
            term: "Single window portal",
            meaning:
              "The Tamil Nadu government's online system where building plan applications are submitted, tracked and approved.",
          },
        ],
        includes: [
          "Plan drawn to the building rules: setbacks, height, floor area and parking",
          "Documents checked and uploaded",
          "Online application made on the single window portal",
          "Queries and corrections attended to",
        ],
        receive: [
          "Approval drawing set",
          "Application details, so you can track the status",
          "The approved plan, once it is issued",
        ],
        neededWhen: [
          "Building a new house",
          "Adding a floor or an extension",
          "Shops and commercial buildings",
          "A bank asks for an approved plan",
        ],
        keepReady: ["Sale deed", "Patta / chitta", "Encumbrance certificate (EC)", "Owner's ID proof"],
        visual: {
          type: "drawing",
          alt: "Online application window showing a floor plan being uploaded beside a checklist of documents, drawing, fees and approval",
        },
      },
      {
        id: "fmb-work",
        title: "FMB work",
        summary: "FMB sketches read, checked and drawn up clearly.",
        description:
          "The FMB sketch is the official drawing of your survey number, but it is hard to read and often does not match the land as it stands today. We plot the sketch to scale, compare it with actual measurements and prepare clear drawings that can be used for sub-division, patta transfer or an approval application.",
        terms: [
          {
            term: "FMB",
            meaning:
              "Field Measurement Book, the revenue department's measured sketch of each survey number.",
          },
        ],
        includes: [
          "FMB sketch plotted to scale and its area checked",
          "The record compared with measurements on the ground",
          "Sub-division sketches for a part sale or a partition",
          "Combined sketches when a property covers several survey numbers",
        ],
        receive: [
          "A clean, scaled drawing of your survey number",
          "Sub-division sketch with the extent of each part",
          "A note of any difference between the record and the ground",
        ],
        neededWhen: [
          "Patta transfer or sub-division",
          "Buying part of a survey number",
          "An approval needs an FMB-based site plan",
          "Records and ground do not match",
        ],
        keepReady: ["FMB sketch", "Patta / chitta", "Sale deed"],
        visual: {
          type: "drawing",
          alt: "FMB-style sketch of a survey number with a chain line, offsets, sub-divisions and neighbouring survey numbers",
        },
      },
      {
        id: "building-design",
        title: "Building design & structural plan",
        summary: "Floor plans for your family, and the structure that holds them up.",
        description:
          "Good design has two halves. The building plan decides how you will live: room sizes, light, ventilation, privacy, and Vastu where you want it. The structural plan decides how the building stands: the size and steel of every footing, column, beam and slab. We prepare both, so the plan you like can be built safely and economically.",
        includes: [
          "Floor plans drawn for your plot, family and budget",
          "Elevations and sections",
          "Structural drawings: footing, column, beam and slab details",
          "Working drawings the site team can follow",
        ],
        receive: [
          "Floor plan set, revised with you until it feels right",
          "Structural drawing set with steel details",
          "Drawings ready for approval and for construction",
        ],
        neededWhen: [
          "Planning a new house",
          "Adding a floor to an existing building",
          "Shops, halls and commercial buildings",
          "You want a Vastu-friendly plan",
        ],
        keepReady: ["Plot measurements or survey sketch", "List of rooms you need", "Your budget"],
        visual: {
          type: "drawing",
          alt: "Floor plan with living room, bedroom and kitchen, beside a section through a column and footing showing the steel bars",
        },
      },
      {
        id: "layout-designing",
        title: "Layout designing",
        summary: "Land planned into plots, roads and open spaces.",
        description:
          "A well-designed layout gets the most usable plots out of the land while keeping roads, corners and open spaces comfortable. Working on the surveyed outline of your land, we study the options and design a layout that follows the planning rules and makes sense to sell.",
        includes: [
          "Layout options studied on the surveyed land",
          "Road network, plot sizes and corner plots planned",
          "Open space and public-purpose areas placed as the rules require",
          "Area statement: plots, roads and reserved land",
        ],
        receive: [
          "Layout plan with plot numbers and dimensions",
          "Area statement showing how the land is used",
          "Drawings ready to go for approval",
        ],
        neededWhen: [
          "Planning a residential layout",
          "Finding out how many plots the land will give",
          "Before applying for DTCP approval",
          "Revising an older layout",
        ],
        keepReady: ["Survey sketch of the land", "Patta / chitta", "FMB sketch"],
        visual: {
          type: "drawing",
          alt: "Layout plan of an irregular piece of land divided into plots around a road, with a bar showing the share of plots, roads and open space",
        },
      },
      {
        id: "3d-elevation",
        title: "3D elevation",
        summary: "See the outside of your home before it is built.",
        description:
          "A 3D elevation is a realistic picture of how your building will look from the road: its shape, colours, materials, windows, balconies, compound wall and gate. You can ask for changes on screen, where they cost nothing, rather than on site, where they cost a great deal.",
        includes: [
          "3D model built from your floor plan",
          "Options for style, materials and colours",
          "Changes made with you until the look is right",
          "Final views your builder can follow",
        ],
        receive: [
          "Realistic rendered views of the building",
          "Colour and material references for the site",
        ],
        neededWhen: [
          "Finalising the front look of a new house",
          "Choosing colours and cladding",
          "Giving an older house a new face",
          "Showing your builder exactly what you want",
        ],
        keepReady: ["Floor plan", "Pictures of styles you like"],
        visual: {
          type: "photo",
          src: "/images/Project-1.webp",
          alt: "3D elevation of a contemporary two-storey corner residence with stone cladding, designed by Dream Design",
          positionClassName: "object-center",
        },
      },
      {
        id: "3d-interior",
        title: "3D interior design",
        summary: "Every room planned and shown in 3D.",
        description:
          "Interior design plans the inside of your home: furniture positions, wardrobes, the kitchen, false ceiling, lighting and colours. We show each room in 3D, so you can see how it will look and feel, and so the carpenter and the electrician know exactly what to make.",
        includes: [
          "Furniture layout, room by room",
          "Kitchen, wardrobe and TV unit designs",
          "False ceiling, lighting and colour schemes",
          "3D views of each room",
        ],
        receive: [
          "3D views of every room designed",
          "Measured drawings for the carpenter",
          "Material and colour references",
        ],
        neededWhen: [
          "Moving into a new home",
          "Redoing a kitchen or a room",
          "Fitting more storage into a small space",
          "Shops and offices",
        ],
        keepReady: ["Floor plan or room measurements", "Pictures of interiors you like"],
        visual: {
          type: "drawing",
          alt: "Perspective line drawing of a living room with a sofa, window, wardrobe, pendant light and rug",
        },
      },
    ],
    process: [
      {
        title: "Requirement discussion",
        description:
          "We listen to what you need, rooms, budget, family and timeline, and look at the plot.",
      },
      {
        title: "Site study",
        description:
          "The survey data, soil, access and orientation are studied before any layout is drawn.",
      },
      {
        title: "Plan & elevation",
        description:
          "Floor plans and elevations are drawn and revised with you until the layout feels right.",
      },
      {
        title: "Estimate & approvals",
        description:
          "A quantity-based estimate is prepared and drawings are readied for approval.",
      },
      {
        title: "Construction",
        description:
          "We build it, or guide your own builder, with checks at every stage, so the house is built the way it was designed.",
      },
    ],
    cta: { enquire: "Enquire about civil consultancy", start: "Book a consultation" },
  },
];


/** How many individual services are listed across both offerings. */
export const serviceCount = offerings.reduce((total, offering) => total + offering.services.length, 0);

/** Section copy for the single page. */
export const sections = {
  services: {
    eyebrow: "Services",
    title: "Everything from the first\nmeasurement to the last coat.",
    description:
      "Pick Survey or Civil Consultant, then tap any service to see what it is, what we do, what you receive and when you need it.",
  },
  process: {
    eyebrow: "Process",
    title: "How we work.",
    description: "A clear, step-by-step path for each service. Pick one to see it.",
  },
};

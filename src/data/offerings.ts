/**
 * The two things Dream Design does. Everything on the single-page site -
 * the services section, the process section and the enquiry form, reads from
 * this file, so a change here shows up everywhere.
 */

export type OfferingId = "survey" | "civil";

type ProcessStep = {
  title: string;
  description: string;
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
  /** Things the client receives. */
  deliverables: { title: string; description: string }[];
  /** Typical situations, helps a visitor recognise their own need. */
  suitedFor: string[];
  /** Image shown beside the detail panel. */
  /** `positionClassName` keeps the subject in frame; phone and laptop crops differ. */
  image: { src: string; alt: string; positionClassName?: string };
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
      "Accurate field measurement of your plot, boundaries, area, levels and contours, drawn up as a clear plan you can rely on for construction, sale, division or a boundary dispute.",
    deliverables: [
      {
        title: "Boundary & area survey",
        description:
          "Corner points located on the ground and the exact extent of the plot worked out from the field data.",
      },
      {
        title: "Topographic & contour survey",
        description:
          "Ground levels, slopes and existing features mapped, so the design fits the land and earthwork is planned properly.",
      },
      {
        title: "Plot demarcation & sub-division",
        description:
          "Layouts marked out on site, with pegs and measurements, for house plots, farm land and larger holdings.",
      },
      {
        title: "Setting out for construction",
        description:
          "Building lines, column centres and levels transferred from the drawing to the ground before work begins.",
      },
    ],
    suitedFor: [
      "Buying or selling a plot",
      "Before drawing a house plan",
      "Dividing family property",
      "Fencing or boundary disputes",
      "Layout of a new site",
    ],
    image: {
      src: "/images/survey-1.webp",
      alt: "Surveyor setting up a total station on a tripod on a grassy plot",
      // Face is ~33% down this tall photo: phones show a wide crop, laptops a tall one.
      positionClassName: "object-[50%_45%] lg:object-[50%_62%]",
    },
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
    pitch: "Practical planning and engineering advice for your house or building.",
    intro:
      "From the first floor plan to the final inspection, we advise on how your home should be planned, estimated and built, so decisions are made early, on paper, where they cost the least.",
    deliverables: [
      {
        title: "House planning & design",
        description:
          "Floor plans and elevations drawn for your plot, family and budget, with Vastu-friendly layouts on request.",
      },
      {
        title: "Estimation & budgeting",
        description:
          "Quantities and a clear cost estimate, so you know what the building will take before you commit.",
      },
      {
        title: "Approval support",
        description:
          "Help preparing drawings and papers for building approval with the local authority.",
      },
      {
        title: "Site supervision & quality checks",
        description:
          "Visits at key stages, foundation, columns, slabs, finishes, to check the work against the drawings.",
      },
      {
        title: "Renovation & extension advice",
        description:
          "An honest look at what an existing building can take, and the safest way to add to it.",
      },
    ],
    suitedFor: [
      "Planning a new house",
      "Checking a contractor's work",
      "Extending or renovating",
      "Estimating a building cost",
      "Getting a plan approved",
    ],
    image: {
      src: "/images/Project-3.webp",
      alt: "3D elevation of a duplex residence with a blue and grey facade and a glass-railed balcony, designed by Dream Design",
      // Square photo: keep the centre on phones (wide frame) and laptops (tall frame).
      positionClassName: "object-center",
    },
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
        title: "Construction guidance",
        description:
          "Stage-wise site visits and advice to your builder, so the house is built the way it was designed.",
      },
    ],
    cta: { enquire: "Enquire about civil consultancy", start: "Book a consultation" },
  },
];


/** Section copy for the single page. */
export const sections = {
  services: {
    eyebrow: "Services",
    title: "Two things, done properly.",
    description:
      "Choose a service to see exactly what it covers and who it is for.",
  },
  process: {
    eyebrow: "Process",
    title: "How we work.",
    description: "A clear, step-by-step path for each service. Pick one to see it.",
  },
};

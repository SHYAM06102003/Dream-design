export type ServiceIconName =
  | "ruler"
  | "plan"
  | "cube"
  | "crane"
  | "renovate";

/**
 * The services page is split into three named sections. Each service belongs to
 * exactly one of them, and the order of `serviceGroups` is the order they render.
 */
export type ServiceGroupId = "land-survey" | "house-design" | "build-and-renovate";

export type Service = {
  id: string;
  /** Which section of /services this service sits in. */
  group: ServiceGroupId;
  /** Display number, e.g. "01". */
  number: string;
  title: string;
  /** One line positioning statement — keep it under ~60 characters. */
  summary: string;
  /** What the customer actually receives. */
  description: string;
  /** Bullet list of deliverables, editable. */
  includes: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  icon: ServiceIconName;
  /** Contextual WhatsApp opener for this service. */
  whatsappMessage: string;
};

export const services: Service[] = [
  {
    id: "land-surveying",
    group: "land-survey",
    number: "01",
    title: "Land surveying",
    summary: "Understand your land before you build.",
    description:
      "A proper survey is the difference between a plan that works and a plan that fights you. We measure the plot, its levels and its boundaries, and document what can actually be built on it — before a single design decision is made.",
    includes: [
      "Site visit and boundary verification",
      "Levels, contours and topography",
      "Buildable area and setback check",
      "Marked-up site plan you can keep",
    ],
    image: "/images/survey-01.jpg",
    imageAlt:
      "Total station on a tripod set up on open ground during a land survey",
    imageWidth: 2000,
    imageHeight: 1126,
    icon: "ruler",
    whatsappMessage:
      "Hi, I need a land survey for my plot. Could we discuss a site visit?",
  },
  {
    id: "architectural-planning",
    group: "house-design",
    number: "02",
    title: "Architectural planning",
    summary: "Practical floor plans designed around your land, lifestyle and requirements.",
    description:
      "Plans drawn to fit your plot, your budget and how your family actually lives — not a template. Every layout is developed around daylight, circulation and the way you will use each room, then costed before you commit.",
    includes: [
      "Requirement and budget workshop",
      "2D floor plans for every floor",
      "Elevations and circulation study",
      "Revisions until the plan feels right",
    ],
    image: "/images/blueprint-01.jpg",
    imageAlt: "Architectural floor plan drawing with room layout and dimensions",
    imageWidth: 2000,
    imageHeight: 1500,
    icon: "plan",
    whatsappMessage:
      "Hi, I would like help with a house plan for my land.",
  },
  {
    id: "3d-design",
    group: "house-design",
    number: "03",
    title: "3D home design",
    summary: "Visualize your future home before construction begins.",
    description:
      "3D views let you walk through the house before it exists. Materials, daylight and proportions can be adjusted while changes are still cheap, so the finished home matches what you signed off on.",
    includes: [
      "Exterior and interior 3D views",
      "Material and finish selections",
      "Lighting and shadow studies",
      "Walkthrough of the final design",
    ],
    image: "/images/render-01.jpg",
    imageAlt: "3D architectural visualisation of a contemporary residence",
    imageWidth: 2000,
    imageHeight: 1500,
    icon: "cube",
    whatsappMessage:
      "Hi, I would like to see a 3D design for my house before I build.",
  },
  {
    id: "house-construction",
    group: "build-and-renovate",
    number: "04",
    title: "House construction",
    summary: "Complete residential construction managed from foundation to finish.",
    description:
      "A fixed scope, a clear schedule and one team accountable for the build. We handle structure, services, finishes and handover — with the same drawings you approved at the design stage.",
    includes: [
      "Transparent, itemised estimate",
      "Structured programme with progress updates",
      "Quality checks at every stage",
      "Snagging and final handover",
    ],
    image: "/images/construction-01.jpg",
    imageAlt: "Residential construction in progress",
    imageWidth: 2000,
    imageHeight: 1014,
    icon: "crane",
    whatsappMessage:
      "Hi, I would like a construction estimate for my home.",
  },
  {
    id: "renovation-extension",
    group: "build-and-renovate",
    number: "05",
    title: "Renovation & extension",
    summary: "Transform, expand and improve your existing home.",
    description:
      "Already have a house and want more from it? We work out what the structure can carry, design the changes around how you live now, and deliver them without the disruption of a full rebuild.",
    includes: [
      "Structural feasibility review",
      "Extension and remodel design",
      "Phased construction planning",
      "Finish and detail upgrades",
    ],
    image: "/images/interior-01.jpg",
    imageAlt: "Renovated open plan interior with new glazing",
    imageWidth: 2000,
    imageHeight: 1500,
    icon: "renovate",
    whatsappMessage:
      "Hi, I need a renovation or extension for my existing house.",
  },
];

/** Capability statement used for metadata and the hero strip. */
export const servicesIntro = {
  eyebrow: "Services",
  title: "What we do",
  description:
    "Everything between bare land and a finished home. Most owners end up coordinating a surveyor, an architect and a contractor separately — and losing the thread between them. We hold all three roles, so the survey informs the plan, the plan informs the budget, and the budget holds through construction.",
};

export type ServiceGroup = {
  id: ServiceGroupId;
  /** Display number, e.g. "01". Matches the position of the section. */
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Contextual WhatsApp opener for the section as a whole. */
  whatsappMessage: string;
};

/**
 * The three sections of /services, in render order. Survey and house design are
 * deliberately separate: they are sold, staffed and talked about separately, even
 * though most clients end up buying both.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "land-survey",
    number: "01",
    eyebrow: "Section 01",
    title: "Land survey",
    description:
      "Before anything is designed, the land has to be measured. Boundary, levels, access and the area you are actually allowed to build on — recorded properly and handed over as a drawing you keep. Every decision in the next section starts from this one, which is why it is never skipped.",
    whatsappMessage:
      "Hi, I need a land survey for my plot. Could we discuss a site visit?",
  },
  {
    id: "house-design",
    number: "02",
    eyebrow: "Section 02",
    title: "House design",
    description:
      "Plans, elevations and 3D views drawn around your plot, your budget and the way your family actually lives. You walk through the house before it exists, and every change is made while it is still cheap to make.",
    whatsappMessage:
      "Hi, I would like help with a house design — plans and 3D views — for my land.",
  },
  {
    id: "build-and-renovate",
    number: "03",
    eyebrow: "Section 03",
    title: "Build and renovate",
    description:
      "New construction and work on homes you already own, run by the same team that drew the plans. One scope, one schedule, one team accountable from foundation to handover.",
    whatsappMessage:
      "Hi, I would like a construction or renovation quote for my home.",
  },
];

/** The services in one section, in the order they were written. */
export function servicesInGroup(group: ServiceGroupId) {
  return services.filter((service) => service.group === group);
}

/** Lookup for section labels, e.g. "01 · Land survey" next to a service title. */
export const serviceGroupById = new Map(
  serviceGroups.map((group) => [group.id, group]),
);

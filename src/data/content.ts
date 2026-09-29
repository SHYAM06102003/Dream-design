import { stageVisuals, type Visual } from "./images";

export type Pillar = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const introPillars: Pillar[] = [
  {
    id: "survey",
    number: "01",
    title: "Land survey",
    description:
      "We measure and document the plot first — boundaries, levels and buildable area — so every decision after that is made on facts.",
  },
  {
    id: "planning",
    number: "02",
    title: "Home planning",
    description:
      "Floor plans drawn around your land, your budget and how your household actually lives, refined with you until they feel right.",
  },
  {
    id: "construction",
    number: "03",
    title: "Construction",
    description:
      "The build is run to the drawings you approved, with a structured programme, stage checks and written agreement on every change.",
  },
  {
    id: "management",
    number: "04",
    title: "Project management",
    description:
      "One team coordinates survey, drawings, approvals, materials and site work — so you are not chasing three contractors at once.",
  },
];

export const intro = {
  eyebrow: "One team, every stage",
  title: "One team. Every stage of your home.",
  description:
    "Owning land and building on it means coordinating a surveyor, an architect, approvals, materials and a construction site. We take all of it on, from the first walk across the plot to the day you get the keys — and you deal with one team throughout.",
  /** Short chain used under the hero headline. */
  chain: ["Land", "Survey", "Design", "Estimate", "Construction", "Completed home"],
};

export type JourneyStage = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  /** Photo or drawing for this stage, declared in data/images.ts. */
  visual: Visual;
};

export const journeyStages: JourneyStage[] = [
  {
    id: "land",
    number: "01",
    label: "Empty land",
    title: "You own a plot.",
    description:
      "An address, a boundary on a document, and a picture in your head. Before anything can be designed, the land needs to be properly understood.",
    visual: stageVisuals.land,
  },
  {
    id: "survey",
    number: "02",
    label: "Land survey",
    title: "The land is measured.",
    description:
      "Boundaries, levels, access and setbacks are recorded on a surveyed plan, and the buildable envelope is confirmed.",
    visual: stageVisuals.survey,
  },
  {
    id: "plan",
    number: "03",
    label: "2D floor plan",
    title: "The plan takes shape.",
    description:
      "Rooms, circulation and daylight are arranged on paper, drawn to the survey rather than to a generic template.",
    visual: stageVisuals.plan,
  },
  {
    id: "design",
    number: "04",
    label: "3D design",
    title: "You see the house.",
    description:
      "3D views and material options turn the drawings into something you can judge — while changing them is still inexpensive.",
    visual: stageVisuals.design,
  },
  {
    id: "build",
    number: "05",
    label: "Construction",
    title: "It gets built.",
    description:
      "One team executes the approved design to a structured programme, checking quality stage by stage and agreeing variations in writing.",
    visual: stageVisuals.build,
  },
  {
    id: "home",
    number: "06",
    label: "Completed home",
    title: "You get the keys.",
    description:
      "Snag list closed out, documentation handed over, and a finished home that matches the design you signed off.",
    visual: stageVisuals.home,
  },
];

export const journeyIntro = {
  eyebrow: "The journey",
  title: "What actually happens, in order.",
  description:
    "Building a home is a sequence, not a single event. Here is the whole path from bare land to finished home — and what each stage produces.",
};

export type BeforeAfter = {
  id: string;
  title: string;
  location: string;
  before: { image: string; alt: string; width: number; height: number; label: string };
  after: { image: string; alt: string; width: number; height: number; label: string };
  note: string;
};

export const beforeAfter: BeforeAfter = {
  id: "ba-1",
  title: "From plot to home",
  location: "Sample project — replace with a real before and after",
  before: {
    image: "/images/land-01.jpg",
    alt: "The plot before construction: cleared, levelled ground with no structure on it",
    width: 2000,
    height: 1126,
    label: "Before — the land",
  },
  after: {
    image: "/images/hero-home.jpg",
    alt: "The same stage after construction: a completed contemporary house on the plot",
    width: 2000,
    height: 1200,
    label: "After — the home",
  },
  note: "Sample imagery. Replace with before and after photographs of one real project in data/content.ts.",
};

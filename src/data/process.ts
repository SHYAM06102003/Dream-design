export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  summary: string;
  /** What happens during this stage. */
  detail: string;
  /** What the customer walks away with. */
  outcome: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "site-visit",
    number: "01",
    title: "Site visit",
    summary: "We walk the plot and listen to what you need.",
    detail:
      "A first meeting on the land. We look at access, slopes, existing structures, neighbouring buildings and light, then talk through how you want to live in the house.",
    outcome: "A clear brief and an honest view of what the land will take.",
  },
  {
    id: "land-survey",
    number: "02",
    title: "Land survey",
    summary: "The plot is measured and documented properly.",
    detail:
      "Boundaries, levels, contours and services are recorded, and the buildable envelope is confirmed against local setback rules before design work begins.",
    outcome: "A surveyed site plan and a buildable area you can plan against.",
  },
  {
    id: "planning-design",
    number: "03",
    title: "Planning & design",
    summary: "Floor plans drawn around your land and your life.",
    detail:
      "Plans are developed in line with the survey, then refined with you. Layouts, circulation and daylight are resolved before any cost is committed, and 3D views let you walk through the design.",
    outcome: "Approved 2D plans and a 3D view of the home you are buying.",
  },
  {
    id: "estimate",
    number: "04",
    title: "Estimate",
    summary: "An itemised cost, not a single number.",
    detail:
      "The estimate is broken down by stage and trade against the drawings, so you can see where the money goes and what happens if something changes.",
    outcome: "A written, itemised estimate and a construction schedule.",
  },
  {
    id: "construction",
    number: "05",
    title: "Construction",
    summary: "Built to the drawings, with progress you can see.",
    detail:
      "Work runs to a structured programme with updates at each stage. Quality is checked as the build progresses rather than only at the end, and variations are agreed in writing first.",
    outcome: "A house built to the approved design, stage by stage.",
  },
  {
    id: "handover",
    number: "06",
    title: "Handover",
    summary: "Snag, clean, hand over the keys.",
    detail:
      "We walk the finished house with you, list every outstanding item, complete them, and hand over the documentation — including warranties and maintenance notes.",
    outcome: "A finished home, a snag list closed out, and the keys.",
  },
];

export const processIntro = {
  eyebrow: "How we work",
  title: "From land to home.",
  description:
    "Six stages, one team, no handovers into the unknown. You always know which stage you are in, what it costs and what happens next.",
};

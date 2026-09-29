export type Benefit = {
  id: string;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    id: "estimates",
    title: "Clear estimates",
    description:
      "One written, itemised estimate broken down by stage and trade, issued against real drawings — so the number means something and changes are visible.",
  },
  {
    id: "process",
    title: "Transparent process",
    description:
      "Six defined stages with a schedule against each. You always know which stage you are in, what it involves and what comes next.",
  },
  {
    id: "design",
    title: "Practical designs",
    description:
      "Plans that account for your plot, budget, daylight and daily routine. A design is only useful if it can actually be built and lived in.",
  },
  {
    id: "contact",
    title: "Single point of contact",
    description:
      "One team across survey, design and construction. Questions go to the people doing the work, not to three different contractors.",
  },
  {
    id: "execution",
    title: "Quality-focused execution",
    description:
      "The build follows the drawings you approved, with stage-by-stage checks and written agreement before any variation is carried out.",
  },
  {
    id: "coordination",
    title: "End-to-end coordination",
    description:
      "Survey data feeds the plans, the plans feed the estimate, and the estimate holds through construction. Nothing gets lost between trades.",
  },
];

export const whyUsIntro = {
  eyebrow: "Why owners choose this way",
  title: "What you actually get.",
  description:
    "No invented numbers, no borrowed claims — just the practical reasons this way of working takes less risk out of building your own home.",
};

export const about = {
  eyebrow: "About",
  title: "We don't just build houses.\nWe help build the place people call home.",
  /**
   * PLACEHOLDER STORY — replace with the real company story. No history,
   * founding dates or credentials have been invented here.
   */
  story: [
    "This section is a placeholder for your company story. Replace it with a short, honest account of how the business started, who runs it and why you chose to take projects from land through to handover.",
    "Write it in your own words and keep it concrete: the kind of plots you work on, the size of the homes you build, and what you do differently from a contractor who only builds. Two or three short paragraphs is plenty.",
  ],
  approach: {
    title: "Our approach",
    points: [
      "Start on the land, not on a template — every design begins with the survey.",
      "Cost the design before it is built, so expensive changes happen while they are still cheap.",
      "Keep the client informed in plain language, without jargon or sales pressure.",
      "Finish what is agreed. The snag list gets closed before the keys change hands.",
    ],
  },
  values: {
    title: "What we hold to",
    points: [
      "Honest advice, even when it means a smaller project.",
      "Drawings and estimates that match each other.",
      "Respect for the site, the neighbours and the schedule.",
      "Accountability for the whole result, not just our part of it.",
    ],
  },
  /** PLACEHOLDER — add the founder / lead photograph. */
  portrait: {
    image: "/images/hero-home.jpg",
    alt: "Placeholder portrait of the founder or lead — replace with a real photograph",
    width: 2000,
    height: 1200,
    caption: "Add a photo of the founder or lead here",
  },
  serviceArea: {
    title: "Where we work",
    note: "Add the areas you serve. Placeholder until then.",
  },
};

export const ctaBanner = {
  eyebrow: "Ready when you are",
  title: "Have a plot?\nLet's turn it into a home.",
  description:
    "Send us the details of your land and what you have in mind. We will come back with the next step — usually a site visit and an honest view of what the plot will take.",
  primary: { label: "Start your project", href: "/contact#enquiry" },
  secondary: { label: "View our projects", href: "/projects" },
};

/**
 * ============================================================================
 * TESTIMONIALS — PLACEHOLDER CONTENT
 * ----------------------------------------------------------------------------
 * The quotes below are written to demonstrate the layout. They are NOT real
 * customer feedback and the names are not real people.
 *
 * Before launch, either delete every entry and render nothing, or replace each
 * one with a genuine review: real name (or first name + initial), real location,
 * real project and the words the customer actually said.
 * ============================================================================
 */

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  project: string;
  quote: string;
  /** Keep `true` for sample content so the UI labels it honestly. */
  isPlaceholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sample Client — Name to be added",
    location: "Sample location",
    project: "Sample new build",
    quote:
      "Placeholder quote. Replace this with the words a real client used about the survey, the design process, the estimate and how the build was handled. Keep it specific: what surprised them, what they were worried about, and how it was resolved.",
    isPlaceholder: true,
  },
  {
    id: "t2",
    name: "Sample Client — Name to be added",
    location: "Sample location",
    project: "Sample renovation",
    quote:
      "Placeholder quote. A second sample, structured the same way. Two or three short, specific reviews build more trust than a wall of praise — and they are the only thing on this page that cannot be written by us.",
    isPlaceholder: true,
  },
  {
    id: "t3",
    name: "Sample Client — Name to be added",
    location: "Sample location",
    project: "Sample new build",
    quote:
      "Placeholder quote. A third sample showing the range: a customer who started with land only and ended up with a finished home, and what that experience was actually like.",
    isPlaceholder: true,
  },
];

export const testimonialsIntro = {
  eyebrow: "Client words",
  title: "What owners say",
  description:
    "Real feedback from real projects. Add your own quotes in data/testimonials.ts — these are placeholders until you do.",
};

/** The two services a visitor can enquire about. Mirrors `offerings`. */
export const serviceOptions = [
  { id: "survey", label: "Survey", hint: "Boundary, area, levels, layout" },
  { id: "civil", label: "Civil Consultant", hint: "Planning, estimate, supervision" },
] as const;

export type ServiceOptionId = (typeof serviceOptions)[number]["id"];

export const landSizeHint = "Plot size with units, e.g. 2,400 sq.ft, 5 cents or 1.2 acres.";

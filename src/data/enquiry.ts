/** The two services a visitor can enquire about. Mirrors `offerings`. */
export const serviceOptions = [
  { id: "survey", label: "Survey", hint: "Boundary, layout, contour, marking" },
  { id: "civil", label: "Civil Consultant", hint: "Design, approvals, estimate, construction" },
] as const;

export type ServiceOptionId = (typeof serviceOptions)[number]["id"];

/** Sent with the `dd:select-service` event when a visitor clicks an enquire button. */
export type ServiceSelection = {
  id: ServiceOptionId;
  /** The particular service they were reading about, e.g. "Contour survey". */
  topic?: string;
};

/** Opening line placed in the message box for a particular service. */
export const topicMessagePrefix = "I would like to know more about: ";

export const landSizeHint = "Plot size with units, e.g. 2,400 sq.ft, 5 cents or 1.2 acres.";

/**
 * Options for the enquiry form. Edit these to match how you actually work —
 * for example if you do not take renovation work, remove it from `serviceOptions`.
 */

export const serviceOptions = [
  { id: "land-survey", label: "Land survey" },
  { id: "house-plan", label: "House plan" },
  { id: "3d-design", label: "3D design" },
  { id: "complete-construction", label: "Complete construction" },
  { id: "renovation", label: "Renovation / extension" },
] as const;

export type ServiceOptionId = (typeof serviceOptions)[number]["id"];

export const houseTypeOptions = [
  "Independent house",
  "Duplex / multi-floor",
  "Apartment-style home",
  "Farmhouse or villa",
  "Not sure yet",
] as const;

export const floorOptions = ["Single floor", "Two floors", "Three or more", "Not decided"] as const;

export const budgetHint = "Add a rough figure or range — an honest “not sure yet” is fine.";
export const landSizeHint = "Plot size with units, e.g. 2,400 sq.ft, 5 cents or 1,200 sq.m.";

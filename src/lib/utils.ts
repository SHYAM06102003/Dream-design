import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Two-digit index label used across services, process steps and projects. */
export function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

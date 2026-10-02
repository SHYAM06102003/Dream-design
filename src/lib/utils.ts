import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Teach tailwind-merge the custom type scale, so `text-display-sm` and `text-inverse-strong` are not treated as the same group. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["caption", "body", "lede", "title-sm", "title", "display-sm", "display-lg"] },
      ],
    },
  },
});

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

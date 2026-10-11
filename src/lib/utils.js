import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn: merge conditional class names and dedupe Tailwind classes.
// Aceternity / shadcn components expect this helper.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

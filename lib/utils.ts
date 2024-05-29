import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function range(start: number, end: number) {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

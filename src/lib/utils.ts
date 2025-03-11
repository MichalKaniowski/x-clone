import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  // this regex replaces spaces with dashes and remove all characters that are not letters, numbers or dashes
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const getErrorMessage = (error: unknown) => {
  let message: string;

  if (error instanceof ZodError) {
    return error.errors[0].message;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const getTimeAgoString = (dateInput: string | Date): string => {
  const date = new Date(dateInput); // Convert input to Date object
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const quotient = Math.floor(seconds / unit.seconds);
    if (quotient > 0) {
      return `${quotient} ${unit.label}${quotient > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

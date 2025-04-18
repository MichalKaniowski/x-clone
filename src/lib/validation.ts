import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const customRequiredString = (text: string) =>
  z.string().trim().min(1, text);

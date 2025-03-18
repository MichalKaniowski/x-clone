import { requiredString } from "@/lib/validation";
import { z } from "zod";

export const editProfileSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  bio: z.string().max(200, "Bio cannot be longer than 200 characters"),
});
export type EditProfileValues = z.infer<typeof editProfileSchema>;

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Must be at most 1000 characters"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

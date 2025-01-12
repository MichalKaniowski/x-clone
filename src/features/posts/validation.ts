import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, "Content is required"),
});
export type CreatePostValues = z.infer<typeof createPostSchema>;

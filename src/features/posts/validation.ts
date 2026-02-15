import { customRequiredString } from "@/lib/validation";
import { z } from "zod";

export const createPostSchema = z.object({
  content: customRequiredString("Post content is required"),
  mediaIds: z.array(z.string()).max(5, "You can post up to 5 attachments"),
});
export type CreatePostValues = z.infer<typeof createPostSchema>;

export const commentSchema = z.object({
  content: customRequiredString("Comment content is required"),
});
export type CommentValues = z.infer<typeof commentSchema>;

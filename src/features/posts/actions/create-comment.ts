"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "../validation";

export const createComment = async (content: string, postId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  const { content: validatedContent } = commentSchema.parse({ content });

  const comment = await prisma.comment.create({
    data: {
      userId: user.id,
      postId,
      content: validatedContent,
    },
    include: {
      user: true,
    },
  });

  return comment;
};

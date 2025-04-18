"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const createComment = async (content: string, postId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  if (!content) throw new Error("Comment is required");

  const comment = await prisma.comment.create({
    data: {
      userId: user.id,
      postId,
      content,
    },
    include: {
      user: true,
    },
  });

  return comment;
};

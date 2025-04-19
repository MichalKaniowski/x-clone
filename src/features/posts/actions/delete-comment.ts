"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserDataSelect } from "@/types";

export const deleteComment = async (commentId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment || user.id !== comment.userId) {
    throw new Error("Unathorized");
  }

  const deletedComment = await prisma.comment.delete({
    where: { id: commentId },
    include: {
      user: {
        select: getUserDataSelect(),
      },
    },
  });

  return deletedComment;
};

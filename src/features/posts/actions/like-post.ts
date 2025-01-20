"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const likePost = async (postId: string) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unathorized");

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: user.id,
      postId,
    },
  });

  if (existingLike) {
    const deletedLike = await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return deletedLike;
  }

  const like = await prisma.like.create({
    data: {
      userId: user.id,
      postId,
    },
  });

  return like;
};

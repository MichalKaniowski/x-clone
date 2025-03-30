"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const toggleBookmark = async (postId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unathorized");

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      userId: user.id,
      postId,
    },
  });

  if (bookmark) {
    const deletedBookmark = await prisma.bookmark.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    return deletedBookmark;
  }

  const createdBookmark = await prisma.bookmark.create({
    data: {
      userId: user.id,
      postId,
    },
  });

  return createdBookmark;
};

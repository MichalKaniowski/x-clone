"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const likePost = async (postId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unathorized");

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: user.id,
      postId,
    },
  });

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      userId: true,
    },
  });
  if (!post) throw new Error("Post not found");

  if (existingLike) {
    const [deletedLike] = await prisma.$transaction([
      prisma.like.deleteMany({
        where: {
          id: existingLike.id,
        },
      }),
      prisma.notification.deleteMany({
        where: {
          issuerId: user.id,
          recipientId: post.userId,
          postId,
          type: "LIKE",
        },
      }),
    ]);

    return deletedLike;
  }

  const [like] = await prisma.$transaction([
    prisma.like.create({
      data: {
        userId: user.id,
        postId,
      },
    }),
    ...(user.id !== post.userId
      ? [
          prisma.notification.create({
            data: {
              issuerId: user.id,
              recipientId: post.userId,
              postId,
              type: "LIKE",
            },
          }),
        ]
      : []),
  ]);

  return like;
};

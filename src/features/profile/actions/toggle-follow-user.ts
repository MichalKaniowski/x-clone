"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const toggleFollowUser = async (userId: string) => {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) throw new Error("Unauthorized");

  const existingFollow = await prisma.follower.findFirst({
    where: {
      followerId: loggedInUser.id,
      followingId: userId,
    },
  });

  if (existingFollow) {
    const [follow] = await prisma.$transaction([
      prisma.follower.deleteMany({
        where: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      }),
      prisma.notification.deleteMany({
        where: {
          issuerId: loggedInUser.id,
          recipientId: userId,
          type: "FOLLOW",
        },
      }),
    ]);

    return follow;
  }

  const [createdFollow] = await prisma.$transaction([
    prisma.follower.create({
      data: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
    }),
    prisma.notification.create({
      data: {
        issuerId: loggedInUser.id,
        recipientId: userId,
        type: "FOLLOW",
      },
    }),
  ]);

  return createdFollow;
};

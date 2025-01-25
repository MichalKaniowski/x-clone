"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export const followUser = async (userId: string) => {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) throw new Error("Unathorized");

  const existingFollow = await prisma.follower.findFirst({
    where: {
      followerId: loggedInUser.id,
      followingId: userId,
    },
  });

  if (existingFollow) {
    const follow = await prisma.follower.delete({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      },
    });
    return follow;
  }

  const createdFollow = await prisma.follower.create({
    data: {
      followerId: loggedInUser.id,
      followingId: userId,
    },
  });

  return createdFollow;
};

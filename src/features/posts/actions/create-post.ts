"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPostDataInclude } from "@/types";
import { createPostSchema, CreatePostValues } from "./../validation";

export const createPost = async (data: CreatePostValues) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(data);

  const createdPost = await prisma.post.create({
    data: {
      userId: user.id,
      content,
      attachments: { connect: mediaIds.map((id) => ({ id })) },
    },
    include: getPostDataInclude(user.id),
  });

  return createdPost;
};

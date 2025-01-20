"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PostData, postDataInclude } from "@/types";
import { createPostSchema, CreatePostValues } from "./../validation";

export const createPost = async (data: CreatePostValues): Promise<PostData> => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unathorized");

  const validatedData = createPostSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("Invalid data");
  }

  const createdPost = await prisma.post.create({
    data: {
      userId: user.id,
      content: validatedData.data.content,
    },
    include: postDataInclude,
  });

  return createdPost;
};

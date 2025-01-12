"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { createPostSchema, CreatePostValues } from "./../validation";

export const createPost = async (data: CreatePostValues) => {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Unathorzied" };

    const validatedData = createPostSchema.safeParse(data);

    if (!validatedData.success) {
      return { error: "There was an error validating your data" };
    }

    const createdPost = await prisma.post.create({
      data: {
        userId: user.id,
        content: validatedData.data.content,
      },
    });

    return { post: createdPost };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const deletePost = async (postId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unathorized");

  const post = await prisma.post.findFirst({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unathorized");

  const deletedPost = await prisma.post.delete({ where: { id: postId } });
  return deletedPost;
};

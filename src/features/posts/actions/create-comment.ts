"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUserDataSelect, PostData } from "@/types";
import { commentSchema } from "../validation";

export const createComment = async (content: string, post: PostData) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  const { content: validatedContent } = commentSchema.parse({ content });

  const [comment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        userId: user.id,
        postId: post.id,
        content: validatedContent,
      },
      include: {
        user: { select: getUserDataSelect() },
      },
    }),
    ...(user.id !== post.userId
      ? [
          prisma.notification.create({
            data: {
              issuerId: user.id,
              recipientId: post.userId,
              postId: post.id,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);

  return comment;
};

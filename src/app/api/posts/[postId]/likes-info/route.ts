import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PostLikesInfo } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        likes: { where: { userId: user.id } },
        _count: { select: { likes: true } },
      },
    });

    if (!post)
      return Response.json({ error: "Post not found" }, { status: 404 });

    const data: PostLikesInfo = {
      likes: post._count.likes,
      isLikedByUser: post.likes.some((like) => like.userId === user.id),
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

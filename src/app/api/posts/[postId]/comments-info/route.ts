import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PostCommentsInfo, getPostDataInclude } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const postId = (await params).postId;
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: getPostDataInclude(user.id),
    });

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const data: PostCommentsInfo = {
      comments: post._count.comments,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

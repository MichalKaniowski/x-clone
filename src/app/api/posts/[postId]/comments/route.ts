import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CommentsPage, getUserDataSelect } from "@/types";
import { NextRequest } from "next/server";

const PAGE_SIZE = 5;

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const postId = (await params).postId;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: getUserDataSelect(),
        },
      },
      orderBy: { createdAt: "asc" },
      cursor: cursor ? { id: cursor } : undefined,
      take: -PAGE_SIZE - 1,
    });

    const nextCursor = comments.length > PAGE_SIZE ? comments[0].id : null;

    const data: CommentsPage = {
      comments: comments.length > PAGE_SIZE ? comments.slice(1) : comments,
      nextCursor,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

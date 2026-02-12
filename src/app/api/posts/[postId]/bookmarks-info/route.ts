import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BookmarkInfo } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

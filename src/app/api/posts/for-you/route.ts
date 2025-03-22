import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/types";
import { NextRequest } from "next/server";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const posts = await prisma.post.findMany({
      where: { userId: { not: user.id } },
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
      take: PAGE_SIZE + 1,
    });

    const data: PostsPage = {
      posts: posts.slice(0, PAGE_SIZE),
      nextCursor: posts[PAGE_SIZE]?.id || null,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

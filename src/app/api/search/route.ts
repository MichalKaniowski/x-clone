import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/types";
import { NextRequest } from "next/server";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = q.split(" ").join(" & ");

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              search: searchQuery,
            },
          },
          {
            user: {
              displayName: {
                search: searchQuery,
              },
            },
          },
          {
            user: {
              username: {
                search: searchQuery,
              },
            },
          },
        ],
      },
      include: getPostDataInclude(user.id),
      cursor: cursor ? { id: cursor } : undefined,
      take: PAGE_SIZE + 1,
      orderBy: { createdAt: "desc" },
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

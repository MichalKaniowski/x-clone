import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPostDataInclude } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          include: getPostDataInclude(user.id),
        },
      },
    });

    return Response.json(dbUser);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

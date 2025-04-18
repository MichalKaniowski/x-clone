import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FollowInfo, getUserDataSelect } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;

    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: getUserDataSelect(loggedInUser.id),
    });

    if (!dbUser)
      return Response.json({ error: "User not found" }, { status: 404 });

    const data: FollowInfo = {
      followers: dbUser._count.followers,
      isFollowedByUser: dbUser.followers.some(
        (follower) => follower.followerId === loggedInUser.id
      ),
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notificationsInclude, NotificationsPage } from "@/types";
import { NextRequest } from "next/server";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const notifications = await prisma.notification.findMany({
      where: { recipientId: user.id },
      include: notificationsInclude,
      cursor: cursor ? { id: cursor } : undefined,
      take: PAGE_SIZE + 1,
      orderBy: { createdAt: "desc" },
    });

    const data: NotificationsPage = {
      notifications: notifications.slice(0, PAGE_SIZE),
      nextCursor: notifications[PAGE_SIZE]?.id || null,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NotificationsCountInfo } from "@/types";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const notificationsCount = await prisma.notification.count({
      where: { recipientId: user.id, read: false },
    });

    const data: NotificationsCountInfo = {
      unreadCount: notificationsCount,
    };

    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

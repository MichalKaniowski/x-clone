import { kyInstance } from "@/lib/ky";
import { cn } from "@/lib/utils";
import { NotificationsCountInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notificationsQueryFactory } from "../notifications-query-factory";

interface NotificationsMenuItemProps {
  item: {
    name: string;
    href: string;
    icon: JSX.Element;
  };
}

export const NotificationsMenuItem = ({ item }: NotificationsMenuItemProps) => {
  const { data } = useQuery({
    queryKey: notificationsQueryFactory.unreadNotificationsCount,
    queryFn: () =>
      kyInstance
        .get("/api/notifications/unread-count")
        .json<NotificationsCountInfo>(),
    refetchInterval: 30_000,
  });
  const pathname = usePathname();

  return (
    <Link
      href="/notifications"
      className={cn(
        "flex items-center gap-3 hover:opacity-70 p-3 rounded-xl",
        pathname === item.href && "bg-foreground/5"
      )}
    >
      <div className="relative">
        {item.icon}
        {!!data?.unreadCount && (
          <span className="-top-1 -right-1 absolute bg-primary px-1 rounded-full font-medium tabular-nums text-primary-foreground text-xs">
            {data.unreadCount}
          </span>
        )}
      </div>

      {item.name}
    </Link>
  );
};

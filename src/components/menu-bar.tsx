"use client";

import { NotificationsMenuItem } from "@/features/notifications/components/notifications-menu-item";
import { cn } from "@/lib/utils";
import { Bell, Bookmark, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_BAR_ITEMS = [
  { name: "Home", href: "/", icon: <House size={21} /> },
  { name: "Notifications", href: "/notifications", icon: <Bell size={21} /> },
  { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark size={21} /> },
];

export const MenuBar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-card px-3 py-2 rounded-xl top-[5.25rem] sticky h-fit">
      {MENU_BAR_ITEMS.map((item) => {
        if (item.name !== "Notifications") {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 hover:opacity-70 p-3 rounded-xl",
                pathname === item.href && "bg-foreground/5",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        }

        return <NotificationsMenuItem key={item.name} item={item} />;
      })}
    </div>
  );
};

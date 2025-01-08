import { Bell, Bookmark, House, Mail } from "lucide-react";

const MENU_BAR_ITEMS = [
  { name: "Home", href: "/", icon: <House size={21} /> },
  { name: "Notifications", href: "/notifications", icon: <Bell size={21} /> },
  { name: "Messages", href: "/messages", icon: <Mail size={21} /> },
  { name: "Bookmarks", href: "/bookmarks", icon: <Bookmark size={21} /> },
];

export const MenuBar = () => {
  return (
    <div className="bg-card px-3 py-2 rounded-xl">
      {MENU_BAR_ITEMS.map((item) => {
        return (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 hover:opacity-70 p-3"
          >
            {item.icon}
            {item.name}
          </a>
        );
      })}
    </div>
  );
};

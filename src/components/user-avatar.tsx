import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  size?: number;
  avatarUrl?: string | null;
  className?: string;
}

export const UserAvatar = ({
  size = 20,
  avatarUrl,
  className,
}: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || "/images/avatar-placeholder.png"}
      alt="Avatar"
      width={size}
      height={size}
      className={cn("rounded-full", className)}
    />
  );
};

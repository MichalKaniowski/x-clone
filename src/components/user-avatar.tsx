import Image from "next/image";

interface UserAvatarProps {
  size?: number;
  avatarUrl?: string | null;
}

export const UserAvatar = ({ size = 20, avatarUrl }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || "/images/avatar-placeholder.png"}
      alt="Avatar"
      width={size}
      height={size}
      className="rounded-full"
    />
  );
};

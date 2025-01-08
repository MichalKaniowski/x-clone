import Image from "next/image";

export const UserAvatar = ({ size = 20 }: { size?: number }) => {
  return (
    <Image
      src="/images/avatar-placeholder.png"
      alt="Avatar"
      width={size}
      height={size}
      className="rounded-full"
    />
  );
};

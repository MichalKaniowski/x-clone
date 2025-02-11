"use client";

import { UserData } from "@/types";
import { useFollowInfo } from "../hooks/use-follow-info";

export const ProfileStats = ({ user }: { user: UserData }) => {
  const { data: followData } = useFollowInfo(user);

  return (
    <div className="flex gap-3">
      <span>Posts: {user._count.posts}</span>
      <span>Followers: {followData.followers}</span>
    </div>
  );
};

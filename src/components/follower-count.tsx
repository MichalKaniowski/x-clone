"use client";

import { useFollowInfo } from "@/features/profile/hooks/use-follow-info";
import { formatNumber } from "@/lib/utils";
import { UserData } from "@/types";

interface FollowerCountProps {
  user: UserData;
}

export const FollowerCount = ({ user }: FollowerCountProps) => {
  const { data } = useFollowInfo(user);

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
};

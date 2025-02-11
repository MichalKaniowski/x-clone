"use client";

import { Button } from "@/components/ui/primitives/button";
import { UserData } from "@/types";
import { useFollowInfo } from "../hooks/use-follow-info";
import { useFollowUser } from "../hooks/use-follow-user";

export const FollowButton = ({ user }: { user: UserData }) => {
  const { data } = useFollowInfo(user);
  const { mutate } = useFollowUser(user.id);

  return (
    <Button onClick={() => mutate(user.id)}>
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

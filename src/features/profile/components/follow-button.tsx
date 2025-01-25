"use client";

import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/primitives/button";
import { UserData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { followUser } from "../actions/follow-user";

export const FollowButton = ({ user }: { user: UserData }) => {
  const { user: loggedInUser } = useSession();
  const isFollowing = user.followers.some(
    (follower) => follower.followerId === loggedInUser.id
  );
  const { isPending, mutate } = useMutation({
    mutationFn: followUser,
  });

  return (
    <Button onClick={() => mutate(user.id)} disabled={isPending}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

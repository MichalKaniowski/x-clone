"use client";

import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/primitives/button";
import { useFollowUser } from "@/features/posts/hooks/use-follow-user";
import { postsQueryFactory } from "@/features/posts/posts-query-factory";
import kyInstance from "@/lib/ky";
import { FollowInfo, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const FollowButton = ({ user }: { user: UserData }) => {
  const { user: loggedInUser } = useSession();
  const { data } = useQuery({
    queryKey: postsQueryFactory.getFollowInfo(user.id),
    queryFn: () =>
      kyInstance.get(`/api/users/${user.id}/follow-info`).json<FollowInfo>(),
    initialData: {
      followers: user._count.followers,
      isFollowedByUser: user.followers.some(
        (follower) => follower.followerId === loggedInUser.id
      ),
    },
    staleTime: Infinity,
  });
  const { mutate } = useFollowUser(user.id);

  return (
    <Button onClick={() => mutate(user.id)}>
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

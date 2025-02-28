import { useSession } from "@/components/providers/session-provider";
import kyInstance from "@/lib/ky";
import { FollowInfo, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { profileQueryFactory } from "../profile-query-factory";

export const useFollowInfo = (user: UserData) => {
  const { user: loggedInUser } = useSession();

  // this will never be called, it's for making state managment easier
  return useQuery({
    queryKey: profileQueryFactory.getFollowInfo(user.id),
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
};

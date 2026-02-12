import { toggleFollowUser } from "@/features/profile/actions/toggle-follow-user";
import { FollowInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQueryFactory } from "../profile-query-factory";

export const useFollowUser = (userId: string) => {
  const queryClient = useQueryClient();
  const queryKey = profileQueryFactory.getFollowInfo(userId);

  return useMutation({
    mutationFn: toggleFollowUser,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousState = queryClient.getQueryData<FollowInfo>(queryKey);

      queryClient.setQueryData<FollowInfo>(queryKey, () => {
        if (!previousState) return;

        return {
          isFollowedByUser: !previousState.isFollowedByUser,
          followers:
            previousState.followers + (previousState.isFollowedByUser ? -1 : 1),
        };
      });
      return { previousState };
    },
    onError: async (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
    },
  });
};

import { postsQueryFactory } from "@/features/posts/posts-query-factory";
import { followUser } from "@/features/profile/actions/follow-user";
import { FollowInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollowUser = (userId: string) => {
  const queryClient = useQueryClient();
  const queryKey = postsQueryFactory.getFollowInfo(userId);

  return useMutation({
    mutationFn: followUser,
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

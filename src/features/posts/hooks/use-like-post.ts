import { PostLikesInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost as likePostAction } from "../actions/like-post";
import { postsQueryFactory } from "../posts-query-factory";

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();
  const queryKey = postsQueryFactory.getPostLikesInfo(postId);

  return useMutation({
    mutationFn: likePostAction,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousState = queryClient.getQueryData<PostLikesInfo>(queryKey);

      queryClient.setQueryData<PostLikesInfo>(queryKey, () => {
        return {
          likes: previousState?.isLikedByUser
            ? previousState.likes - 1
            : (previousState?.likes || 0) + 1,
          isLikedByUser: !previousState?.isLikedByUser,
        };
      });

      return { previousState };
    },
    onError: async (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
    },
  });
};

import { LikeInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost as likePostAction } from "../actions/like-post";

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePostAction,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["like-info", postId] });
      const previousState = queryClient.getQueryData<LikeInfo>([
        "like-info",
        postId,
      ]);

      queryClient.setQueryData<LikeInfo>(["like-info", postId], () => {
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
      queryClient.setQueryData(["like-info", postId], context?.previousState);
    },
  });
};

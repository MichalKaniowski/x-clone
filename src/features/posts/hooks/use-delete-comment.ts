import { CommentData, CommentsPage } from "@/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment } from "../actions/delete-comment";
import { postsQueryFactory } from "../posts-query-factory";

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: async (deletedComment: CommentData) => {
      const queryKey = postsQueryFactory.getComments(postId);

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                comments: page.comments.filter(
                  (comment) => comment.id !== deletedComment.id
                ),
              };
            }),
          };
        }
      );
    },
  });
};

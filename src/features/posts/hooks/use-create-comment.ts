import { CommentsPage, PostCommentsInfo, PostData } from "@/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createComment } from "../actions/create-comment";
import { postsQueryFactory } from "../posts-query-factory";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comment, post }: { comment: string; post: PostData }) =>
      createComment(comment, post),
    onSuccess: async (createdComment) => {
      const commentsQueryKey = postsQueryFactory.getComments(
        createdComment.postId,
      );
      const postCommentsInfoQueryKey = postsQueryFactory.getPostCommentsInfo(
        createdComment.postId,
      );
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: [commentsQueryKey],
        }),
        queryClient.cancelQueries({
          queryKey: [postCommentsInfoQueryKey],
        }),
      ]);

      queryClient.setQueryData<PostCommentsInfo>(
        postCommentsInfoQueryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            comments: oldData.comments + 1,
          };
        },
      );

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        commentsQueryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            ...oldData,
            pages: oldData.pages.map((page, idx) => {
              if (idx === oldData.pages.length - 1) {
                return {
                  ...page,
                  comments: [createdComment, ...page.comments],
                };
              }

              return page;
            }),
          };
        },
      );
    },
  });
};

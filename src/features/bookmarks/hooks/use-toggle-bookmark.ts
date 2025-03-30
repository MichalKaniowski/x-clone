import { BookmarkInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookmark } from "../actions/toggle-bookmark";
import { bookmarksQueryFactory } from "../bookmarks-query-factory";

export const useToggleBookmark = (postId: string) => {
  const queryClient = useQueryClient();
  const queryKey = bookmarksQueryFactory.getBookmarkInfo(postId);

  return useMutation({
    mutationFn: toggleBookmark,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, (oldData) => {
        return {
          isBookmarkedByUser: !oldData?.isBookmarkedByUser,
        };
      });

      return { previousState };
    },
    onError: async (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
    },
  });
};

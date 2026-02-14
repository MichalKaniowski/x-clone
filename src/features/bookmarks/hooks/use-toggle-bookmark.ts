import { toggleBookmark } from "@/features/bookmarks/actions/toggle-bookmark";
import { bookmarksQueryFactory } from "@/features/bookmarks/bookmarks-query-factory";
import { BookmarkInfo, PostsPage } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleBookmark = (postId: string) => {
  const queryClient = useQueryClient();
  const bookmarkInfoQueryKey = bookmarksQueryFactory.getBookmarkInfo(postId);

  return useMutation({
    mutationFn: toggleBookmark,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: bookmarkInfoQueryKey });

      const previousBookmarkInfo =
        queryClient.getQueryData<BookmarkInfo>(bookmarkInfoQueryKey);

      const isBookmarked = previousBookmarkInfo?.isBookmarkedByUser ?? false;

      queryClient.setQueryData<BookmarkInfo>(bookmarkInfoQueryKey, {
        isBookmarkedByUser: !isBookmarked,
      });

      if (isBookmarked) {
        await queryClient.cancelQueries({
          queryKey: bookmarksQueryFactory.bookmarks,
        });

        queryClient.setQueriesData<PostsPage>(
          { queryKey: bookmarksQueryFactory.bookmarks },
          (oldData) => {
            if (!oldData || !oldData.posts) return oldData;

            return {
              ...oldData,
              posts: oldData.posts.filter((post) => post.id !== postId),
            };
          }
        );
      }

      toast.success(
        `Post ${isBookmarked ? "removed from" : "added to"} bookmarks`
      );

      return { previousBookmarkInfo, isBookmarked };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        bookmarkInfoQueryKey,
        context?.previousBookmarkInfo
      );
      toast.error("Failed to update bookmark");
    },
    onSuccess: async (_, __, context) => {
      if (!context?.isBookmarked) {
        queryClient.removeQueries({
          queryKey: bookmarksQueryFactory.bookmarks,
        });
      }
    },
  });
};

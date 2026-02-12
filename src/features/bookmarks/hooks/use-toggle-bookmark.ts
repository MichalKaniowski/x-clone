import { toggleBookmark } from "@/features/bookmarks/actions/toggle-bookmark";
import { bookmarksQueryFactory } from "@/features/bookmarks/bookmarks-query-factory";
import { BookmarkInfo, PostData, PostsPage } from "@/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleBookmark = (postId: string) => {
  const queryClient = useQueryClient();
  const bookmarkInfoQueryKey = bookmarksQueryFactory.getBookmarkInfo(postId);

  return useMutation({
    mutationFn: toggleBookmark,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: bookmarkInfoQueryKey });
      await queryClient.cancelQueries({
        queryKey: bookmarksQueryFactory.bookmarks,
      });

      const previousBookmarkInfo =
        queryClient.getQueryData<BookmarkInfo>(bookmarkInfoQueryKey);
      const previousBookmarks = queryClient.getQueryData<
        InfiniteData<PostsPage, string | null>
      >(bookmarksQueryFactory.bookmarks);

      toast.success(
        `Post ${previousBookmarkInfo?.isBookmarkedByUser ? "removed from" : "added to"} bookmarks`,
      );

      queryClient.setQueryData<BookmarkInfo>(bookmarkInfoQueryKey, {
        isBookmarkedByUser: !previousBookmarkInfo?.isBookmarkedByUser,
      });

      if (!previousBookmarkInfo?.isBookmarkedByUser) {
        const feedQueries = queryClient.getQueriesData<
          InfiniteData<PostsPage, string | null>
        >({
          predicate: (query) => query.queryKey[0] === "post-feed",
        });

        let postData: PostData | undefined;

        for (const [_, data] of feedQueries) {
          if (data) {
            for (const page of data.pages) {
              postData = page.posts.find((p) => p.id === postId);
              if (postData) break;
            }
          }
          if (postData) break;
        }

        if (postData) {
          queryClient.setQueryData<InfiniteData<PostsPage, string | null>>(
            bookmarksQueryFactory.bookmarks,
            (oldData) => {
              if (!oldData) return oldData;
              return {
                pageParams: oldData.pageParams,
                pages: oldData.pages.map((page, idx) =>
                  idx === 0
                    ? {
                        nextCursor: page.nextCursor,
                        posts: [postData, ...page.posts],
                      }
                    : page,
                ),
              };
            },
          );
        }
      }

      return { previousBookmarkInfo, previousBookmarks };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        bookmarkInfoQueryKey,
        context?.previousBookmarkInfo,
      );
      queryClient.setQueryData(
        bookmarksQueryFactory.bookmarks,
        context?.previousBookmarks,
      );
    },
  });
};

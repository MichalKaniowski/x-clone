import { kyInstance } from "@/lib/ky";
import { PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { bookmarksQueryFactory } from "../bookmarks-query-factory";

export const useBookmarkPosts = () => {
  return useInfiniteQuery({
    queryKey: bookmarksQueryFactory.bookmarks,
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/bookmarks`,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

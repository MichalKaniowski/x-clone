import { kyInstance } from "@/lib/ky";
import { Feed, PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = (feed: Feed) => {
  return useInfiniteQuery({
    queryKey: feed.queryKey,
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          feed.apiUrl,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

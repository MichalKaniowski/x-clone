import kyInstance from "@/lib/ky";
import { Feed, PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postsQueryFactory } from "../posts-query-factory";

export const usePosts = (feed: Feed) => {
  return useInfiniteQuery({
    queryKey: postsQueryFactory.getPosts(feed),
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          feed === "for-you" ? "/api/posts/for-you" : "/api/posts/following",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

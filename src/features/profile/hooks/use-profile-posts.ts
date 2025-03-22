import { postsQueryFactory } from "@/features/posts/posts-query-factory";
import { kyInstance } from "@/lib/ky";
import { PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProfilePosts = (userId: string) => {
  return useInfiniteQuery({
    queryKey: postsQueryFactory.getProfilePosts(userId),
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/users/${userId}/posts`,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

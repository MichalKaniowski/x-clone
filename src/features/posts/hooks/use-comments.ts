import { kyInstance } from "@/lib/ky";
import { CommentsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/${postId}/comments`,
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<CommentsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
  });
};

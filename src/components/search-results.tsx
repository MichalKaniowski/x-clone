"use client";

import { InfiniteScrollingContainer } from "@/components/infinite-scrolling-container";
import { Post } from "@/features/posts/components/post";
import { kyInstance } from "@/lib/ky";
import { PostData, PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  query: string;
}

export const SearchResults = ({ query }: SearchResultsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["post-feed", "search", query],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/search", {
          searchParams: {
            q: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    gcTime: 0,
  });

  const numberOfPosts = data?.pages.flatMap((page) => page.posts).length || 0;

  return (
    <InfiniteScrollingContainer
      onBottomReached={fetchNextPage}
      className="py-2"
    >
      <div className="space-y-3">
        {data?.pages.map((page) =>
          page.posts.map((post: PostData) => <Post key={post.id} post={post} />)
        )}
      </div>
      <div className="mt-8">
        {isFetching && <Loader2 className="mx-auto animate-spin" />}
        {!isFetching && !hasNextPage && (
          <>
            {numberOfPosts > 0 ? (
              <p className="text-center">No more posts to load</p>
            ) : (
              <p className="text-center">No posts to load</p>
            )}
          </>
        )}
      </div>
    </InfiniteScrollingContainer>
  );
};

"use client";

import InfiniteScrollingContainer from "@/components/infinite-scrolling-container";
import kyInstance from "@/lib/ky";
import { PostData, PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { postsQueryFactory } from "../posts-query-factory";
import { Post } from "./post";

export const Posts = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: postsQueryFactory.posts,
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

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
          <p className="text-center">No more posts to load</p>
        )}
      </div>
    </InfiniteScrollingContainer>
  );
};

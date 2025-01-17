"use client";

import InfiniteScrollingContainer from "@/components/infinite-scrolling-container";
import { PostData } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { postsQueryFactory } from "../posts-query-factory";
import { Post } from "./post";

export const Posts = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: postsQueryFactory.getPosts,
    queryFn: ({ pageParam }) =>
      axios
        .get("/api/posts", pageParam ? { params: { cursor: pageParam } } : {})
        .then((res) => res.data),
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

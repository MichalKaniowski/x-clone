"use client";

import { InfiniteScrollingContainer } from "@/components/infinite-scrolling-container";
import { Feed, PostData } from "@/types";
import { Loader2 } from "lucide-react";
import { usePosts } from "../hooks/use-posts";
import { Post } from "./post";

interface PostsProps {
  feed: Feed;
}

export const Posts = ({ feed }: PostsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = usePosts(feed);
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

"use client";

import InfiniteScrollingContainer from "@/components/infinite-scrolling-container";
import { Post } from "@/features/posts/components/post";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const ProfilePosts = ({ userId }: { userId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["post-feed", "user-posts", userId],
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
  const posts = data?.pages.flatMap((page) => page.posts);

  return (
    <InfiniteScrollingContainer
      onBottomReached={fetchNextPage}
      className="space-y-3"
    >
      {posts?.map((post) => <Post key={post.id} post={post} />)}
      <div className="mt-8">
        {isFetching && <Loader2 className="mx-auto animate-spin" />}
        {!isFetching && !hasNextPage && (
          <p className="text-center">No more posts to load</p>
        )}
      </div>
    </InfiniteScrollingContainer>
  );
};

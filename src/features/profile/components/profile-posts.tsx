"use client";

import { InfiniteScrollingContainer } from "@/components/infinite-scrolling-container";
import { Post } from "@/features/posts/components/post";
import { PostSkeletonLoader } from "@/features/posts/components/post-skeleton";
import { Loader2 } from "lucide-react";
import { useProfilePosts } from "../hooks/use-profile-posts";

export const ProfilePosts = ({ userId }: { userId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } =
    useProfilePosts(userId);
  const posts = data?.pages.flatMap((page) => page.posts);
  const isLoadingInitial = isPending && !data;

  return (
    <InfiniteScrollingContainer
      onBottomReached={fetchNextPage}
      className="space-y-3"
    >
      {posts?.map((post) => <Post key={post.id} post={post} />)}

      {isLoadingInitial && <PostSkeletonLoader />}

      <div className="mt-8">
        {isFetching && !isLoadingInitial && (
          <Loader2 className="mx-auto animate-spin" />
        )}
        {!isFetching && !hasNextPage && (
          <p className="text-center">No more posts to load</p>
        )}
      </div>
    </InfiniteScrollingContainer>
  );
};

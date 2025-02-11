"use client";

import InfiniteScrollingContainer from "@/components/infinite-scrolling-container";
import { Post } from "@/features/posts/components/post";
import { Loader2 } from "lucide-react";
import { useProfilePosts } from "../hooks/use-profile-posts";

export const ProfilePosts = ({ userId }: { userId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useProfilePosts(userId);
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

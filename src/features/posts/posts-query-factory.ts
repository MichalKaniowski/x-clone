import { Feed } from "@/types";

export const postsQueryFactory = {
  createPost: ["post-feed"],
  deletePost: ["post-feed"],
  getPosts: (feed: Feed) => ["post-feed", feed],
  getProfilePosts: (userId: string) => ["post-feed", "user-posts", userId],
  getLikeInfo: (postId: string) => ["like-info", postId],
};

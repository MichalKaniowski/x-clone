export const postsQueryFactory = {
  createPost: ["post-feed"],
  deletePost: ["post-feed"],
  posts: ["post-feed"],
  getProfilePosts: (userId: string) => ["post-feed", "user-posts", userId],
  getFollowInfo: (userId: string) => ["follow-info", userId],
  getLikeInfo: (postId: string) => ["like-info", postId],
};

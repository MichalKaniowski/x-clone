export const postsQueryFactory = {
  createPost: ["post-feed"],
  deletePost: ["post-feed"],
  posts: ["post-feed"],
  getProfilePosts: (userId: string) => ["post-feed", "user-posts", userId],
  getLikeInfo: (postId: string) => ["like-info", postId],
};

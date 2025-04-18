export const postsQueryFactory = {
  createPost: ["post-feed"],
  deletePost: ["post-feed"],
  getProfilePosts: (userId: string) => ["post-feed", "user-posts", userId],
  getPostLikesInfo: (postId: string) => ["like-info", postId],
  getPostCommentsInfo: (commentId: string) => ["comments-info", commentId],
  getComments: (postId: string) => ["comments", postId],
};

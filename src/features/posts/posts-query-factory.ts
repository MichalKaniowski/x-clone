export const postsQueryFactory = {
  createPost: ["post-feed"],
  deletePost: ["post-feed"],
  getPosts: ["post-feed"],
  getLikeInfo: (postId: string) => ["like-info", postId],
};

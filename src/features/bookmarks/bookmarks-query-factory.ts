export const bookmarksQueryFactory = {
  bookmarks: ["post-feed", "bookmarks"],
  getBookmarkInfo: (postId: string) => ["bookmark-info", postId],
};

export const bookmarksQueryFactory = {
  getBookmarkInfo: (postId: string) => ["bookmark-info", postId],
  bookmarks: ["bookmarks"],
};

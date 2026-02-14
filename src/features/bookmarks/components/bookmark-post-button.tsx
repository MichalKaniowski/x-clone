import { kyInstance } from "@/lib/ky";
import { cn } from "@/lib/utils";
import { BookmarkInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { useTheme } from "next-themes";
import { bookmarksQueryFactory } from "../bookmarks-query-factory";
import { useToggleBookmark } from "../hooks/use-toggle-bookmark";

interface BookmarkPostButtonProps {
  bookmarkInfo: BookmarkInfo;
  postId: string;
}

export const BookmarkPostButton = ({
  bookmarkInfo,
  postId,
}: BookmarkPostButtonProps) => {
  // this will never be called, it's for making state managment easier
  const { data: bookmarkInfoData } = useQuery({
    queryKey: bookmarksQueryFactory.getBookmarkInfo(postId),
    queryFn: () =>
      kyInstance
        .get(`/api/posts/${postId}/bookmarks-info`)
        .json<BookmarkInfo>(),
    initialData: bookmarkInfo,
    staleTime: Infinity,
  });
  const { mutate: toggleBookmark } = useToggleBookmark(postId);
  const { theme } = useTheme();

  return (
    <button>
      <Bookmark
        onClick={() => toggleBookmark(postId)}
        className={cn(bookmarkInfoData.isBookmarkedByUser && "fill-green-500")}
        size={17}
        color={theme === "dark" ? "white" : "gray"}
      />
    </button>
  );
};

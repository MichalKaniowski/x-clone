import { kyInstance } from "@/lib/ky";
import { cn } from "@/lib/utils";
import { BookmarkInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { bookmarksQueryFactory } from "../bookmarks-query-factory";
import { useToggleBookmark } from "../hooks/use-toggle-bookmark";

interface BookmarkButtonProps {
  bookmarkInfo: BookmarkInfo;
  postId: string;
}

export const BookmarkButton = ({
  bookmarkInfo,
  postId,
}: BookmarkButtonProps) => {
  // this will never be called, it's for making state managment easier
  const { data: bookmarkInfoData } = useQuery({
    queryKey: bookmarksQueryFactory.getBookmarkInfo(postId),
    queryFn: () =>
      kyInstance
        .get(`/api/posts/${postId}/isBookmarkedByUser`)
        .json<BookmarkInfo>(),
    initialData: bookmarkInfo,
    staleTime: Infinity,
  });

  const { mutate: toggleBookmark } = useToggleBookmark(postId);

  return (
    <button>
      <Bookmark
        onClick={() => toggleBookmark(postId)}
        className={cn(bookmarkInfoData.isBookmarkedByUser && "fill-green-500")}
        size={17}
      />
    </button>
  );
};

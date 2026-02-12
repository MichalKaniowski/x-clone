import { Card, CardHeader, CardTitle } from "@/components/ui/primitives/card";
import { bookmarksQueryFactory } from "@/features/bookmarks/bookmarks-query-factory";
import { Posts } from "@/features/posts/components/posts";
import { Feed } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
};

const feed: Feed = {
  queryKey: bookmarksQueryFactory.bookmarks,
  apiUrl: "/api/bookmarks",
};

export default function BookmarksPage() {
  return (
    <div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-xl">Bookmarks</CardTitle>
        </CardHeader>
      </Card>
      <Posts feed={feed} />
    </div>
  );
}

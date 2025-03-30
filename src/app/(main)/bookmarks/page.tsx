import { Card, CardHeader, CardTitle } from "@/components/ui/primitives/card";
import { Posts } from "@/features/posts/components/posts";
import { Feed } from "@/types";

const feed: Feed = { queryKey: ["bookmark-feed"], apiUrl: "/api/bookmarks" };

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

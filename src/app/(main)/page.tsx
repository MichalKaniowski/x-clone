import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/primitives/tabs";
import { CreatePostForm } from "@/features/posts/components/create-post-form";
import { Posts } from "@/features/posts/components/posts";
import { Feed } from "@/types";

const forYouFeed: Feed = {
  queryKey: ["post-feed", "for-you"],
  apiUrl: "/api/posts/for-you",
};
const followingFeed: Feed = {
  queryKey: ["post-feed", "following"],
  apiUrl: "/api/posts/following",
};

export default async function HomePage() {
  return (
    <div className="flex-[2]">
      <CreatePostForm />

      <div className="mt-4">
        <Tabs defaultValue="for-you">
          <TabsList className="flex w-full h-10">
            <TabsTrigger value="for-you" className="flex-1">
              For you
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you">
            <Posts feed={forYouFeed} />
          </TabsContent>

          <TabsContent value="following">
            <Posts feed={followingFeed} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

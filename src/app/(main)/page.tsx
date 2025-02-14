import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/primitives/tabs";
import { CreatePostForm } from "@/features/posts/components/create-post-form";
import { Posts } from "@/features/posts/components/posts";

export default async function HomePage() {
  return (
    <div className="flex-[2]">
      <CreatePostForm />

      <div className="mt-4">
        <Tabs defaultValue="following">
          <TabsList className="flex w-full h-10">
            <TabsTrigger value="for-you" className="flex-1">
              For you
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you">
            <Posts feed="for-you" />
          </TabsContent>

          <TabsContent value="following">
            <Posts feed="following" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { MenuBar } from "@/components/menu-bar";
import { WhoToFollow } from "@/components/who-to-follow";
import { CreatePostForm } from "@/features/posts/components/create-post-form";
import { Posts } from "@/features/posts/components/posts";

export default async function HomePage() {
  return (
    <div className="mx-auto px-3 py-4 max-w-7xl">
      <div className="flex gap-4 w-full">
        <div className="md:block flex-1 hidden">
          <MenuBar />
        </div>

        <div className="flex-[2]">
          <CreatePostForm />

          <div className="mt-4">
            <Posts />
          </div>
        </div>

        <div className="lg:block flex-1 hidden">
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
}

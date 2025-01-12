import { MenuBar } from "@/components/menu-bar";
import { WhoToFollow } from "@/components/who-to-follow";
import { CreatePostForm } from "@/features/posts/components/create-post-form";

export default function HomePage() {
  return (
    <div className="mx-auto px-3 py-4 max-w-7xl">
      <div className="flex gap-4 w-full">
        <div className="md:block flex-1 hidden">
          <MenuBar />
        </div>

        <div className="flex-[2]">
          <CreatePostForm />
          {/* posts */}
        </div>

        <div className="lg:block flex-1 hidden">
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
}

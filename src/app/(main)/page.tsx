import { CreatePostForm } from "@/features/posts/components/create-post-form";
import { Posts } from "@/features/posts/components/posts";

export default async function HomePage() {
  return (
    <div className="flex-[2]">
      <CreatePostForm />

      <div className="mt-4">
        <Posts />
      </div>
    </div>
  );
}

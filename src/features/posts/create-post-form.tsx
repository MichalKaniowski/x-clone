import { Button } from "@/components/ui/primitives/button";
import { Textarea } from "@/components/ui/primitives/textarea";
import { UserAvatar } from "@/components/user-avatar";

// maybe use tiptap for the input

export const CreatePostForm = () => {
  return (
    <div className="bg-card px-3 py-2 rounded-xl">
      <div className="flex items-center gap-3 mb-5">
        <UserAvatar size={34} />
        <Textarea rows={1} className="h-2" />
      </div>
      <div className="flex justify-end">
        <Button className="bg-primary px-5 rounded-xl">Post</Button>
      </div>
    </div>
  );
};

import { Card, CardContent, CardHeader } from "@/components/ui/primitives/card";
import { UserAvatar } from "@/components/user-avatar";
import { PostData } from "@/types";

export const Post = ({ post }: { post: PostData }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <UserAvatar avatarUrl={post.user.avatarUrl} size={34} />
          <div>
            <p className="font-semibold text-sm">{post.user.displayName}</p>
            <p className="text-xs">21 minutes ago</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm">{post.content}</CardContent>
    </Card>
  );
};

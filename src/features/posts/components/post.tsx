import { useSession } from "@/components/providers/session-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/primitives/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn, getTimeAgoString } from "@/lib/utils";
import { PostData } from "@/types";
import { Ellipsis, Trash } from "lucide-react";
import { useDeletePost } from "../hooks/use-delete-post";

export const Post = ({ post }: { post: PostData }) => {
  const { user } = useSession();
  const { mutate, isPending } = useDeletePost();

  return (
    <Card className={cn("relative group", isPending && "opacity-80")}>
      <div className="top-3 right-5 absolute opacity-0 group-hover:opacity-100 transition-opacity">
        {user.id === post.userId && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis size={22} />
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom">
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => mutate(post.id)}
                className="text-destructive hover:!text-destructive/80"
              >
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-3">
          <UserAvatar avatarUrl={post.user.avatarUrl} size={34} />
          <div>
            <p className="font-semibold text-sm">{post.user.displayName}</p>
            <p className="text-xs">{getTimeAgoString(post.createdAt)}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm">{post.content}</CardContent>
    </Card>
  );
};

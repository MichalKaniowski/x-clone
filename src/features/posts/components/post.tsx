import { useSession } from "@/components/providers/session-provider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/primitives/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn, getTimeAgoString } from "@/lib/utils";
import { PostData } from "@/types";
import { Bookmark, Ellipsis, MessageSquare, Trash } from "lucide-react";
import { useDeletePost } from "../hooks/use-delete-post";
import { LikePostButton } from "./like-post-button";
import { PostProfilePopover } from "./post-profile-popover";

export const Post = ({ post }: { post: PostData }) => {
  const { user } = useSession();
  const { mutate: deletePostMutate, isPending: deletePostPending } =
    useDeletePost();

  return (
    <Card className={cn("relative group", deletePostPending && "opacity-80")}>
      <div className="top-3 right-5 absolute opacity-0 group-hover:opacity-100 transition-opacity">
        {user.id === post.userId && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis size={22} />
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom">
              <DropdownMenuItem
                disabled={deletePostPending}
                onClick={() => deletePostMutate(post.id)}
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
          <PostProfilePopover
            TriggerComponent={
              <UserAvatar avatarUrl={post.user.avatarUrl} size={34} />
            }
            post={post}
          />
          <div>
            <a href={`/profile/${post.user.username}`}>
              <p className="font-semibold text-sm">{post.user.displayName}</p>
            </a>
            <a href={`/post/${post.id}`}>
              <p className="text-xs">{getTimeAgoString(post.createdAt)}</p>
            </a>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm">{post.content}</CardContent>

      <div className="!border-muted border-b" />
      <CardFooter className="p-3">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex items-center gap-3">
            <LikePostButton
              postId={post.id}
              initialState={{
                likes: post._count.likes,
                isLikedByUser: post.likes.some(
                  (like) => like.userId === user.id
                ),
              }}
            />
            <button className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span className="text-sm">3 comments</span>
            </button>
          </div>

          <button>
            <Bookmark size={17} />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

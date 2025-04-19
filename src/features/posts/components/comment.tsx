import { useSession } from "@/components/providers/session-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn, getTimeAgoString } from "@/lib/utils";
import { CommentData } from "@/types";
import { Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import { useDeleteComment } from "../hooks/use-delete-comment";
import { PostProfilePopover } from "./post-profile-popover";

export const Comment = ({
  postId,
  comment,
}: {
  postId: string;
  comment: CommentData;
}) => {
  const { user } = useSession();
  const { mutate: deleteCommentMutate, isPending: deleteCommentPending } =
    useDeleteComment(postId);

  return (
    <div
      className={cn(
        "group/comment relative flex items-center gap-3",
        deleteCommentPending && "opacity-60"
      )}
    >
      <div className="top-1 right-1 absolute opacity-0 group-hover:opacity-100 transition-opacity">
        {user.id === comment.user.id && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis size={18} />
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom">
              <DropdownMenuItem
                disabled={deleteCommentPending}
                onClick={() => deleteCommentMutate(comment.id)}
                className="text-destructive hover:!text-destructive/80"
              >
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <PostProfilePopover
        user={comment.user}
        TriggerComponent={
          <UserAvatar avatarUrl={comment.user.avatarUrl} size={34} />
        }
      />
      <div>
        <div className="space-x-1">
          <span className="inline-block font-semibold text-sm">
            <PostProfilePopover
              user={comment.user}
              TriggerComponent={<span>{comment.user.displayName}</span>}
            />
          </span>
          <Link href={`/post/${postId}`}>
            <span className="text-xs">
              {getTimeAgoString(comment.createdAt)}
            </span>
          </Link>
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

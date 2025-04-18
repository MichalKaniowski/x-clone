import { UserAvatar } from "@/components/user-avatar";
import { getTimeAgoString } from "@/lib/utils";
import { CommentData } from "@/types";
import Link from "next/link";
import { PostProfilePopover } from "./post-profile-popover";

export const Comment = ({
  postId,
  comment,
}: {
  postId: string;
  comment: CommentData;
}) => {
  return (
    <div className="flex items-center gap-3">
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
              TriggerComponent={
                // <UserAvatar avatarUrl={comment.user.avatarUrl} size={34} />
                <span>{comment.user.displayName}</span>
              }
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

import { UserAvatar } from "@/components/user-avatar";
import { getTimeAgoString } from "@/lib/utils";
import { CommentData } from "@/types";

export const Comment = ({ comment }: { comment: CommentData }) => {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar size={34} />
      <div>
        <div className="space-x-1">
          <span className="font-semibold text-sm">
            {comment.user.displayName}
          </span>
          <span className="text-xs">{getTimeAgoString(comment.createdAt)}</span>
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

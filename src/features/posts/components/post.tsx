"use client";

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
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { BookmarkPostButton } from "@/features/bookmarks/components/bookmark-post-button";
import { cn, getTimeAgoString } from "@/lib/utils";
import { PostData } from "@/types";
import { Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDeletePost } from "../hooks/use-delete-post";
import { LikePostButton } from "./like-post-button";
import { PostComments } from "./post-comments";
import { PostCommentsButton } from "./post-comments-button";
import { PostProfilePopover } from "./post-profile-popover";

export const Post = ({
  post,
  areCommentsOpenInitially = false,
}: {
  post: PostData;
  areCommentsOpenInitially?: boolean;
}) => {
  const { user } = useSession();
  const { mutate: deletePostMutate, isPending: deletePostPending } =
    useDeletePost();
  const [areCommentsOpen, setAreCommentsOpen] = useState(
    areCommentsOpenInitially
  );

  return (
    <Card className={cn("group relative", deletePostPending && "opacity-80")}>
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
            user={post.user}
          />
          <div>
            <PostProfilePopover
              TriggerComponent={
                <p className="font-semibold text-sm">{post.user.displayName}</p>
              }
              user={post.user}
            />
            <Link href={`/post/${post.id}`}>
              <p className="text-xs">{getTimeAgoString(post.createdAt)}</p>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm">{post.content}</CardContent>

      <Separator />

      <CardFooter className="block p-3">
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
            <PostCommentsButton
              postId={post.id}
              initialState={{ comments: post._count.comments }}
              toggleCommentsOpen={() =>
                setAreCommentsOpen((prevValue) => !prevValue)
              }
            />
          </div>

          <BookmarkPostButton
            postId={post.id}
            bookmarkInfo={{
              isBookmarkedByUser: post.bookmarks.some(
                (b) => b.userId === user.id
              ),
            }}
          />
        </div>

        {areCommentsOpen && (
          <div className="mt-4">
            <PostComments post={post} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

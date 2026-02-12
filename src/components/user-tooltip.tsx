"use client";

import { FollowUserButton } from "@/features/profile/components/follow-user-button";
import { UserData } from "@/types";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { FollowerCount } from "./follower-count";
import Linkify from "./linkify";
import { useSession } from "./providers/session-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/primitives/tooltip";
import { UserAvatar } from "./user-avatar";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export const UserTooltip = ({ children, user }: UserTooltipProps) => {
  const { user: loggedInUser } = useSession();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-3 px-1 py-2.5 md:min-w-52 max-w-80 break-words">
            <div className="flex justify-between items-center gap-2">
              <Link href={`/users/${user.username}`}>
                <UserAvatar size={70} avatarUrl={user.avatarUrl} />
              </Link>
              {loggedInUser.id !== user.id && <FollowUserButton user={user} />}
            </div>
            <div>
              <Link href={`/users/${user.username}`}>
                <div className="font-semibold text-lg hover:underline">
                  {user.displayName}
                </div>
                <div className="text-muted-foreground">@{user.username}</div>
              </Link>
            </div>
            {user.bio && (
              <Linkify>
                <div className="line-clamp-4 whitespace-pre-line">
                  {user.bio}
                </div>
              </Linkify>
            )}
            <FollowerCount user={user} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

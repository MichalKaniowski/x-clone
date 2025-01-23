import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "@/components/user-avatar";
import { PostData } from "@/types";
import { useRouter } from "next/navigation";

export const PostProfilePopover = ({
  TriggerComponent,
  post,
}: {
  TriggerComponent: React.ReactNode;
  post: PostData;
}) => {
  const user = post.user;
  const router = useRouter();

  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <div onClick={() => router.push(`/profile/${user.username}`)}>
          {TriggerComponent}
        </div>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={-200}>
        <UserAvatar avatarUrl={user.avatarUrl} size={46} />
        <a href={`/profile/${user.username}`}>
          <h3 className="inline-block mt-3 font-semibold">
            {user.displayName}
          </h3>
        </a>
        <a href={`/profile/${user.username}`} className="block">
          <p className="inline-block mb-4 text-muted-foreground text-sm">
            @{user.username}
          </p>
        </a>
        <p className="">Followers: 0</p>
      </HoverCardContent>
    </HoverCard>
  );
};

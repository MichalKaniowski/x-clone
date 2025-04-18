import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "@/components/user-avatar";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";

export const PostProfilePopover = ({
  TriggerComponent,
  user,
}: {
  TriggerComponent: React.ReactNode;
  user: UserData;
}) => {
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
        <p className="text-sm">Followers: {user._count.followers}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

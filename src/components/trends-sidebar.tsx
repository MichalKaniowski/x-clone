import { validateRequest } from "@/auth";
import { FollowUserButton } from "@/features/profile/components/follow-user-button";
import { prisma } from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";
import { getUserDataSelect } from "@/types";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { UserAvatar } from "./user-avatar";
import { UserTooltip } from "./user-tooltip";

const getTrendingTopics = unstable_cache(
  async () => {
    const results = await prisma.$queryRaw<
      { hashtag: string; count: bigint }[]
    >`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5
  `;

    return results.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60, // 3 hours
  }
);

const WhoToFollow = async () => {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: { id: user.id },
      followers: { none: { followerId: user.id } },
    },
    select: getUserDataSelect(),
    take: 5,
  });

  return (
    <div className="space-y-5 bg-card shadow-sm p-5 rounded-2xl">
      <p className="font-bold text-xl">Who to follow</p>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex justify-between items-center gap-3">
          <UserTooltip user={user}>
            <Link
              href={`users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />

              <div>
                <p className="font-semibold hover:underline break-all line-clamp-1">
                  {user.displayName}
                </p>
                <p className="text-muted-foreground break-all line-clamp-1">
                  @{user.username}
                </p>
              </div>
            </Link>
          </UserTooltip>
          <FollowUserButton user={user} />
        </div>
      ))}
    </div>
  );
};

const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 bg-card shadow-sm p-5 rounded-2xl">
      <div className="font-bold text-lg">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/search?q=${title}`} className="block">
            <p
              className="font-semibold hover:underline break-all line-clamp-1"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-muted-foreground text-sm">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export const TrendsSidebar = () => {
  return (
    <div className="hidden md:block top-[5.25rem] sticky space-y-3 w-72 lg:w-80 h-fit">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

import { validateRequest } from "@/auth";
import { Card } from "@/components/ui/primitives/card";
import { UserAvatar } from "@/components/user-avatar";
import { UpdateProfileDialog } from "@/features/profile/components/update-profile/update-profile-dialog";
import { FollowUserButton } from "@/features/profile/components/follow-user-button";
import { ProfilePosts } from "@/features/profile/components/profile-posts";
import { ProfileStats } from "@/features/profile/components/profile-stats";
import { prisma } from "@/lib/prisma";
import { getUserDataSelect } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import { cache } from "react";

const getUser = cache(async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(),
  });

  return user;
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUser(username);
  if (!user) return null;

  return {
    title: `${user.displayName} (@${user.username}) | X`,
  };
};

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) redirect("/login");

  const { username } = await params;

  const user = await getUser(username);
  if (!user) redirect("/login");

  return (
    <div>
      <Card className="p-4">
        <div className="relative mb-10">
          <Image
            width={600}
            height={150}
            src={user.bannerUrl || "/images/banner-placeholder.png"}
            alt="profile banner"
          />
          <UserAvatar
            avatarUrl={user.avatarUrl}
            size={100}
            className="bottom-[-30px] left-4 absolute mx-auto"
          />
        </div>

        <div className="flex justify-between items-center">
          <h1>{user.displayName}</h1>
          {loggedInUser.id === user.id ? (
            <UpdateProfileDialog />
          ) : (
            <FollowUserButton user={user} />
          )}
        </div>
        <p className="mt-[-3px] mb-4 text-muted-foreground">@{user.username}</p>

        <p className="mb-1 text-sm">
          Member since {user.createdAt.toLocaleDateString()}
        </p>

        <ProfileStats user={user} />

        {user.bio ? (
          <div>
            <hr className="my-4" />

            <p>{user.bio}</p>
          </div>
        ) : null}
      </Card>

      <Card className="my-4 p-3.5">
        <p className="font-semibold text-lg text-center">
          {user.displayName}&apos;s posts
        </p>
      </Card>

      <ProfilePosts userId={user.id} />
    </div>
  );
}

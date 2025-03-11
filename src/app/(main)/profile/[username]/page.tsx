import { validateRequest } from "@/auth";
import { Card } from "@/components/ui/primitives/card";
import { UserAvatar } from "@/components/user-avatar";
import { EditProfileDialog } from "@/features/profile/components/edit-profile-dialog";
import { FollowButton } from "@/features/profile/components/follow-button";
import { ProfilePosts } from "@/features/profile/components/profile-posts";
import { ProfileStats } from "@/features/profile/components/profile-stats";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/types";
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
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={100}
          className="mx-auto mb-10"
        />

        <div className="flex justify-between items-center">
          <h1>{user.displayName}</h1>
          {loggedInUser.id === user.id ? (
            <EditProfileDialog />
          ) : (
            <FollowButton user={user} />
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

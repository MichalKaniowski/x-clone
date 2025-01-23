import { Prisma } from "@prisma/client";

export const getUserDataSelect = () => {
  return {
    id: true,
    username: true,
    displayName: true,
    email: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
  } satisfies Prisma.UserSelect;
};

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export const getPostDataInclude = (userId: string) => {
  return {
    user: {
      select: {
        username: true,
        displayName: true,
        avatarUrl: true,
      },
    },
    likes: {
      where: {
        userId,
      },
    },
    _count: {
      select: {
        likes: true,
      },
    },
  } satisfies Prisma.PostInclude;
};

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export type PostsPage = {
  posts: PostData[];
  nextCursor: string | null;
};

export type LikeInfo = {
  likes: number;
  isLikedByUser: boolean;
};

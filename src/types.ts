import { Prisma } from "@prisma/client";

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

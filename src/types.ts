import { Prisma } from "@prisma/client";

export const postDataInclude = {
  user: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  likes: true,
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export type PostsPage = {
  posts: PostData[];
  nextCursor: string | null;
};

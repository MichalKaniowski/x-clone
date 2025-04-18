import { Prisma } from "@prisma/client";

export const getUserDataSelect = (loggedInUserId: string) => {
  return {
    id: true,
    username: true,
    displayName: true,
    email: true,
    avatarUrl: true,
    bannerUrl: true,
    bio: true,
    createdAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        followers: true,
        posts: true,
      },
    },
  } satisfies Prisma.UserSelect;
};

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export const getPostDataInclude = (userId: string) => {
  return {
    user: {
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
      },
    },
    bookmarks: true,
    likes: {
      where: {
        userId,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
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

export type CommentData = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
        displayName: true;
        email: true;
        avatarUrl: true;
        bannerUrl: true;
        bio: true;
        createdAt: true;
      };
    };
  };
}>;

export type CommentsPage = {
  comments: CommentData[];
  nextCursor: string | null;
};

export type PostCommentsInfo = {
  comments: number;
};

export type PostLikesInfo = {
  likes: number;
  isLikedByUser: boolean;
};

export type FollowInfo = {
  followers: number;
  isFollowedByUser: boolean;
};
export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface Feed {
  queryKey: string[];
  apiUrl: string;
}

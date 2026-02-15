import { Prisma } from "@prisma/client";

export const getUserDataSelect = () => {
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
      select: getUserDataSelect(),
    },
    bookmarks: { where: { userId }, select: { userId: true } },
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
    attachments: true,
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
      select: ReturnType<typeof getUserDataSelect>;
    };
  };
}>;

export type CommentsPage = {
  comments: CommentData[];
  nextCursor: string | null;
};

export const notificationsInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  post: {
    select: {
      content: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

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

export interface NotificationsCountInfo {
  unreadCount: number;
}

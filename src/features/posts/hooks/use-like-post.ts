import { PostData, PostsPage } from "@/types";
import { Like } from "@prisma/client";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { likePost as likePostAction } from "../actions/like-post";

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePostAction,
    onSuccess: async (likeObject: Like) => {
      await queryClient.cancelQueries({ queryKey: ["post-feed"] });

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: ["post-feed"] },
        (oldData) => {
          if (!oldData) return;

          const updatePosts = (posts: PostData[]) => {
            const postIndex = posts.findIndex(
              (post) => post.id === likeObject.postId
            );
            if (postIndex === -1) return posts;

            const post = posts[postIndex];

            // if like exists, remove it, otherwise add it,
            // because post can be liked and unliked
            const isLikePresent = post.likes.some(
              (like) => like.id === likeObject.id
            );

            if (isLikePresent) {
              const res = posts.map((post) => ({
                ...post,
                likes: post.likes.filter((like) => like.id !== likeObject.id),
              }));
              return res;
            } else {
              const updatedPost = {
                ...post,
                likes: [...post.likes, likeObject],
              };
              return [
                ...posts.slice(0, postIndex),
                updatedPost,
                ...posts.slice(postIndex + 1),
              ];
            }
          };

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: updatePosts(page.posts),
            })),
          };
        }
      );
    },
  });
};

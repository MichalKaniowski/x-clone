import { useSession } from "@/components/providers/session-provider";
import { PostData, PostsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost } from "../actions/create-post";
import { postsQueryFactory } from "../posts-query-factory";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async (createdPost: PostData) => {
      const queryFilter: QueryFilters = {
        queryKey: postsQueryFactory.createPost,
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user.id))
          );
        },
      };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page, idx) => ({
              nextCursor: page.nextCursor,
              posts: idx === 0 ? [createdPost, ...page.posts] : [...page.posts],
            })),
          };
        }
      );
    },
  });
};

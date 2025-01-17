import { PostData, PostsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost } from "../actions/create-post";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async (createdPost: PostData) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
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

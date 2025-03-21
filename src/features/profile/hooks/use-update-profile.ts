import { useUploadThing } from "@/lib/uploadthing";
import { PostsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserProfile } from "../actions/update-user-profile";
import { UpdateUserProfileValues } from "../validation";

export function useUpdateProfileMutation() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { startUpload: startAvatarUpload } = useUploadThing("avatarUploader");
  const { startUpload: startBannerUpload } = useUploadThing("bannerUploader");

  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
      banner,
    }: {
      values: UpdateUserProfileValues;
      avatar?: File;
      banner?: File;
    }) => {
      return Promise.all([
        updateUserProfile(values),
        avatar && startAvatarUpload([avatar]),
        banner && startBannerUpload([banner]),
      ]);
    },
    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        }
      );

      router.refresh();
      toast.info("Profile updated");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    },
  });

  return mutation;
}

import kyInstance from "@/lib/ky";
import { cn } from "@/lib/utils";
import { LikeInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useLikePost } from "../hooks/use-like-post";
import { postsQueryFactory } from "../posts-query-factory";

export const PostLikeButton = ({
  postId,
  initialState,
}: {
  postId: string;
  initialState: LikeInfo;
}) => {
  const { mutate: likePostMutate } = useLikePost(postId);
  const { data: likeInfo } = useQuery({
    queryKey: postsQueryFactory.getLikeInfo(postId),
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return (
    <button
      onClick={() => likePostMutate(postId)}
      className={"flex items-center gap-1 group/button"}
    >
      <Heart
        size={16}
        className={cn(
          "group-hover/button:text-red-500",
          likeInfo.isLikedByUser && "fill-red-500  text-red-500 "
        )}
      />
      <span className="text-sm">{likeInfo.likes} likes</span>
    </button>
  );
};

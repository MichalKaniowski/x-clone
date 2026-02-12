import { kyInstance } from "@/lib/ky";
import { cn } from "@/lib/utils";
import { PostLikesInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useLikePost } from "../hooks/use-like-post";
import { postsQueryFactory } from "../posts-query-factory";

interface LikePostButtonProps {
  postId: string;
  initialState: PostLikesInfo;
}

export const LikePostButton = ({
  postId,
  initialState,
}: LikePostButtonProps) => {
  const { mutate: likePostMutate } = useLikePost(postId);

  // this will never be called, it's for making state managment easier
  const { data: postLikesInfo } = useQuery({
    queryKey: postsQueryFactory.getPostLikesInfo(postId),
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/likes-info`).json<PostLikesInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const [isAnimating, setAnimating] = useState(false);

  return (
    <button
      onClick={() => {
        setAnimating(true);
        likePostMutate(postId);
        setTimeout(() => {
          setAnimating(false);
        }, 200);
      }}
      className={"flex items-center gap-1 group/button"}
    >
      <Heart
        size={16}
        className={cn(
          "group-hover/button:text-red-500",
          postLikesInfo.isLikedByUser && "fill-red-500  text-red-500",
          isAnimating && "animate-like",
        )}
      />
      <span className="text-sm">{postLikesInfo.likes} likes</span>
    </button>
  );
};

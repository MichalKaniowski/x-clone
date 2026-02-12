import { kyInstance } from "@/lib/ky";
import { PostCommentsInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { postsQueryFactory } from "../posts-query-factory";

interface PostCommentsButtonProps {
  postId: string;
  initialState: PostCommentsInfo;
  toggleCommentsOpen: () => void;
}

export const PostCommentsButton = ({
  postId,
  initialState,
  toggleCommentsOpen,
}: PostCommentsButtonProps) => {
  // this will never be called, it's for making state managment easier
  const { data: commentInfo } = useQuery({
    queryKey: postsQueryFactory.getPostCommentsInfo(postId),
    queryFn: () =>
      kyInstance
        .get(`/api/posts/${postId}/comments-info`)
        .json<PostCommentsInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return (
    <button onClick={toggleCommentsOpen} className="flex items-center gap-1">
      <MessageSquare size={16} />
      <span className="text-sm">{commentInfo.comments} comments</span>
    </button>
  );
};

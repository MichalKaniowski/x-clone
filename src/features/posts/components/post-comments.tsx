import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CommentData } from "@/types";
import { Loader2, SendHorizontal } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useComments } from "../hooks/use-comments";
import { useCreateComment } from "../hooks/use-create-comment";
import { Comment } from "./comment";

export const PostComments = ({ postId }: { postId: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: createComment } = useCreateComment();
  const {
    data: commentsData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    fetchNextPage,
  } = useComments(postId);
  const comments: CommentData[] =
    commentsData?.pages.flatMap((page) => page.comments) || [];

  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value.trim() || "";
    if (!inputValue) {
      toast.error("Comment is required");
      return;
    }

    await createComment({ comment: inputValue, postId });
    if (inputRef?.current) inputRef.current.value = "";
  };

  return (
    <div>
      <form
        onSubmit={handleCreateComment}
        className="flex justify-between items-center gap-1"
      >
        <Input ref={inputRef} autoFocus placeholder="Add a comment" />
        <Button variant="ghost">
          <SendHorizontal />
        </Button>
      </form>

      <div className="my-4">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className={cn(
              "w-full font-semibold text-primary text-sm text-center",
              isFetchingNextPage && "opacity-80"
            )}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading previous comments..."
              : "Load previous comments"}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {isError && (
          <p className="ml-1 text-danger text-destructive">
            Something went wrong while loading comments.
          </p>
        )}

        {!commentsData && isLoading && (
          <Loader2 className="mx-auto text-primary animate-spin" />
        )}
        {comments.length === 0 && !isLoading && (
          <p className="ml-1 text-sm">This post has no comments yet.</p>
        )}
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="space-y-2">
              <Comment comment={comment} />
              <Separator />
            </div>
          );
        })}
      </div>
    </div>
  );
};

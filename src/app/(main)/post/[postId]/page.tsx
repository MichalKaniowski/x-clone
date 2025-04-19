import { validateRequest } from "@/auth";
import { Post } from "@/features/posts/components/post";
import { prisma } from "@/lib/prisma";
import { getPostDataInclude } from "@/types";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: getPostDataInclude(user.id),
  });

  if (!post)
    return (
      <div className="font-semibold text-xl text-center">
        404 - post not found
      </div>
    );

  return <Post post={post} areCommentsOpenInitially={true} />;
}

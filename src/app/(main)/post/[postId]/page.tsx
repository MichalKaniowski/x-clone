import { validateRequest } from "@/auth";
import { Post } from "@/features/posts/components/post";
import { prisma } from "@/lib/prisma";
import { getPostDataInclude, getUserDataSelect } from "@/types";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> => {
  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      content: true,
      user: {
        select: getUserDataSelect(),
      },
    },
  });

  if (!post) return { title: "Post" };

  return {
    title: `Post by @${post.user.username}`,
  };
};

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

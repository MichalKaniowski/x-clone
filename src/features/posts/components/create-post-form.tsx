"use client";

import { useSession } from "@/components/providers/session-provider";
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/primitives/form";
import { UserAvatar } from "@/components/user-avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePost } from "../hooks/use-create-post";
import { createPostSchema, CreatePostValues } from "../validation";

export const CreatePostForm = () => {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
    },
  });
  const { user } = useSession();
  const { mutate, isPending } = useCreatePost();

  const onSubmit = async (data: CreatePostValues) => {
    mutate(data);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card p-4 rounded-xl"
      >
        <div className="flex items-start gap-3 mb-5 w-full">
          <UserAvatar avatarUrl={user.avatarUrl} size={38} />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AutoResizeTextarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <LoadingButton
            loading={isPending}
            type="submit"
            className="px-5 rounded-xl"
          >
            {isPending ? "Posting..." : "Post"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

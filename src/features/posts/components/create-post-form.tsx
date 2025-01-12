"use client";

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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPost } from "../actions/create-post";
import { createPostSchema, CreatePostValues } from "../validation";

export const CreatePostForm = () => {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: CreatePostValues) => {
    setIsLoading(true);
    const { post, error: postActionError } = await createPost(data);
    setIsLoading(false);

    if (postActionError) toast.error(postActionError);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card px-3 py-2 rounded-xl"
      >
        <div className="flex items-start gap-3 mb-5 w-full">
          <UserAvatar size={38} />
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
            loading={isLoading}
            type="submit"
            className="px-5 rounded-xl"
          >
            Post
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

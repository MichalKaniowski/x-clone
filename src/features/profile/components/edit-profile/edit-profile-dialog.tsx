"use client";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import bannerPlaceholder from "@/assets/banner-placeholder.png";
import { useSession } from "@/components/providers/session-provider";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Textarea } from "@/components/ui/primitives/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../hooks/use-update-profile";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "../../validation";
import { ImageInput } from "./image-input";

export const EditProfileDialog = () => {
  const { user } = useSession();

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || "",
    },
  });
  const mutation = useUpdateProfileMutation();
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);
  const [croppedBanner, setCroppedBanner] = useState<Blob | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function onSubmit(values: UpdateUserProfileValues) {
    const newAvatarFile = croppedAvatar
      ? new File([croppedAvatar], `avatar_${user.id}.webp`)
      : undefined;

    const newBannerFile = croppedBanner
      ? new File([croppedBanner], `banner_${user.id}.webp`)
      : undefined;

    mutation.mutate(
      {
        values,
        avatar: newAvatarFile,
        banner: newBannerFile,
      },
      { onSuccess: () => setIsDialogOpen(false) }
    );
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen((prevValue) => !prevValue)}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="border-foreground/20">
          Edit profile
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:w-[600px]">
        <DialogTitle>Edit profile</DialogTitle>
        <div className="relative w-full aspect-[3/1] cursor-pointer">
          <ImageInput
            onImageCropped={setCroppedBanner}
            type="banner"
            src={
              croppedBanner
                ? URL.createObjectURL(croppedBanner)
                : user.bannerUrl || bannerPlaceholder
            }
          />

          <ImageInput
            onImageCropped={setCroppedAvatar}
            type="avatar"
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : user.avatarUrl || avatarPlaceholder
            }
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mt-7"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1">Display name</FormLabel>
                  <FormControl>
                    <Input className="mt-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <LoadingButton
                type="submit"
                className="bg-foreground hover:bg-foreground/90 mt-4 text-background"
                loading={mutation.isPending}
              >
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

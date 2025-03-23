"use client";

import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../hooks/use-update-profile";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "../../validation";
import { ProfileForm } from "./profile-form";
import { ProfileImages } from "./profile-images";

export const EditProfileDialog = () => {
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);
  const [croppedBanner, setCroppedBanner] = useState<Blob | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutation = useUpdateProfileMutation();
  const { user } = useSession();

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || "",
    },
  });

  const onSubmit = async (values: UpdateUserProfileValues) => {
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
  };

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
        <ProfileImages
          croppedAvatar={croppedAvatar}
          croppedBanner={croppedBanner}
          onSetCroppedAvatar={setCroppedAvatar}
          onSetCroppedBanner={setCroppedBanner}
        />
        <ProfileForm
          form={form}
          isLoading={mutation.isPending}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

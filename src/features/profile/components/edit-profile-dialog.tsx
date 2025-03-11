"use client";

import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { Textarea } from "@/components/ui/primitives/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { editProfile } from "../actions/edit-profile";

export const EditProfileDialog = () => {
  const { user } = useSession();

  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio || "");
  const router = useRouter();

  const handleEditProfileChange = async () => {
    const { updatedUser, error } = await editProfile({ displayName, bio });

    if (error) {
      toast.error(error);
    }

    router.refresh();

    // TODO: add ability to change banner and avatar images
    // TODO: add form to the dialog, so user see validation errors
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-foreground/20">
          Edit profile
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[600px]">
        <DialogTitle>Edit profile</DialogTitle>
        <div className="relative w-full aspect-[3/1]">
          <Image src="/images/baner.jpeg" alt="avatar" fill />

          <Image
            src="/images/avatar.jpg"
            alt="avatar"
            width={85}
            height={85}
            className="bottom-[-30px] left-4 absolute rounded-full"
          />
        </div>

        <div className="space-y-3 mt-7">
          <div>
            <Label htmlFor="name" className="ml-1">
              Display Name
            </Label>
            <Input
              id="name"
              className="mt-1"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bio" className="ml-1">
              Bio
            </Label>
            <Textarea
              id="bio"
              className="mt-1"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              onClick={handleEditProfileChange}
              className="bg-foreground hover:bg-foreground/90 text-background"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

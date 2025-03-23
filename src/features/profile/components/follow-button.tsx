"use client";

import { Button } from "@/components/ui/primitives/button";
import { UserData } from "@/types";
import { UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";
import { useFollowInfo } from "../hooks/use-follow-info";
import { useFollowUser } from "../hooks/use-follow-user";

export const FollowButton = ({ user }: { user: UserData }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    data: { isFollowedByUser },
  } = useFollowInfo(user);
  const { mutate } = useFollowUser(user.id);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      mutate(user.id);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`relative w-32 transition-colors duration-200 ${
        isFollowedByUser
          ? "bg-background/90 text-foreground hover:bg-background/60"
          : "bg-foreground/90 text-background hover:bg-foreground/70"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-full text-center transition-all duration-200 ease-in-out ${
            isAnimating
              ? "transform -translate-y-2 opacity-50"
              : "transform translate-y-0 opacity-100"
          }`}
        >
          {isFollowedByUser ? "Following" : "Follow"}
        </div>
        {isFollowedByUser ? (
          <UserCheck className="size-4" />
        ) : (
          <UserPlus className="size-4" />
        )}
      </div>
    </Button>
  );
};

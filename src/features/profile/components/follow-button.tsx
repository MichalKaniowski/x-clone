"use client";

import { cn } from "@/lib/utils";
import { UserData } from "@/types";
import { UserCheck, UserPlus, UserRoundX } from "lucide-react";
import { useFollowInfo } from "../hooks/use-follow-info";
import { useFollowUser } from "../hooks/use-follow-user";

export const FollowButton = ({ user }: { user: UserData }) => {
  const {
    data: { isFollowedByUser },
  } = useFollowInfo(user);
  const { mutate } = useFollowUser(user.id);

  const iconClass = cn(
    "absolute inset-0 transition-all duration-200 transform",
    isFollowedByUser
      ? "group-hover:opacity-0 group-hover:scale-75 opacity-100 scale-100"
      : "opacity-100 scale-100"
  );

  const textClass = cn(
    "absolute inset-0 flex items-center justify-center transition-all duration-200 transform",
    isFollowedByUser
      ? "group-hover:opacity-0 group-hover:-translate-y-1 opacity-100 translate-y-0"
      : "opacity-100 translate-y-0"
  );

  return (
    <button
      onClick={() => mutate(user.id)}
      className={cn(
        "group relative flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 border hover:bg-secondary",
        isFollowedByUser
          ? "bg-secondary border-card text-card-foreground"
          : "bg-secondary/50 border-transparent text-foreground"
      )}
    >
      <span className="relative size-4">
        <span className={iconClass}>
          {isFollowedByUser ? (
            <UserCheck className="size-4" />
          ) : (
            <UserPlus className="size-4" />
          )}
        </span>
        {isFollowedByUser && (
          <span
            className={cn(
              iconClass,
              "group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-75"
            )}
          >
            <UserRoundX className="size-4" />
          </span>
        )}
      </span>

      <span className="relative flex justify-center items-center w-16 h-5">
        <span className={textClass}>
          {isFollowedByUser ? "Following" : "Follow"}
        </span>
        {isFollowedByUser && (
          <span
            className={cn(
              textClass,
              "group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-1"
            )}
          >
            Unfollow
          </span>
        )}
      </span>
    </button>
  );

  // ... existing code ...
};

// "use client";

// import { cn } from "@/lib/utils";
// import { UserCheck, UserPlus, UserRoundX } from "lucide-react";
// import { useState } from "react";

// export const FollowButton = () => {
//   const [isFollowing, setIsFollowing] = useState(false);

//   const iconClass = cn(
//     "absolute inset-0 transition-all duration-200 transform",
//     isFollowing
//       ? "group-hover:opacity-0 group-hover:scale-75 opacity-100 scale-100"
//       : "opacity-100 scale-100"
//   );

//   const textClass = cn(
//     "absolute inset-0 flex items-center justify-center transition-all duration-200 transform",
//     isFollowing
//       ? "group-hover:opacity-0 group-hover:-translate-y-1 opacity-100 translate-y-0"
//       : "opacity-100 translate-y-0"
//   );

//   return (
//     <button
//       onClick={() => setIsFollowing(!isFollowing)}
//       className={cn(
//         "group relative flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 border hover:bg-secondary",
//         isFollowing
//           ? "bg-card border-card text-card-foreground"
//           : "bg-background border-transparent text-foreground"
//       )}
//     >
//       <span className="relative w-4 h-4">
//         <span className={iconClass}>
//           {isFollowing ? (
//             <UserCheck className="size-4" />
//           ) : (
//             <UserPlus className="w-4 h-4" />
//           )}
//         </span>
//         {isFollowing && (
//           <span
//             className={cn(
//               iconClass,
//               "group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-75"
//             )}
//           >
//             <UserRoundX className="size-4" />
//           </span>
//         )}
//       </span>

//       <span className="relative flex justify-center items-center w-16 h-5">
//         <span className={textClass}>
//           {isFollowing ? "Following" : "Follow"}
//         </span>
//         {isFollowing && (
//           <span
//             className={cn(
//               textClass,
//               "group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-1"
//             )}
//           >
//             Unfollow
//           </span>
//         )}
//       </span>
//     </button>
//   );
// };

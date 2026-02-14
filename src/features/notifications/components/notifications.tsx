"use client";

import { InfiniteScrollingContainer } from "@/components/infinite-scrolling-container";
import { NotificationData } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNotifications } from "../hooks/use-notifications";
import { useReadNotification } from "../hooks/use-read-notification";
import { Notification } from "./notification";
import { NotificationSkeletonLoader } from "./notification-skeleton";

export const Notifications = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } =
    useNotifications();
  const { mutate: readNotificationsMutate } = useReadNotification();

  useEffect(() => {
    readNotificationsMutate();
  }, [readNotificationsMutate]);

  const numberOfNotifications =
    data?.pages.flatMap((page) => page.notifications).length || 0;
  const isLoadingInitial = isPending && !data;

  return (
    <InfiniteScrollingContainer
      onBottomReached={fetchNextPage}
      className="py-2"
    >
      <div className="space-y-3">
        {data?.pages.map((page) =>
          page.notifications.map((notification: NotificationData) => (
            <Notification key={notification.id} notification={notification} />
          ))
        )}

        {isLoadingInitial && <NotificationSkeletonLoader />}
      </div>
      <div className="mt-8">
        {isFetching && !isLoadingInitial && (
          <Loader2 className="mx-auto animate-spin" />
        )}
        {!isFetching && !hasNextPage && (
          <>
            {numberOfNotifications > 0 ? (
              <p className="text-center">No more notifications to load</p>
            ) : (
              <p className="text-center">No notifications to load</p>
            )}
          </>
        )}
      </div>
    </InfiniteScrollingContainer>
  );
};

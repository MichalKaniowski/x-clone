import { kyInstance } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsQueryFactory } from "../notifications-query-factory";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      kyInstance.patch(`/api/notifications/mark-as-read`).json(),
    onSuccess: () => {
      queryClient.setQueryData(
        notificationsQueryFactory.unreadNotificationsCount,
        { unreadCount: 0 },
      );
    },
  });
};

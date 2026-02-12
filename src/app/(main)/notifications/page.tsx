import { Card, CardHeader, CardTitle } from "@/components/ui/primitives/card";
import { Notifications } from "@/features/notifications/components/notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return (
    <div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-xl">Notifications</CardTitle>
        </CardHeader>
      </Card>
      <Notifications />
    </div>
  );
}

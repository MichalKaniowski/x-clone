import { validateRequest } from "@/auth";
import SessionProvider from "@/components/session-provider";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  // this is for convenience and user experience, auth checks in the layout should not be trusted
  // the auth will be checked on the backend when fetching data
  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div>{children}</div>
    </SessionProvider>
  );
}

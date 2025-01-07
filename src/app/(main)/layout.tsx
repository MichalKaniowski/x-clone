import { validateRequest } from "@/auth";
import { Navbar } from "@/components/navbar";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import SessionProvider from "@/components/providers/session-provider";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  // this is for convenience and user experience, auth checks in the layout should not be trusted
  // the auth will be checked on the backend when getting data
  if (!session.user) redirect("/login");

  return (
    <ReactQueryProvider>
      <SessionProvider value={session}>
        <Navbar />
        <div>{children}</div>
      </SessionProvider>
    </ReactQueryProvider>
  );
}

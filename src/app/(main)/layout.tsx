import { validateRequest } from "@/auth";
import { MenuBar } from "@/components/menu-bar";
import { Navbar } from "@/components/navbar";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { TrendsSidebar } from "@/components/trends-sidebar";
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
        <div className="flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto px-3 pt-4 pb-6 max-w-7xl">
              <div className="flex gap-4 w-full">
                <div className="hidden md:block flex-1">
                  <MenuBar />
                </div>

                <div className="flex-[2]">{children}</div>

                <div className="hidden lg:block flex-1">
                  <TrendsSidebar />
                </div>
              </div>
            </div>
          </main>
        </div>
      </SessionProvider>
    </ReactQueryProvider>
  );
}

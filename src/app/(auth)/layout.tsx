import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return (
    <div className="flex justify-center items-center mx-auto max-w-7xl min-h-screen">
      {children}
    </div>
  );
}

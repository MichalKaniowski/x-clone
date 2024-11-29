import { validateRequest } from "@/auth";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export default async function HomePage() {
  const { user } = await validateRequest();

  console.log(user);

  return user ? (
    <div>
      {/* here will be: sidebar, feed, hashtag sidebar, etc */}
      home page
    </div>
  ) : (
    <AuthScreen />
  );
}

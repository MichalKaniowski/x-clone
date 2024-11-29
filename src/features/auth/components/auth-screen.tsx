import { Logo } from "@/components/logo";
import { AuthModal } from "./auth-modal/auth-modal";
import { GoogleLoginButton } from "./google-login-button";

export const AuthScreen = () => {
  return (
    <div className="flex mx-auto max-w-7xl min-h-screen">
      <div className="flex flex-1 justify-center items-center">
        <Logo className="w-[320px] h-[320px]" />
      </div>

      <div className="flex flex-col flex-1 justify-center p-16">
        <h1 className="mb-12 font-bold text-6xl">Happening now</h1>
        <h2 className="mb-8 font-bold text-3xl">Join today.</h2>

        <div className="max-w-xs">
          <div className="space-y-4">
            <GoogleLoginButton text="Sign in with Google" />

            <div className="flex items-center my-4">
              <div className="flex-1 border-gray-700 border-t"></div>
              <span className="px-4">or</span>
              <div className="flex-1 border-gray-700 border-t"></div>
            </div>

            <AuthModal initialIsSignup={true} />
          </div>

          <div className="mt-12">
            <p className="mb-4 font-bold">Already have an account?</p>
            <AuthModal initialIsSignup={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

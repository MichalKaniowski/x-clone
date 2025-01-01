import { Logo } from "@/components/logo";
import { AuthModal } from "@/features/auth/components/auth-modal/auth-modal";
import { GoogleLoginButton } from "@/features/auth/components/google-login-button";

export default function LoginPage() {
  return (
    <div className="w-full h-full">
      <Logo className="block sm:hidden mx-auto mb-7 w-[50px] h-[50px]" />
      <div className="flex">
        <div className="sm:flex flex-1 justify-center items-center hidden">
          <Logo className="w-[320px] h-[320px]" />
        </div>

        <div className="flex flex-col flex-1 justify-center sm:p-16">
          <h1 className="mb-12 font-bold text-4xl text-center sm:text-left sm:text-6xl">
            Happening now
          </h1>
          <h2 className="mb-8 font-bold text-2xl text-center sm:text-3xl sm:text-left">
            Join today.
          </h2>

          <div className="mx-auto sm:mx-0 max-w-xs">
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
    </div>
  );
}

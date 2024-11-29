import { AuthModal } from "./auth-modal/auth-modal";
import { GoogleLoginButton } from "./google-login-button";

export const AuthScreen = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 justify-center items-center">
        <svg
          viewBox="0 0 24 24"
          className="w-[320px] h-[320px] text-foreground"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      <div className="flex flex-col flex-1 justify-center p-16">
        <h1 className="mb-12 font-bold text-6xl">Happening now</h1>
        <h2 className="mb-8 font-bold text-3xl">Join today.</h2>

        <div className="space-y-4 max-w-sm">
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
  );
};

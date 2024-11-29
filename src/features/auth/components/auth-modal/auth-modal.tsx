"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import { useState } from "react";
import { GoogleLoginButton } from "../google-login-button";
import { ModalLoginForm } from "./modal-login-form";
import { ModalSignupForm } from "./modal-signup-form";

export const AuthModal = ({
  initialIsSignup,
}: {
  initialIsSignup: boolean;
}) => {
  const [isSignUp, setIsSignUp] = useState(initialIsSignup);
  const [open, setOpen] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {initialIsSignup ? (
          <Button
            size="lg"
            className="px-4 py-2 rounded-full w-full font-semibold transition-colors"
          >
            Create account
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-[#031018] px-4 py-2 border rounded-full w-full max-w-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-white/10 bg-black sm:max-w-[400px] text-white">
        <DialogHeader className="relative">
          <div className="flex justify-center mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-[40px] h-[40px] text-foreground"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <DialogTitle className="mb-8 font-bold text-2xl text-center">
            {isSignUp ? "Create an account on X" : "Sign in to X"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <GoogleLoginButton
            text={isSignUp ? "Sign up with Google" : "Sign in with Google"}
          />

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="border-white/20 border-t w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-white/60">or</span>
            </div>
          </div>

          {isSignUp ? (
            <ModalSignupForm toggleMode={toggleMode} />
          ) : (
            <ModalLoginForm toggleMode={toggleMode} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { Logo } from "@/components/logo";
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
import { ModalLoginForm } from "./modal-login-form/modal-login-form";
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
          <Button size="lg" className="w-full font-semibold">
            Create account
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-[#f3f3f3] dark:hover:bg-[#031018] border rounded-full w-full max-w-sm font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-foreground/10 sm:max-w-[400px] text-white">
        <DialogHeader className="relative">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <DialogTitle className="mb-8 font-bold text-2xl text-center">
            {isSignUp ? "Create an account on X" : "Sign in to X"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <GoogleLoginButton
            text={isSignUp ? "Sign up with Google" : "Sign in with Google"}
          />

          <div className="flex items-center my-4">
            <div className="flex-1 border-gray-700 border-t"></div>
            <span className="px-4 text-foreground">or</span>
            <div className="flex-1 border-gray-700 border-t"></div>
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

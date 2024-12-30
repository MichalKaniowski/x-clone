"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { resetPassword } from "../actions/reset-password";
import { resetPasswordSchema, ResetPasswordValues } from "../validation";
import { PasswordInput } from "./password-input";

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      setIsLoading(true);
      setError("");

      const token = searchParams.get("token");
      if (!token) {
        setError("Unathorized");
        return;
      }

      if (values.newPassword !== values.confirmNewPassword) {
        return toast.error("Passwords do not match");
      }

      const res = await resetPassword(token, values);
      if (res?.error) {
        setError(res.error);
        return;
      }

      toast.success("Password reset successfully. Redirecting to login...", {
        duration: 5000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-semibold text-3xl">Reset your password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <p className="text-center text-destructive">{error}</p>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="New password"
                    className="dark:border-white/20 h-12 dark:placeholder:text-white/40"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="dark:border-white/20 h-12 dark:placeholder:text-white/40"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <LoadingButton
              type="submit"
              className="bg-foreground hover:bg-foreground/90 mt-2 w-full font-bold text-background"
              loading={isLoading}
            >
              Reset password
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

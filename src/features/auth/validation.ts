import { requiredString } from "@/lib/validation";
import { z } from "zod";

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed"
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});
export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});
export type LoginValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: requiredString.email("Invalid email address"),
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  newPassword: requiredString.min(8, "Must be at least 8 characters"),
  confirmNewPassword: requiredString.min(8, "Must be at least 8 characters"),
});
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

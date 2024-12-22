import { Button } from "@/components/ui/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { doesAccountExist } from "@/features/auth/actions/does-account-exist";
import { sendResetPasswordEmail } from "@/features/auth/actions/send-reset-password-email";
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onTurnPasswordModeOff: () => void;
}

export const ForgotPasswordForm = ({
  onTurnPasswordModeOff,
}: ForgotPasswordFormProps) => {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    const doesAccountWithEmailExist = await doesAccountExist(values.email);
    if (!doesAccountWithEmailExist)
      return toast.error("Account with that email address doesn't exist.");

    const res = await sendResetPasswordEmail(values);
    const error = res?.error;
    if (error) return toast.error(error);

    toast.success(
      "Email with reset password link has been sent successfully. Check your inbox and spam folder."
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    className="dark:border-white/20 h-12 dark:placeholder:text-white/40"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-foreground hover:bg-foreground/90 mt-2 w-full font-bold text-background"
          >
            Reset password
          </Button>
        </form>
      </Form>
      <button
        onClick={onTurnPasswordModeOff}
        className="flex items-center gap-2 !mt-6 text-foreground/70 hover:text-foreground/80"
      >
        <MoveLeft size={16} />
        <span className="text-sm">go back</span>
      </button>
    </>
  );
};

import { LoadingButton } from "@/components/ui/loading-button";
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
import { login } from "@/features/auth/actions/login";
import { loginSchema, LoginValues } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../password-input";

interface LoginFormProps {
  toggleSignupMode: () => void;
  onTurnPasswordModeOn: () => void;
}

export const LoginForm = ({
  toggleSignupMode,
  onTurnPasswordModeOn,
}: LoginFormProps) => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    setError("");
    const { error } = await login(values);
    setIsLoading(false);
    setError(error);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <p className="text-center text-destructive">{error}</p>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  className="dark:border-white/20 h-12 dark:placeholder:text-white/40"
                  placeholder="Password"
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
            Sign in
          </LoadingButton>
        </div>
      </form>
      <Button
        onClick={onTurnPasswordModeOn}
        variant="outline"
        className="border-foreground/20 hover:bg-foreground/10 w-full text-foreground"
      >
        Forgot password?
      </Button>
      <p className="space-x-1 pt-4 text-foreground/90 text-sm">
        <span>Don&apos;t have an account?</span>
        <button
          onClick={toggleSignupMode}
          className="text-blue-500 hover:underline"
        >
          Sign up
        </button>
      </p>
    </Form>
  );
};

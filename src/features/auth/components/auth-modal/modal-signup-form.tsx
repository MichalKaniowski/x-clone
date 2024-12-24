import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUp } from "../../actions/signup";
import { signUpSchema, SignUpValues } from "../../validation";
import { PasswordInput } from "../password-input";

export const ModalSignupForm = ({ toggleMode }: { toggleMode: () => void }) => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: SignUpValues) {
    setIsLoading(true);
    const { error } = await signUp(values);
    setIsLoading(false);

    if (error) toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
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
            Create account
          </LoadingButton>
        </div>
      </form>
      <p className="space-x-1 pt-4 text-foreground/90 text-sm">
        <span>Already have an account?</span>
        <button onClick={toggleMode} className="text-blue-500 hover:underline">
          Sign in
        </button>
      </p>
    </Form>
  );
};

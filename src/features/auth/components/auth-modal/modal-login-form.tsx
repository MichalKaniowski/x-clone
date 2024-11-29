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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "../../actions/login";
import { loginSchema, LoginValues } from "../../validation";
import { PasswordInput } from "../password-input";

export const ModalLoginForm = ({ toggleMode }: { toggleMode: () => void }) => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    const { error } = await login(values);

    if (error) toast.error(error);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          <Button
            type="submit"
            className="bg-foreground hover:bg-foreground/90 mt-2 w-full font-bold text-background"
          >
            Sign in
          </Button>
        </div>
      </form>
      <Button
        variant="outline"
        className="border-foreground/20 hover:bg-foreground/10 w-full text-foreground"
      >
        Forgot password?
      </Button>
      <p className="space-x-1 pt-4 text-foreground/90 text-sm">
        <span>Don&apos;t have an account?</span>
        <button onClick={toggleMode} className="text-blue-500 hover:underline">
          Sign up
        </button>
      </p>
    </Form>
  );
};

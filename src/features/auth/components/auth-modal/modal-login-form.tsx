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
                  className="border-white/20 bg-transparent h-12 placeholder:text-white/40"
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
                {/* <Input
                  type="password"
                  /> */}
                <PasswordInput
                  className="border-white/20 bg-transparent h-12 placeholder:text-white/40"
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
            className="bg-white hover:bg-white/90 !mt-2 rounded-full w-full h-9 font-bold text-black"
          >
            Sign in
          </Button>
        </div>
      </form>
      <Button
        variant="outline"
        className="border-white/20 hover:bg-white/10 rounded-full w-full h-10 text-white"
      >
        Forgot password?
      </Button>
      <p className="space-x-1 pt-4 text-sm text-white/60">
        <span>Don&apos;t have an account?</span>
        <button onClick={toggleMode} className="text-blue-500 hover:underline">
          Sign up
        </button>
      </p>
    </Form>
  );
};

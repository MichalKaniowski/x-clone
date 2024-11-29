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
import { signUp } from "../../actions/signup";
import { signUpSchema, SignUpValues } from "../../validation";
import { PasswordInput } from "../password-input";

export const ModalSignupForm = ({ toggleMode }: { toggleMode: () => void }) => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpValues) {
    const { error } = await signUp(values);
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
            Create account
          </Button>
        </div>
      </form>
      <p className="space-x-1 pt-4 text-sm text-white/60">
        <span>Already have an account?</span>
        <button onClick={toggleMode} className="text-blue-500 hover:underline">
          Sign in
        </button>
      </p>
    </Form>
  );
};

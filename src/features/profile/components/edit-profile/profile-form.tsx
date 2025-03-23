import { LoadingButton } from "@/components/ui/loading-button";
import { DialogFooter } from "@/components/ui/primitives/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Textarea } from "@/components/ui/primitives/textarea";
import { UseFormReturn } from "react-hook-form";
import { UpdateUserProfileValues } from "../../validation";

interface ProfileFormProps {
  form: UseFormReturn<UpdateUserProfileValues>;
  isLoading: boolean;
  onSubmit: (values: UpdateUserProfileValues) => Promise<void>;
}

export const ProfileForm = ({
  form,
  isLoading,
  onSubmit,
}: ProfileFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-7">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Display name</FormLabel>
              <FormControl>
                <Input className="mt-1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <LoadingButton
            type="submit"
            className="bg-foreground hover:bg-foreground/90 mt-4 text-background"
            loading={isLoading}
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

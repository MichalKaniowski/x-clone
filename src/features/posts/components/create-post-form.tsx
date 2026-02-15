"use client";

import { useSession } from "@/components/providers/session-provider";
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/primitives/form";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "@uploadthing/react";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useCreatePost } from "../hooks/use-create-post";
import { Attachment, useMediaUpload } from "../hooks/use-media-upload";
import { createPostSchema, CreatePostValues } from "../validation";

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemove: () => void;
}

const AttachmentPreview = ({
  attachment: { file, mediaId, isUploading },
  onRemove,
}: AttachmentPreviewProps) => {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="rounded-2xl max-h-[30rem] size-fit"
        />
      ) : (
        <video controls className="rounded-2xl max-h-[30rem] size-fit">
          <source src={src} type={file.type} />
        </video>
      )}

      {!isUploading && (
        <button
          onClick={onRemove}
          className="top-3 right-3 absolute bg-foreground hover:bg-foreground/60 p-1.5 rounded-full text-background transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

interface AttachmentsPreviewProps {
  attachments: Attachment[];
  removeAttachment: (filename: string) => void;
}
const AttachmentsPreview = ({
  attachments,
  removeAttachment,
}: AttachmentsPreviewProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemove={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
};

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

const AddAttachmentsButton = ({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) => {
  const filesInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="text-primary hover:text-primary"
        onClick={() => filesInputRef.current?.click()}
        disabled={disabled}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type="file"
        accept="image/*, video/&"
        multiple
        ref={filesInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (!files.length) return;

          onFilesSelected(files);
          e.target.value = "";
        }}
      />
    </>
  );
};

export const CreatePostForm = () => {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      mediaIds: [],
    },
  });
  const { user } = useSession();
  const { mutate, isPending } = useCreatePost();
  const {
    attachments,
    isUploading,
    uploadProgress,
    startUpload,
    removeAttachment,
    reset: resetMediaUpload,
  } = useMediaUpload();
  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop: startUpload,
  });
  const { onClick, ...rootProps } = getRootProps();

  const onSubmit = async (data: CreatePostValues) => {
    mutate(
      {
        content: data.content,
        mediaIds: data.mediaIds,
      },
      {
        onSuccess: () => {
          resetMediaUpload();
        },
      }
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        {...rootProps}
        onSubmit={form.handleSubmit((data) => {
          const mediaIds = attachments
            .map((a) => a.mediaId)
            .filter(Boolean) as string[];
          onSubmit({ ...data, mediaIds });
        })}
        className={cn(
          "bg-card p-4 rounded-xl",
          isDragActive && "border-dashed border border-primary"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex items-start gap-3 mb-5 w-full">
          <UserAvatar avatarUrl={user.avatarUrl} size={34} />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AutoResizeTextarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!!attachments.length && (
          <AttachmentsPreview
            attachments={attachments}
            removeAttachment={removeAttachment}
          />
        )}
        <div className="flex justify-end">
          {isUploading && (
            <>
              <span className="text-sm">{uploadProgress ?? 0}%</span>
              <Loader2 className="size-5 text-primary animate-spin" />
            </>
          )}
          <AddAttachmentsButton
            onFilesSelected={startUpload}
            disabled={isUploading || attachments.length >= 5}
          />
          <LoadingButton
            loading={isPending}
            type="submit"
            className="px-5 rounded-xl"
            disabled={
              (!form.getValues().content.trim() && attachments.length === 0) ||
              isUploading
            }
          >
            {isPending ? "Posting..." : "Post"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import CropImageDialog from "./crop-image-dialog";

interface AvatarInputProps {
  src: string | StaticImageData;
  type: "avatar" | "banner";
  onImageCropped: (blob: Blob | null) => void;
}

export const ImageInput = ({ src, type, onImageCropped }: AvatarInputProps) => {
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setImageToCrop(uri as File),
      "file"
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />

      <div
        className={cn(
          "group/avatar absolute",
          type === "avatar" && "bottom-[-16px] left-4"
        )}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="block relative"
        >
          {type === "avatar" ? (
            <Image
              src={src}
              alt="Profile avatar"
              width={85}
              height={85}
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src={src}
              alt="Profile banner"
              width={600}
              height={150}
              className="opacity-95"
            />
          )}
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 group-hover/avatar:opacity-80 m-auto rounded-full w-10 h-10">
            <Camera size={24} className="text-white" />
          </div>
        </button>
      </div>

      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={type === "avatar" ? 1 : 3}
          onCropped={onImageCropped}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
};

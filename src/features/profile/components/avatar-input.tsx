import { Camera } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import CropImageDialog from "./crop-image-dialog";

interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

export function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
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

      <div className="group/avatar bottom-[-16px] left-4 absolute">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="block relative"
        >
          <Image
            src={src}
            alt="Avatar preview"
            width={85}
            height={85}
            className="rounded-full object-cover"
          />
          <div className="group-hover/avatar:flex hidden absolute inset-0 justify-center items-center bg-black bg-opacity-50 m-auto rounded-full w-10 h-10">
            <Camera size={24} className="text-white" />
          </div>
        </button>
      </div>

      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={1}
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
}

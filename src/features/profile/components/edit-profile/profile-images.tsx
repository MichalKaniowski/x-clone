import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import bannerPlaceholder from "@/assets/banner-placeholder.png";
import { useSession } from "@/components/providers/session-provider";
import { ImageInput } from "./image-input";

interface ProfileImagesProps {
  croppedAvatar: Blob | null;
  croppedBanner: Blob | null;
  onSetCroppedAvatar: (blob: Blob | null) => void;
  onSetCroppedBanner: (blob: Blob | null) => void;
}

export const ProfileImages: React.FC<ProfileImagesProps> = ({
  croppedAvatar,
  croppedBanner,
  onSetCroppedAvatar,
  onSetCroppedBanner,
}) => {
  const { user } = useSession();

  return (
    <div className="relative w-full aspect-[3/1] cursor-pointer">
      <ImageInput
        onImageCropped={onSetCroppedBanner}
        type="banner"
        src={
          croppedBanner
            ? URL.createObjectURL(croppedBanner)
            : user.bannerUrl || bannerPlaceholder
        }
      />

      <ImageInput
        onImageCropped={onSetCroppedAvatar}
        type="avatar"
        src={
          croppedAvatar
            ? URL.createObjectURL(croppedAvatar)
            : user.avatarUrl || avatarPlaceholder
        }
      />
    </div>
  );
};

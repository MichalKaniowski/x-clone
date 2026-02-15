import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const authMiddleware = async () => {
  const { user } = await validateRequest();

  if (!user) throw new UploadThingError("Unauthorized");

  return { userId: user.id };
};

export const ourFileRouter = {
  avatarUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { avatarUrl: file.ufsUrl },
      });

      return { avatarUrl: file.ufsUrl };
    }),
  bannerUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: { id: metadata.userId },
        data: { bannerUrl: file.ufsUrl },
      });

      return { avatarUrl: file.ufsUrl };
    }),
  attachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await prisma.media.create({
        data: {
          url: file.ufsUrl,
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        },
      });

      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

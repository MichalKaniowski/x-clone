"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { editProfileSchema, EditProfileValues } from "../validation";

export const editProfile = async (values: EditProfileValues) => {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Unathorized");

    const validatedData = editProfileSchema.parse(values);

    const updatedUserData = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        displayName: validatedData.displayName,
        bio: validatedData.bio,
      },
    });

    const { passwordHash, ...updatedUser } = updatedUserData;

    return { updatedUser };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

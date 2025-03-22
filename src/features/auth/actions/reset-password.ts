"use server";

import { prisma } from "@/lib/prisma";
import { resetPasswordSchema, ResetPasswordValues } from "../validation";
import { getHashedPassword } from "./get-hashed-password";

export const resetPassword = async (
  token: string,
  values: ResetPasswordValues
) => {
  try {
    const dbToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!dbToken) return { error: "Invalid token" };
    if (dbToken.expiresAt < new Date()) return { error: "Token expired" };

    const { data } = resetPasswordSchema.safeParse(values);
    if (!data) return { error: "Passwords are not valid" };
    if (data.newPassword !== data.confirmNewPassword)
      return { error: "Passwords don't match" };

    const passwordHash = await getHashedPassword(data.newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: dbToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.delete({
        where: { token },
      }),
    ]);
  } catch {
    return { error: "Something went wrong" };
  }
};

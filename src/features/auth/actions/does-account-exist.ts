"use server";

import { prisma } from "@/lib/prisma";

export const doesAccountExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return !!user;
};

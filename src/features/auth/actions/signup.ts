"use server";

import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signUpSchema, SignUpValues } from "../validation";
import { getHashedPassword } from "./get-hashed-password";

export const signUp = async (
  credentials: SignUpValues
): Promise<{ error: string } | never> => {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    const passwordHash = await getHashedPassword(password);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    const userId = generateIdFromEntropySize(10);
    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }

  redirect("/");
};

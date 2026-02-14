"use server";

import { ResetPasswordEmail } from "@/emails/reset-password-email";
import { prisma } from "@/lib/prisma";
import { render } from "@react-email/components";
import sendgrid from "@sendgrid/mail";
import React from "react";
import { forgotPasswordSchema, ForgotPasswordValues } from "../validation";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export const sendResetPasswordEmail = async (values: ForgotPasswordValues) => {
  try {
    const { data } = forgotPasswordSchema.safeParse(values);
    if (!data) return { error: "Invalid email" };

    const validatedEmail = data.email;

    const user = await prisma.user.findUnique({
      where: { email: validatedEmail },
    });
    if (!user)
      return { error: "Account with that email address doesn't exist." };

    const token = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    const emailHtml = await render(
      React.createElement(ResetPasswordEmail, {
        userFirstname: user.displayName,
        resetPasswordLink: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token.token}`,
      })
    );

    const msg = {
      to: validatedEmail,
      from: "kaniowskimichal2@gmail.com",
      subject: "Reset your password",
      html: emailHtml,
    };

    sendgrid.send(msg).catch(() => {
      return { error: "Something went wrong while sending an email" };
    });
  } catch (error) {
    console.error("Error in sendResetPasswordEmail action: ", error);
    return { error: "Something went wrong" };
  }
};

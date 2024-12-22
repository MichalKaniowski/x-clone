"use server";

import { hash } from "@node-rs/argon2";

// it's a server action, because argon2 is specified as server dependency in nextjs config and must be used in server environment
export const getHashedPassword = async (password: string) => {
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  return passwordHash;
};

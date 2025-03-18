import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    domains: ["lh3.googleusercontent.com", "hxyrctu3dn.ufs.sh"],
  },
};

export default nextConfig;

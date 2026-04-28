import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Ignore system files to prevent Windows "EINVAL: invalid argument, lstat 'C:\pagefile.sys'" watchpack errors
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: ['**/node_modules/**', '**/pagefile.sys', '**/hiberfil.sys', '**/DumpStack.log.tmp', '**/*.sys'],
      };
    }
    return config;
  },
};

export default nextConfig;

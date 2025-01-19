import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/cats/:dog/:bird",
  //       destination: "/fetch/:bird/:dog",
  //       permanent: true,
  //     },
  //   ];
  // },
  // webpack: (config) => {
  //   // config.module.rules.push({
  //   //   test: /\.mts$/,
  //   //   use: [
  //   //     {
  //   //       loader: "ts-loader",
  //   //       options: {
  //   //         transpileOnly: true, // Skip type checking for faster builds
  //   //       },
  //   //     },
  //   //   ],
  //   //   exclude: /node_modules/,
  //   // });
  //   // Add `.mts` to resolve.extensions
  //   config.resolve.extensions.push(".mts");
  //   return config;
  // },
  /* config options here */
};

export default nextConfig;

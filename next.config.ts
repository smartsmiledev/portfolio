import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // On GitHub Pages the site lives at /test-portfolio/, so assets must be
  // prefixed with the repo name in production. Locally (dev) no prefix is needed.
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : "",
};

export default nextConfig;

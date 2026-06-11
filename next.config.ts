import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(fileURLToPath(new URL(".", import.meta.url))),
  },
};

export default nextConfig;

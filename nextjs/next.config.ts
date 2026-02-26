import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    productionBrowserSourceMaps: true,
    images: {
        unoptimized: true,
        domains: ["thelastmilenyc.com"],
    },
};

export default nextConfig;

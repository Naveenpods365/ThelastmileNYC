import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    productionBrowserSourceMaps: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "thelastmilenyc.com",
            },
        ],
    },
};

export default nextConfig;

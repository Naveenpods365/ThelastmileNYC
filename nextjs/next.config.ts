import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

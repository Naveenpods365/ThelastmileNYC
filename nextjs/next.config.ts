import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // Static export for Netlify deployment
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

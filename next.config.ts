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
            {
                protocol: "https",
                hostname: "thelastmilenyc.umananda.in",
            },
            {
                protocol: "https",
                hostname: "clientblob1.blob.core.windows.net",
            },
            {
                protocol: "https",
                hostname: "yourstorage.blob.core.windows.net",
            },
        ],
    },
};

export default nextConfig;

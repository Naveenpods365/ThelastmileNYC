import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: "export", // Re-enable for production build (Netlify static export)
    // NOTE: Commenting this out for local dev — static export requires all dynamic
    // route params to be returned by generateStaticParams() at build time.
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

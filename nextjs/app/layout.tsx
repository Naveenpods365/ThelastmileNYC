import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home - The Last Mile NYC",
    description: "The Last Mile NYC - Revolutionizing Last Mile Delivery",
    metadataBase: new URL("https://thelastmilenyc.com"),
    openGraph: {
        locale: "en_US",
        type: "website",
        title: "Home - The Last Mile NYC",
        description: "The Last Mile NYC - Revolutionizing Last Mile Delivery",
        siteName: "The Last Mile NYC",
        images: [
            {
                url: "https://thelastmilenyc.com/wp-content/uploads/2025/08/home-new.png",
                width: 1200,
                height: 630,
                alt: "The Last Mile NYC",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Home - The Last Mile NYC",
        description: "The Last Mile NYC - Revolutionizing Last Mile Delivery",
        images: [
            "https://thelastmilenyc.com/wp-content/uploads/2025/08/home-new.png",
        ],
    },
    icons: {
        icon: "/images/favicon.png",
        shortcut: "/images/favicon.png",
        apple: "/images/favicon.png",
    },
    manifest: "/manifest.json",
    other: {
        "msapplication-TileImage": "/images/favicon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-US">
            <head>
                <link rel="preload" href="/images/home-new.png" as="image" />
                <style>{`
          .header{width:100%;min-height:70px;}
          .header__mobile{display:none;align-items:center;justify-content:space-between;gap:16px;position:relative;z-index:60;overflow:visible;}
          .header__mobile-right{display:flex;align-items:center;gap:14px;overflow:visible;}
          .header__linkedin{display:inline-flex;align-items:center;gap:12px;white-space:nowrap;}
          .header__desktop{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;}
          @media (max-width:1200px){
            .header{min-height:64px;}
            .header__mobile{display:flex;}
            .header__desktop{display:none;}
          }
        `}</style>
            </head>
            <body className={inter.className} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}

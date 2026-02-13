import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home - The Last Mile NYC',
  description: 'The Last Mile NYC - Revolutionizing Last Mile Delivery',
  metadataBase: new URL('https://thelastmilenyc.com'),
  openGraph: {
    locale: 'en_US',
    type: 'website',
    title: 'Home - The Last Mile NYC',
    description: 'The Last Mile NYC - Revolutionizing Last Mile Delivery',
   
    siteName: 'The Last Mile NYC',
    images: [
      {
        url: 'https://thelastmilenyc.com/wp-content/uploads/2025/08/home-new.png',
        width: 1200,
        height: 630,
        alt: 'The Last Mile NYC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home - The Last Mile NYC',
    description: 'The Last Mile NYC - Revolutionizing Last Mile Delivery',
    images: ['https://thelastmilenyc.com/wp-content/uploads/2025/08/home-new.png'],
  },
  icons: {
    icon: 'https://thelastmilenyc.com/wp-content/uploads/2026/02/Group-1321315420-1.png',
    shortcut: 'https://thelastmilenyc.com/wp-content/uploads/2026/02/Group-1321315420-1.png',
    apple: 'https://thelastmilenyc.com/wp-content/uploads/2026/02/Group-1321315420-1.png',
  },
  other: {
    'msapplication-TileImage': 'https://thelastmilenyc.com/wp-content/uploads/2026/02/Group-1321315420-1.png',
  },
};
// logijk\
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

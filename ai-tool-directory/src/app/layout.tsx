import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import localFont from 'next/font/local';
import CleanHash from "./components/CleanHash";

const geist = localFont({
  src: [
    { path: './fonts/Geist-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Geist-Bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-geist'
});

const geistMono = localFont({
  src: [
    { path: './fonts/GeistMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeistMono-Bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: "Toolaize - Discover the best AI tools",
  description: "Toolaize helps you discover, compare, and leverage the best AI tools for every task.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (window.location.hash && window.location.hash.includes('access_token')) {
              history.replaceState(null, '', window.location.pathname + window.location.search);
            }
          `
        }} />
        {/* ... existing code ... */}
      </head>
      <body>
        <CleanHash />
        <Navbar />
        {/* 其他内容 */}
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import localFont from 'next/font/local';

const geist = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className={geist.className}>
      <body>
        <Navbar />
        {/* 其他内容 */}
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}

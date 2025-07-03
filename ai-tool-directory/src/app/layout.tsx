import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import localFont from 'next/font/local';

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
        {/* Google Analytics 代码 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3YZDFWD1MK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3YZDFWD1MK');
            `,
          }}
        />
      </head>
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

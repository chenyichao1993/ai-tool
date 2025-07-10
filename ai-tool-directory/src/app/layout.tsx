import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import localFont from 'next/font/local';
import CleanHash from "./components/CleanHash";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useRouter } from "next/navigation";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const access_token = url.searchParams.get("access_token");
      const refresh_token = url.searchParams.get("refresh_token");
      const token = url.searchParams.get("token");
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token }).then(() => {
          router.refresh();
          router.push("/");
        });
      } else if (token) {
        if (supabase.auth.exchangeCodeForSession) {
          supabase.auth.exchangeCodeForSession(token).then(() => {
            router.refresh();
            router.push("/");
          });
        }
      }
    }
  }, []);
  return (
    <html lang="en" className={`
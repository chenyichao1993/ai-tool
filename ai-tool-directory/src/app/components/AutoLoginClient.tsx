"use client";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AutoLoginClient() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const access_token = url.searchParams.get("access_token");
      const refresh_token = url.searchParams.get("refresh_token");
      const token = url.searchParams.get("token");
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token }).then(() => {
          // 移除 router.refresh() 避免无限重渲染
          router.push("/");
        });
      } else if (token) {
        if (supabase.auth.exchangeCodeForSession) {
          supabase.auth.exchangeCodeForSession(token).then(() => {
            // 移除 router.refresh() 避免无限重渲染
            router.push("/");
          });
        }
      }
    }
  }, []);

  // Google Analytics 路由变化追踪
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag('config', 'G-3YZDFWD1MK', {
          page_path: window.location.pathname + window.location.search,
        });
      }
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('pushState', handleRouteChange);
    window.addEventListener('replaceState', handleRouteChange);
    // Next.js 13+ App Router下，页面切换时popstate会触发
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('pushState', handleRouteChange);
      window.removeEventListener('replaceState', handleRouteChange);
    };
  }, []);

  return null;
} 
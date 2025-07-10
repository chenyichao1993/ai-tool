"use client";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

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
  return null;
} 
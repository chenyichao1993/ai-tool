"use client";
import { useEffect } from "react";

export default function CleanHash() {
  useEffect(() => {
    function clean() {
      if (window.location.hash && window.location.hash.includes('access_token')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    clean();
    // 延迟兜底清理，防止 SSR 首次渲染未挂载时 hash 没被清理
    setTimeout(clean, 100);
    window.addEventListener('hashchange', clean);
    return () => window.removeEventListener('hashchange', clean);
  }, []);
  return null;
} 
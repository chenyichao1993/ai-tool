"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../supabaseClient";

const PRIMARY_COLOR = "#7b61ff";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setMsg("Invalid or missing token. Please use the reset link from your email.");
    }
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (!password || password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMsg(error.message);
    } else {
      setMsg("Password reset successful! You can now log in.");
      setTimeout(() => router.push("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <Suspense>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fafbfc" }}>
        <div style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: 32, margin: 16 }}>
          <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: 24, color: PRIMARY_COLOR, marginBottom: 24 }}>Reset Password</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd", fontSize: 16 }}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd", fontSize: 16 }}
            />
            {msg && <div style={{ color: msg.includes("successful") ? PRIMARY_COLOR : "red", fontSize: 14 }}>{msg}</div>}
            <button type="submit" disabled={loading || !accessToken} style={{ padding: 12, borderRadius: 6, background: PRIMARY_COLOR, color: "#fff", border: "none", fontWeight: 700, fontSize: 16, marginTop: 4 }}>
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
} 
"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PRIMARY_COLOR = "#7b61ff";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      if (result.error) {
        setError(result.error.message);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg("");
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) {
      setResetMsg(error.message);
    } else {
      setResetMsg("Password reset email sent! Please check your inbox.");
    }
    setResetLoading(false);
  };

  useEffect(() => {
    // 处理 Google OAuth 登录后 URL 带有 #access_token 的情况
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      if (hash.includes('access_token') || hash.includes('refresh_token')) {
        // 清理 hash 并跳转到首页
        window.location.hash = '';
        router.replace('/');
      }
    }
    if (emailRef.current) emailRef.current.setAttribute('oninvalid', "this.setCustomValidity('Please fill out this field.')");
    if (emailRef.current) emailRef.current.setAttribute('oninput', "this.setCustomValidity('')");
    if (passwordRef.current) passwordRef.current.setAttribute('oninvalid', "this.setCustomValidity('Please fill out this field.')");
    if (passwordRef.current) passwordRef.current.setAttribute('oninput', "this.setCustomValidity('')");
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#fafbfc" }}>
      <div style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: 32, margin: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <Image src="/logo.png" alt="logo" width={56} height={56} />
          <h1 style={{ fontWeight: 700, fontSize: 28, margin: "16px 0 0 0", color: PRIMARY_COLOR }}>Toolaize</h1>
        </div>
        <h2 style={{ textAlign: "center", fontWeight: 600, fontSize: 22, marginBottom: 24 }}>{isLogin ? "Sign in to your account" : "Sign up for an account"}</h2>
        <button onClick={handleGoogle} disabled={loading} style={{ width: "100%", background: "#fff", border: `1px solid ${PRIMARY_COLOR}`, color: PRIMARY_COLOR, borderRadius: 6, padding: 10, fontWeight: 600, marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
          <img src="/social/google.png" alt="Google" width={22} height={22} style={{display:'inline'}} />
          Continue with Google
        </button>
        <div style={{ textAlign: "center", color: "#aaa", margin: "8px 0 16px 0" }}>or continue with</div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd", fontSize: 16 }}
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd", fontSize: 16 }}
          />
          {error && <div style={{ color: "red", fontSize: 14 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 6, background: PRIMARY_COLOR, color: "#fff", border: "none", fontWeight: 700, fontSize: 16, marginTop: 4 }}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 14 }}>
          <span style={{ color: PRIMARY_COLOR, cursor: "pointer" }} onClick={() => setShowReset(true)}>Forgot your password?</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 15 }}>
          {isLogin ? (
            <>Don't have an account yet? <span style={{ color: PRIMARY_COLOR, cursor: "pointer" }} onClick={() => setIsLogin(false)}>Sign Up</span></>
          ) : (
            <>Already have an account? <span style={{ color: PRIMARY_COLOR, cursor: "pointer" }} onClick={() => setIsLogin(true)}>Sign In</span></>
          )}
        </div>
      </div>
      {showReset && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 28, minWidth: 280, maxWidth: '90vw', boxShadow: '0 2px 16px rgba(0,0,0,0.12)', position: 'relative' }}>
            <h3 style={{ marginBottom: 16 }}>Reset Password</h3>
            <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <button type="submit" disabled={resetLoading} style={{ padding: 10, borderRadius: 4, background: PRIMARY_COLOR, color: '#fff', border: 'none', fontWeight: 600 }}>
                {resetLoading ? 'Sending...' : 'Send Reset Email'}
              </button>
              {resetMsg && <div style={{ color: resetMsg.includes('sent') ? PRIMARY_COLOR : 'red', fontSize: 14 }}>{resetMsg}</div>}
            </form>
            <button onClick={() => { setShowReset(false); setResetMsg(""); setResetEmail(""); }} style={{ position: 'absolute', top: 10, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { supabase } from "./supabaseClient";
import type { User } from '@supabase/supabase-js';

const navLinks = [
  { name: { en: "Home", zh: "首页" }, href: "/" },
  { name: { en: "Categories", zh: "分类" }, href: "/categories" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en'|'zh'>('en');
  const [showLang, setShowLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const toggleLang = () => setLang(l => l === 'en' ? 'zh' : 'en');
  const handleLangClick = () => setShowLang(s => !s);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    // 获取当前用户
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
    // 监听登录状态变化
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => { listener?.subscription?.unsubscribe(); };
  }, []);

  useEffect(() => {
    console.log('当前user:', user);
  }, [user]);

  useEffect(() => {
    if (!showLang) return;
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLang(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLang]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logoWrap}>
          <Image src="/logo.png" alt="logo" width={48} height={48} />
          <Image src="/toolaize-logo.png" alt="Toolaize" width={140} height={32} style={{marginLeft: 0}} />
        </Link>
      </div>
      <div className={styles.desktopLinks}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.name[lang]}
          </Link>
        ))}
        <Link href="/submit" className={styles.actionBtn}>
          {lang === 'en' ? 'Submit Tool' : '提交工具'}
        </Link>
        <div className={styles.loginLangWrap}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                className={styles.loginBtn}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', minWidth: 40 }}
                onClick={() => setUserMenuOpen(v => !v)}
              >
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 8 }} />
                ) : (
                  <span style={{ fontWeight: 700, marginRight: 8 }}>
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </span>
                )}
                ▼
              </div>
              {userMenuOpen && (
                <div style={{ position: 'absolute', right: 0, top: 36, background: '#fff', border: '1px solid #eee', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 120, zIndex: 100 }}>
                  <Link href="/profile" className={styles.link} style={{ display: 'block', padding: 10, textAlign: 'left' }} onClick={()=>{setUserMenuOpen(false); setMenuOpen(false);}}>
                    {lang === 'en' ? 'Profile' : '个人中心'}
                  </Link>
                  <div style={{ borderTop: '1px solid #eee' }} />
                  <div
                    className={styles.link}
                    style={{ display: 'block', padding: 10, textAlign: 'left', cursor: 'pointer' }}
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUser(null);
                      setUserMenuOpen(false);
                      setMenuOpen(false);
                      router.refresh();
                    }}
                  >
                    {lang === 'en' ? 'Logout' : '退出登录'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" legacyBehavior>
              <a className={styles.loginBtn}>{lang === 'en' ? 'Login' : '登录'}</a>
            </Link>
          )}
          <div className={styles.langSwitcher} onClick={handleLangClick} tabIndex={0} ref={langRef}>
            <span className={styles.langIcon} role="img" aria-label="language">🌐</span>
            <span className={styles.langText}>{lang === 'en' ? 'EN' : '中文'}</span>
            <span className={styles.langArrow}>▼</span>
            {showLang && (
              <div className={styles.langDropdown} onClick={toggleLang}>
                {lang === 'en' ? '中文' : 'EN'}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      {menuOpen && (
        <>
          <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.15)', zIndex: 9998}} onClick={() => { setMenuOpen(false); setShowLang(false); }} />
          <div className={styles.mobileMenu} style={{zIndex: 9999}} onClick={e => e.stopPropagation()}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={styles.mobileLink} onClick={()=>setMenuOpen(false)}>
                {link.name[lang]}
              </Link>
            ))}
            <Link href="/submit" className={styles.actionBtn} onClick={()=>setMenuOpen(false)}>
              {lang === 'en' ? 'Submit Tool' : '提交工具'}
            </Link>
            <div className={styles.loginLangWrap}>
              {user ? (
                <div style={{ position: 'relative' }}>
                  <div
                    className={styles.loginBtn}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', minWidth: 40 }}
                    onClick={() => setUserMenuOpen(v => !v)}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 8 }} />
                    ) : (
                      <span style={{ fontWeight: 700, marginRight: 8 }}>
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                      </span>
                    )}
                    ▼
                  </div>
                  {userMenuOpen && (
                    <div style={{ position: 'absolute', right: 0, top: 36, background: '#fff', border: '1px solid #eee', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 120, zIndex: 100 }}>
                      <Link href="/profile" className={styles.link} style={{ display: 'block', padding: 10, textAlign: 'left' }} onClick={()=>{setUserMenuOpen(false); setMenuOpen(false);}}>
                        {lang === 'en' ? 'Profile' : '个人中心'}
                      </Link>
                      <div style={{ borderTop: '1px solid #eee' }} />
                      <div
                        className={styles.link}
                        style={{ display: 'block', padding: 10, textAlign: 'left', cursor: 'pointer' }}
                        onClick={async () => {
                          await supabase.auth.signOut();
                          setUser(null);
                          setUserMenuOpen(false);
                          setMenuOpen(false);
                          router.refresh();
                        }}
                      >
                        {lang === 'en' ? 'Logout' : '退出登录'}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a className={styles.loginBtn} href="/login" onClick={e => { e.preventDefault(); setMenuOpen(false); router.push('/login'); }}>{lang === 'en' ? 'Login' : '登录'}</a>
              )}
              <div className={styles.langSwitcher} onClick={handleLangClick} tabIndex={0} ref={langRef}>
                <span className={styles.langIcon} role="img" aria-label="language">🌐</span>
                <span className={styles.langText}>{lang === 'en' ? 'EN' : '中文'}</span>
                <span className={styles.langArrow}>▼</span>
                {showLang && (
                  <div className={styles.langDropdown} onClick={toggleLang}>
                    {lang === 'en' ? '中文' : 'EN'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
} 
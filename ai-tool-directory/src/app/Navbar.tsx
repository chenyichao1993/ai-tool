'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";

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
          <button className={styles.loginBtn}>{lang === 'en' ? 'Login' : '登录'}</button>
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
              <button className={styles.loginBtn}>{lang === 'en' ? 'Login' : '登录'}</button>
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
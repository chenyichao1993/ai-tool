'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';

function getInitial(user: any) {
  // 优先昵称首字符，否则邮箱首字符
  if (user.user_metadata?.full_name && user.user_metadata.full_name.length > 0) {
    return user.user_metadata.full_name[0];
  }
  if (user.email && user.email.length > 0) {
    return user.email[0];
  }
  return '?';
}

function getDisplayName(user: any) {
  if (user.user_metadata?.full_name && user.user_metadata.full_name.length > 0) {
    return user.user_metadata.full_name;
  }
  if (user.email && user.email.length > 0) {
    return user.email.split('@')[0];
  }
  return 'User';
}

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, []);

  if (!user) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Not logged in.</div>;
  }

  const initial = getInitial(user);
  const displayName = getDisplayName(user);
  const email = user.email;
  const createdAt = user.created_at;
  const userId = user.id;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const btnStyle = {
    margin: '12px 0 18px 0',
    padding: '8px 24px',
    borderRadius: 8,
    background: '#fff',
    color: '#222',
    border: '1.5px solid #222',
    fontWeight: 500,
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: hover ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
    transition: 'box-shadow 0.18s',
    outline: 'none',
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: 380,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        padding: 36,
        margin: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* 头像 */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#ede9fe', // 品牌淡紫色
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          fontWeight: 700,
          color: '#7b61ff',
          marginBottom: 18,
          userSelect: 'none',
        }}>{initial}</div>
        {/* 昵称/邮箱前缀 */}
        <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 6, textAlign: 'center' }}>{displayName}</div>
        {/* 邮箱 */}
        <div style={{ fontSize: 16, color: '#888', marginBottom: 18, textAlign: 'center' }}>{email}</div>
        {/* 登出按钮（可选） */}
        <button
          onClick={handleLogout}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={btnStyle}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4}}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
        {/* 注册时间和ID */}
        <div style={{ width: '100%', marginTop: 18, fontSize: 13, color: '#aaa', textAlign: 'left', wordBreak: 'break-all' }}>
          <div><b>Created At:</b> {formatDate(createdAt)}</div>
          <div><b>User ID:</b> {userId}</div>
        </div>
      </div>
    </div>
  );
} 
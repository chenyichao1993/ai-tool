'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

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

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

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
        {/* <button style={{ margin: '12px 0 18px 0', padding: '8px 24px', borderRadius: 6, background: '#7b61ff', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Logout</button> */}
        {/* 注册时间和ID */}
        <div style={{ width: '100%', marginTop: 18, fontSize: 13, color: '#aaa', textAlign: 'left', wordBreak: 'break-all' }}>
          <div><b>Created At:</b> {createdAt}</div>
          <div><b>User ID:</b> {userId}</div>
        </div>
      </div>
    </div>
  );
} 
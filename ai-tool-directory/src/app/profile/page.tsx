'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

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

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Profile</h2>
      <div style={{ fontSize: 18, marginBottom: 12 }}><b>Email:</b> {user.email}</div>
      <div style={{ fontSize: 18, marginBottom: 12 }}><b>User ID:</b> {user.id}</div>
      <div style={{ fontSize: 18, marginBottom: 12 }}><b>Created At:</b> {user.created_at}</div>
    </div>
  );
} 
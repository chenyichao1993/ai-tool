import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
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
        onLogin(result.data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 300, maxWidth: '90vw', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
        <h2 style={{ marginBottom: 16 }}>{isLogin ? '登录' : '注册'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 4, background: '#7b61ff', color: '#fff', border: 'none', fontWeight: 600 }}>
            {loading ? '处理中...' : isLogin ? '登录' : '注册'}
          </button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14, textAlign: 'center' }}>
          {isLogin ? (
            <>
              没有账号？ <span style={{ color: '#7b61ff', cursor: 'pointer' }} onClick={() => setIsLogin(false)}>注册</span>
            </>
          ) : (
            <>
              已有账号？ <span style={{ color: '#7b61ff', cursor: 'pointer' }} onClick={() => setIsLogin(true)}>登录</span>
            </>
          )}
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
      </div>
    </div>
  );
};

export default LoginModal; 
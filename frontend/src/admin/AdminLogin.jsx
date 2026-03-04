import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Lock, Eye, EyeOff, Code2, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) return toast.error('Please enter your password.');
        setLoading(true);
        try {
            await login(password);
            toast.success('Welcome back! 🚀');
            navigate('/admin/dashboard');
        } catch {
            toast.error('Invalid password. Access denied.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
            {/* BG glow */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="card" style={{ width: '100%', maxWidth: 400, padding: 40 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <ShieldCheck size={30} color="var(--accent)" />
                    </div>
                    <h1 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: 6 }}>Admin Access</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Enter your password to manage the portfolio.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 24 }}>
                        <label htmlFor="admin-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} color="var(--muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            <input
                                id="admin-password"
                                type={show ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', borderRadius: 10, padding: '13px 44px', color: 'var(--text)', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}
                            />
                            <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
                                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        id="admin-login-btn"
                        disabled={loading}
                        style={{ width: '100%', background: loading ? 'rgba(0,255,136,0.5)' : 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '13px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s' }}
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <a href="/" style={{ color: 'var(--muted)', fontSize: '0.85rem', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >← Back to Portfolio</a>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Trash2, MailOpen, Mail, Loader2, User2, Clock } from 'lucide-react';
import api from '../api/api';

export default function ManageMessages() {
    const [msgs, setMsgs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMsgs = useCallback(() => {
        setLoading(true);
        api.get('/contact').then(r => setMsgs(r.data?.data || [])).catch(() => toast.error('Failed to load messages')).finally(() => setLoading(false));
    }, []);

    useEffect(fetchMsgs, [fetchMsgs]);

    const markRead = async (id) => {
        try {
            await api.patch(`/contact/${id}/read`);
            setMsgs(msgs.map(m => m._id === id ? { ...m, read: true } : m));
        } catch { toast.error('Failed to update.'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this message?')) return;
        try { await api.delete(`/contact/${id}`); toast.success('Message deleted.'); fetchMsgs(); }
        catch { toast.error('Failed to delete.'); }
    };

    const unread = msgs.filter(m => !m.read).length;

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Messages</h1>
                    {unread > 0 && <span style={{ background: 'rgba(0,255,136,0.15)', color: 'var(--accent)', borderRadius: 20, padding: '3px 10px', fontSize: '0.8rem', fontWeight: 700 }}>{unread} unread</span>}
                </div>
                <p style={{ color: 'var(--muted)' }}>Contact form submissions from your portfolio.</p>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Loader2 size={36} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} /></div>
            ) : msgs.length === 0 ? (
                <div className="card" style={{ padding: 60, textAlign: 'center' }}>
                    <Mail size={48} color="var(--muted)" style={{ margin: '0 auto 16px' }} />
                    <p style={{ color: 'var(--muted)' }}>No messages yet. Contact submissions will appear here.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {msgs.map(msg => (
                        <div key={msg._id} className="card" style={{ padding: 20, borderLeft: msg.read ? '3px solid transparent' : '3px solid var(--accent)', opacity: msg.read ? 0.7 : 1, transition: 'all 0.3s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,255,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <User2 size={18} color="var(--accent)" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{msg.name}</p>
                                            <a href={`mailto:${msg.email}`} style={{ color: 'var(--accent)', fontSize: '0.82rem', textDecoration: 'none' }}>{msg.email}</a>
                                        </div>
                                        {!msg.read && <span style={{ background: 'rgba(0,255,136,0.15)', color: 'var(--accent)', borderRadius: 20, padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>New</span>}
                                    </div>
                                    <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 8, paddingLeft: 46, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 46, color: 'var(--muted)', fontSize: '0.78rem' }}>
                                        <Clock size={12} />
                                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                    {!msg.read && (
                                        <button onClick={() => markRead(msg._id)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.08)', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600, transition: 'all 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,136,0.15)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,136,0.08)'}
                                        >
                                            <MailOpen size={14} /> Mark Read
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(msg._id)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

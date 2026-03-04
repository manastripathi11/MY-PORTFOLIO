import { useState, useEffect } from 'react';
import { FolderKanban, Briefcase, Mail, TrendingUp } from 'lucide-react';
import api from '../api/api';

export default function Dashboard() {
    const [stats, setStats] = useState({ projects: 0, experiences: 0, messages: 0, unread: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/projects').catch(() => ({ data: { count: 0 } })),
            api.get('/experience').catch(() => ({ data: { count: 0 } })),
            api.get('/contact').catch(() => ({ data: { count: 0, data: [] } })),
        ]).then(([p, e, m]) => {
            const msgs = m.data?.data || [];
            setStats({
                projects: p.data?.count || 0,
                experiences: e.data?.count || 0,
                messages: m.data?.count || 0,
                unread: msgs.filter(msg => !msg.read).length,
            });
        }).finally(() => setLoading(false));
    }, []);

    const cards = [
        { icon: FolderKanban, label: 'Projects', value: stats.projects, color: '#00ff88', bg: 'rgba(0,255,136,0.08)', href: '/admin/projects' },
        { icon: Briefcase, label: 'Experiences', value: stats.experiences, color: '#00bcd4', bg: 'rgba(0,188,212,0.08)', href: '/admin/experiences' },
        { icon: Mail, label: 'Messages', value: stats.messages, color: '#a855f7', bg: 'rgba(168,85,247,0.08)', href: '/admin/messages' },
        { icon: TrendingUp, label: 'Unread', value: stats.unread, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', href: '/admin/messages' },
    ];

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>Dashboard</h1>
                <p style={{ color: 'var(--muted)' }}>Overview of your portfolio content.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
                {cards.map(({ icon: Icon, label, value, color, bg, href }) => (
                    <a key={label} href={href} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ padding: 24, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={22} color={color} />
                                </div>
                            </div>
                            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</p>
                            <p style={{ fontSize: '2rem', fontWeight: 800, color }}>{loading ? '–' : value}</p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="card" style={{ padding: 28 }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 16 }}>Quick Actions</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {[
                        { label: '+ Add Project', href: '/admin/projects', color: 'var(--accent)' },
                        { label: '+ Add Experience', href: '/admin/experiences', color: '#00bcd4' },
                        { label: '📬 View Messages', href: '/admin/messages', color: '#a855f7' },
                        { label: '🌐 View Portfolio', href: '/', color: 'var(--muted)' },
                    ].map(({ label, href, color }) => (
                        <a key={label} href={href} target={href === '/' ? '_blank' : undefined} rel="noreferrer"
                            style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${color}40`, color, textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >{label}</a>
                    ))}
                </div>
            </div>
        </div>
    );
}

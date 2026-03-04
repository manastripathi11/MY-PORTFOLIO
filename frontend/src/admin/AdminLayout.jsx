import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, Briefcase, Mail, LogOut, Code2, ExternalLink } from 'lucide-react';

const NAV = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/admin/experiences', icon: Briefcase, label: 'Experience' },
    { to: '/admin/messages', icon: Mail, label: 'Messages' },
];

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate('/admin/login'); };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
            {/* Sidebar */}
            <aside style={{ width: 240, background: 'var(--bg-card)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Code2 size={18} color="var(--accent)" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>Portfolio</p>
                            <p style={{ color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 600 }}>Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '16px 12px' }}>
                    {NAV.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, marginBottom: 4, textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.2s',
                                background: isActive ? 'rgba(0,255,136,0.1)' : 'transparent',
                                color: isActive ? 'var(--accent)' : 'var(--muted)',
                                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                            })}
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <a href="/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, textDecoration: 'none', color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 500, transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        <ExternalLink size={16} /> View Site
                    </a>
                    <button onClick={handleLogout} id="admin-logout" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 500, width: '100%', textAlign: 'left', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                <Outlet />
            </main>
        </div>
    );
}

import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: '#0a0e14', borderTop: '1px solid #30363d', padding: '40px 24px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24, marginBottom: 32 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Code2 size={20} color="var(--accent)" />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Manas<span style={{ color: 'var(--accent)' }}>Tripathi</span></span>
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: 300 }}>
                            Full Stack Developer crafting modern web experiences with passion and precision.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        {[
                            { icon: Github, href: 'https://github.com/manastripathi11', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/manas-tripathi-4438191b9', label: 'LinkedIn' },
                            { icon: Mail, href: '#contact', label: 'Email' },
                        ].map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel="noreferrer"
                                aria-label={label}
                                style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(0,255,136,0.08)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #30363d', paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--muted)', fontSize: '0.85rem' }}>
                    <span>Built with</span>
                    <Heart size={14} color="var(--accent)" fill="var(--accent)" />
                    <span>by Manas Tripathi • {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}

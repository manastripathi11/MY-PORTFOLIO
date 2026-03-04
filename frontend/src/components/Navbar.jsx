import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const NAV_LINKS = [
    { href: '#hero', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setOpen(false);
        };
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const handleClick = (href) => {
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled ? 'rgba(13,17,23,0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid #30363d' : 'none',
                transition: 'all 0.3s ease',
                padding: '0 24px',
            }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                {/* Logo */}
                <a href="#hero" onClick={() => handleClick('#hero')} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Code2 size={18} color="var(--accent)" />
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>Manas<span style={{ color: 'var(--accent)' }}>Tripathi</span></span>
                </a>

                {/* Desktop nav */}
                {!isMobile && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l.href}
                                onClick={() => handleClick(l.href)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500, padding: '8px 14px', borderRadius: 8, transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(0,255,136,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'none'; }}
                            >{l.label}</button>
                        ))}
                        <button
                            onClick={() => handleClick('#contact')}
                            style={{ marginLeft: 8, background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >Hire Me</button>
                    </div>
                )}

                {/* Hamburger */}
                {isMobile && (
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', padding: 8 }}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
            </div>

            {/* Mobile drawer */}
            {isMobile && open && (
                <div style={{ background: 'rgba(22,27,34,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid #30363d', padding: '8px 16px 20px' }}>
                    {NAV_LINKS.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => handleClick(l.href)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '12px 8px', fontSize: '1rem', fontWeight: 500, fontFamily: 'Inter, sans-serif', borderBottom: '1px solid rgba(48,54,61,0.5)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                        >{l.label}</button>
                    ))}
                    <button
                        onClick={() => handleClick('#contact')}
                        style={{ marginTop: 12, width: '100%', background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                    >Hire Me</button>
                </div>
            )}
        </nav>
    );
}

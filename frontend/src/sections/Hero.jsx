import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import profilePhoto from '../assets/profile-photo.png';
import ResumeModal from '../components/ResumeModal';

const ROLES = ['Full Stack Developer', 'React Developer', 'Node.js Developer', 'Problem Solver'];

export default function Hero() {
    const [roleIdx, setRoleIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        const current = ROLES[roleIdx];
        let timeout;
        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        } else if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setRoleIdx((i) => (i + 1) % ROLES.length);
        }
        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, roleIdx]);

    const fade = { hidden: { opacity: 0, y: 30 }, visible: (d) => ({ opacity: 1, y: 0, transition: { delay: d * 0.15, duration: 0.6 } }) };

    return (
        <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
            {/* BG glow orbs */}
            <div style={{ position: 'absolute', top: '15%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 60, justifyContent: 'space-between' }}>
                {/* Text */}
                <div style={{ flex: '1 1 480px' }}>
                    <motion.div custom={0} variants={fade} initial="hidden" animate="visible">
                        <span className="section-label">👋 Hi, I'm</span>
                    </motion.div>

                    <motion.h1 custom={1} variants={fade} initial="hidden" animate="visible" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
                        Manas <span className="gradient-text">Tripathi</span>
                    </motion.h1>

                    <motion.div custom={2} variants={fade} initial="hidden" animate="visible" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontWeight: 600, color: 'var(--accent)', minHeight: 40, marginBottom: 20 }}>
                        {displayed}<span style={{ borderRight: '2px solid var(--accent)', animation: 'blink 0.7s infinite', marginLeft: 2 }}>&nbsp;</span>
                    </motion.div>

                    <motion.p custom={3} variants={fade} initial="hidden" animate="visible" style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 520, marginBottom: 32 }}>
                        I build fast, scalable web applications using the MERN stack with a focus on clean architecture, intuitive design, and real-world performance. Always exploring, always building.
                    </motion.p>

                    <motion.div custom={4} variants={fade} initial="hidden" animate="visible" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                        <button
                            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="glow-btn"
                            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '13px 28px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <Mail size={18} /> Get in Touch
                        </button>
                        <button
                            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text)', border: '1px solid #30363d', borderRadius: 10, padding: '13px 28px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--text)'; }}
                        >
                            <ExternalLink size={18} /> View Work
                        </button>
                        <button
                            onClick={() => setShowResume(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text)', border: '1px solid #30363d', borderRadius: 10, padding: '13px 28px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--text)'; }}
                        >
                            <Download size={18} /> Resume
                        </button>
                    </motion.div>

                    <motion.div custom={5} variants={fade} initial="hidden" animate="visible" style={{ display: 'flex', gap: 12 }}>
                        {[
                            { icon: Github, href: 'https://github.com/manastripathi11', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/manas-tripathi-4438191b9', label: 'LinkedIn' },
                            { icon: Mail, href: 'mailto:manastripathi22@gmail.com', label: 'Email' },
                        ].map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0,255,136,0.08)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Avatar */}
                <motion.div custom={2} variants={fade} initial="hidden" animate="visible" className="float-anim" style={{ flex: '0 0 auto' }}>
                    <div style={{ position: 'relative', width: 320, height: 320 }}>
                        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'conic-gradient(from 0deg, #00ff88, #00bcd4, #7c3aed, #00ff88)', animation: 'gradient-shift 3s linear infinite' }} />
                        <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #161b22, #1c2128)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>
                                <img src={profilePhoto} alt="Manas Tripathi" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                        </div>
                        {/* Floating badges */}
                        <div style={{ position: 'absolute', bottom: 20, right: -20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                            Full Stack Developer
                        </div>
                        <div style={{ position: 'absolute', top: 20, left: -20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 600, color: '#00bcd4', whiteSpace: 'nowrap', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                            Open to Work
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* scroll indicator */}
            <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: '0.75rem', animation: 'float 2s ease-in-out infinite' }}>
                <span>Scroll</span>
                <ArrowDown size={16} />
            </div>

            {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
        </section>
    );
}

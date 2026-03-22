import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function SkillBadge({ name, accent, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                padding: '16px 10px',
                borderRadius: 12,
                border: '1px solid transparent',
                cursor: 'default',
                transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
                // Parse hex to rgb for rgba
                const hexToRgb = (hex) => {
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    return `${r},${g},${b}`;
                };
                const rgb = hexToRgb(accent);
                e.currentTarget.style.background = `rgba(${rgb},0.08)`;
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${accent}30`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Letter Badge */}
            <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${accent}22`,
                border: `1.5px solid ${accent}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: accent,
                flexShrink: 0,
                letterSpacing: '-0.5px',
            }}>
                {name[0]}
            </div>
            {/* Name */}
            <span style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--muted)',
                textAlign: 'center',
                lineHeight: 1.3,
                letterSpacing: '0.01em',
            }}>{name}</span>
        </motion.div>
    );
}

// Fallback data in case the API is unreachable
const FALLBACK_SKILLS = [
    {
        _id: 'f1',
        category: 'Frontend',
        emoji: '🎨',
        accentColor: '#00ff88',
        items: [
            { name: 'React' }, { name: 'JavaScript' }, { name: 'HTML5' },
            { name: 'CSS3' }, { name: 'Tailwind CSS' }, { name: 'Framer Motion' },
        ],
    },
    {
        _id: 'f2',
        category: 'Backend',
        emoji: '⚙️',
        accentColor: '#00bcd4',
        items: [
            { name: 'Node.js' }, { name: 'Express.js' }, { name: 'MongoDB' },
            { name: 'REST APIs' }, { name: 'JWT Auth' },
        ],
    },
    {
        _id: 'f3',
        category: 'Tools & DevOps',
        emoji: '🛠️',
        accentColor: '#a855f7',
        items: [
            { name: 'GitHub' }, { name: 'Postman' }, { name: 'VS Code' },
            { name: 'Vite' }, { name: 'Vercel' },
        ],
    },
];

export default function Skills() {
    const [skillGroups, setSkillGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiBase = (import.meta.env.VITE_API_URL || '') + '/api';
        fetch(`${apiBase}/skills`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data?.length > 0) {
                    setSkillGroups(data.data);
                } else {
                    setSkillGroups(FALLBACK_SKILLS);
                }
            })
            .catch(() => setSkillGroups(FALLBACK_SKILLS))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="skills" style={{ padding: '100px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 60 }}
                >
                    <span className="section-label">My Arsenal</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800 }}>
                        Knowledge & <span className="gradient-text">Skills</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
                        Technologies and tools I use to bring ideas to life.
                    </p>
                </motion.div>

                {/* Skeleton loading */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="card" style={{ padding: 28, height: 240, background: 'rgba(255,255,255,0.02)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                        ))}
                    </div>
                ) : (
                    /* 3 Category cards */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                        {skillGroups.map((group, gi) => (
                            <motion.div
                                key={group._id || group.category}
                                className="card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: gi * 0.15 }}
                                style={{ padding: 28 }}
                            >
                                {/* Card header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 24,
                                    paddingBottom: 16,
                                    borderBottom: '1px solid var(--border)',
                                }}>
                                    <span style={{ fontSize: '1.4rem' }}>{group.emoji}</span>
                                    <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>
                                        {group.category}
                                    </h3>
                                    <div style={{
                                        marginLeft: 'auto',
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: group.accentColor,
                                        boxShadow: `0 0 8px ${group.accentColor}`,
                                    }} />
                                </div>

                                {/* Badge grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                                    {group.items.map((skill, i) => (
                                        <SkillBadge
                                            key={skill.name + i}
                                            name={skill.name}
                                            accent={group.accentColor}
                                            index={i}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

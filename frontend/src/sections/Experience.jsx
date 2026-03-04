import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Loader2, Calendar, MapPin } from 'lucide-react';
import api from '../api/api';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/experience')
            .then(res => {
                const data = res.data?.data || [];
                setExperiences(data);
            })
            .catch(() => setExperiences([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="experience" style={{ padding: '100px 24px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 60 }}>
                    <span className="section-label">Career</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800 }}>
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', marginTop: 12, maxWidth: 400, margin: '12px auto 0' }}>
                        My journey through tech roles and the impact I've made.
                    </p>
                </motion.div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                        <Loader2 size={40} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : experiences.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
                        <Briefcase size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
                        <p>No experience added yet.</p>
                    </div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        {/* Timeline line */}
                        <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--accent), transparent)', zIndex: 0 }} />

                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp._id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative', zIndex: 1 }}
                            >
                                {/* Icon */}
                                <div style={{ flexShrink: 0, width: 58, height: 58, borderRadius: '50%', background: exp.current ? 'var(--accent)' : 'var(--bg-card)', border: `2px solid ${exp.current ? 'var(--accent)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: exp.current ? '0 0 20px rgba(0,255,136,0.4)' : 'none' }}>
                                    <Briefcase size={22} color={exp.current ? '#0d1117' : 'var(--accent)'} />
                                </div>

                                {/* Card */}
                                <div className="card" style={{ flex: 1, padding: 24 }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                                        <div>
                                            <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{exp.role}</h3>
                                            <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>{exp.company}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--muted)', fontSize: '0.85rem', justifyContent: 'flex-end' }}>
                                                <Calendar size={14} />
                                                <span>{exp.duration}</span>
                                            </div>
                                            {exp.current && (
                                                <span style={{ background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.3)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600 }}>
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 16 }}>{exp.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {exp.techStack?.map(t => (
                                            <span key={t} style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.15)', color: 'var(--accent)', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem' }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import api from '../api/api';

function ProjectCard({ project, index }) {
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,255,136,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Image */}
            <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #161b22, #1c2128)' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                />
                {/* Fallback shown only when image fails to load */}
                <div style={{ display: 'none', width: '100%', height: '100%', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontSize: '2.5rem' }}>🚀</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{project.title.split('-')[0].trim()}</span>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{project.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, flex: 1, marginBottom: 16 }}>
                    {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {project.techStack?.map(t => (
                        <span key={t} style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', color: 'var(--accent)', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500 }}>
                            {t}
                        </span>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer"
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'var(--accent)', color: '#0d1117', borderRadius: 8, padding: '9px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <ExternalLink size={15} /> Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer"
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', color: 'var(--text)', border: '1px solid #30363d', borderRadius: 8, padding: '9px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--text)'; }}
                        >
                            <Github size={15} /> GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}



export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/projects')
            .then(res => {
                const data = res.data?.data || [];
                setProjects(data);
            })
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="projects" style={{ padding: '100px 24px', background: 'rgba(22,27,34,0.3)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 60 }}>
                    <span className="section-label">Portfolio</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800 }}>
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
                        A curated selection of things I've built and deployed.
                    </p>
                </motion.div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                        <Loader2 size={40} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                        {projects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
                    </div>
                )}
            </div>
        </section>
    );
}

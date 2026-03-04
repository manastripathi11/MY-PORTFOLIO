import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import api from '../api/api';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return toast.error('Please fill in all fields.');
        setLoading(true);
        try {
            await api.post('/contact', form);
            toast.success('Message sent! I\'ll get back to you soon. 🚀');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to send. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', borderRadius: 10, padding: '14px 16px', color: 'var(--text)', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s',
    };

    return (
        <section id="contact" style={{ padding: '100px 24px', background: 'rgba(22,27,34,0.3)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 60 }}>
                    <span className="section-label">Contact</span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800 }}>
                        Project in mind? <span className="gradient-text">Let's talk.</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', marginTop: 12, maxWidth: 450, margin: '12px auto 0' }}>
                        Whether it's a job offer, freelance project, or just saying hi — my inbox is always open.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'start' }}>
                    {/* Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>Get In Touch</h3>
                        {[
                            { icon: Mail, label: 'Email', value: 'manastripathi22@gmail.com', href: 'mailto:manastripathi22@gmail.com' },
                            { icon: Phone, label: 'Phone', value: '+91 6386466883', href: 'tel:+916386466883' },
                            { icon: MapPin, label: 'Location', value: 'India (Remote OK)' },
                        ].map(({ icon: Icon, label, value, href }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={18} color="var(--accent)" />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                                    {href ? (
                                        <a href={href} style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none' }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                                        >{value}</a>
                                    ) : (
                                        <p style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 500 }}>{value}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="card" style={{ marginTop: 32, padding: 20, borderColor: 'rgba(0,255,136,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', animation: 'glow-pulse 2s infinite' }} />
                                <span style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.9rem' }}>Available for Work</span>
                            </div>
                            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Open to full-time roles, freelance, and exciting collaborations.</p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit}
                        className="card"
                        style={{ padding: 32 }}
                    >
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                            <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} style={inputStyle} required id="contact-name" />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                            <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle} required id="contact-email" />
                        </div>
                        <div style={{ marginBottom: 28 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
                            <textarea name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} rows={5} style={{ ...inputStyle, resize: 'vertical' }} required id="contact-message" />
                        </div>
                        <button
                            type="submit"
                            id="contact-submit"
                            disabled={loading}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: loading ? 'rgba(0,255,136,0.5)' : 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s' }}
                        >
                            {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Loader2, Briefcase } from 'lucide-react';
import api from '../api/api';

const EMPTY = { company: '', role: '', duration: '', description: '', techStack: '', current: false, order: 0 };

const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' };
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', borderRadius: 8, padding: '11px 14px', color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', marginBottom: 16 };

function Modal({ title, onClose, children }) {
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div className="card" style={{ width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>{title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={20} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function ManageExperiences() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const fetchData = useCallback(() => {
        setLoading(true);
        api.get('/experience').then(r => setItems(r.data?.data || [])).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
    }, []);

    useEffect(fetchData, [fetchData]);

    const openCreate = () => { setForm(EMPTY); setEditing(null); setModal('create'); };
    const openEdit = (item) => {
        setForm({ ...item, techStack: (item.techStack || []).join(', ') });
        setEditing(item._id);
        setModal('edit');
    };
    const closeModal = () => { setModal(null); setEditing(null); };
    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.company || !form.role || !form.duration || !form.description) return toast.error('All fields are required.');
        setSaving(true);
        try {
            const payload = { ...form, techStack: form.techStack ? form.techStack.split(',').map(t => t.trim()).filter(Boolean) : [] };
            if (editing) {
                await api.put(`/experience/${editing}`, payload);
                toast.success('Experience updated!');
            } else {
                await api.post('/experience', payload);
                toast.success('Experience created!');
            }
            closeModal();
            fetchData();
        } catch { toast.error('Failed to save.'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this experience?')) return;
        try { await api.delete(`/experience/${id}`); toast.success('Deleted.'); fetchData(); }
        catch { toast.error('Failed to delete.'); }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>Experience</h1>
                    <p style={{ color: 'var(--muted)' }}>Manage your professional experience timeline.</p>
                </div>
                <button id="add-exp-btn" onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '11px 20px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                    <Plus size={18} /> Add Experience
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Loader2 size={36} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} /></div>
            ) : items.length === 0 ? (
                <div className="card" style={{ padding: 60, textAlign: 'center' }}>
                    <Briefcase size={48} color="var(--muted)" style={{ margin: '0 auto 16px' }} />
                    <p style={{ color: 'var(--muted)' }}>No experiences yet. Click "Add Experience" to begin.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {items.map(item => (
                        <div key={item._id} className="card" style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                    <h3 style={{ fontWeight: 700 }}>{item.role}</h3>
                                    {item.current && <span style={{ background: 'rgba(0,255,136,0.15)', color: 'var(--accent)', borderRadius: 20, padding: '2px 8px', fontSize: '0.7rem', fontWeight: 600 }}>Current</span>}
                                </div>
                                <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.88rem', marginBottom: 2 }}>{item.company}</p>
                                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: 8 }}>{item.duration}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                    {item.techStack?.map(t => <span key={t} style={{ background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.15)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 20, fontSize: '0.72rem' }}>{t}</span>)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                <button onClick={() => openEdit(item)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                ><Pencil size={14} /> Edit</button>
                                <button onClick={() => handleDelete(item._id)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                ><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modal && (
                <Modal title={modal === 'edit' ? 'Edit Experience' : 'Add Experience'} onClose={closeModal}>
                    <form onSubmit={handleSave}>
                        <label style={labelStyle}>Company *</label>
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" style={inputStyle} required />
                        <label style={labelStyle}>Role *</label>
                        <input name="role" value={form.role} onChange={handleChange} placeholder="Your role" style={inputStyle} required />
                        <label style={labelStyle}>Duration *</label>
                        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Jan 2023 – Present" style={inputStyle} required />
                        <label style={labelStyle}>Description *</label>
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="What did you do?" rows={4} style={{ ...inputStyle, resize: 'vertical' }} required />
                        <label style={labelStyle}>Tech Stack (comma-separated)</label>
                        <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" style={inputStyle} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                            <input type="checkbox" name="current" id="current-check" checked={form.current} onChange={handleChange} style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
                            <label htmlFor="current-check" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)' }}>This is my current role</label>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button type="button" onClick={closeModal} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                            <button type="submit" disabled={saving} style={{ flex: 2, padding: 12, borderRadius: 8, background: 'var(--accent)', color: '#0d1117', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: saving ? 0.6 : 1 }}>
                                {saving ? 'Saving...' : modal === 'edit' ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

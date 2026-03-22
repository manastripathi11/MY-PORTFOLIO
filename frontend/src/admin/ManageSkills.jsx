import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Save, Loader2, RefreshCw, Zap } from 'lucide-react';
import api from '../api/api';

const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' };
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' };

const ACCENT_OPTIONS = [
    { label: 'Green', value: '#00ff88' },
    { label: 'Cyan', value: '#00bcd4' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Orange', value: '#f59e0b' },
    { label: 'Pink', value: '#ec4899' },
    { label: 'Blue', value: '#3b82f6' },
];

export default function ManageSkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const fetchSkills = useCallback(() => {
        setLoading(true);
        api.get('/skills')
            .then(r => setSkills(r.data?.data || []))
            .catch(() => toast.error('Failed to load skills'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(fetchSkills, [fetchSkills]);

    // Category-level handlers
    const addCategory = () => {
        setSkills(prev => [...prev, {
            _id: `new-${Date.now()}`,
            category: 'New Category',
            emoji: '🔧',
            accentColor: '#00ff88',
            order: prev.length,
            items: [],
        }]);
    };

    const removeCategory = (idx) => {
        if (!confirm('Delete this entire category?')) return;
        setSkills(prev => prev.filter((_, i) => i !== idx));
    };

    const updateCategory = (idx, field, value) => {
        setSkills(prev => prev.map((cat, i) => i === idx ? { ...cat, [field]: value } : cat));
    };

    // Item-level handlers
    const addItem = (catIdx) => {
        setSkills(prev => prev.map((cat, i) => {
            if (i !== catIdx) return cat;
            return { ...cat, items: [...cat.items, { name: '' }] };
        }));
    };

    const removeItem = (catIdx, itemIdx) => {
        setSkills(prev => prev.map((cat, i) => {
            if (i !== catIdx) return cat;
            return { ...cat, items: cat.items.filter((_, j) => j !== itemIdx) };
        }));
    };

    const updateItem = (catIdx, itemIdx, value) => {
        setSkills(prev => prev.map((cat, i) => {
            if (i !== catIdx) return cat;
            return {
                ...cat,
                items: cat.items.map((item, j) => j === itemIdx ? { name: value } : item),
            };
        }));
    };

    const handleSave = async () => {
        // Validate
        for (const cat of skills) {
            if (!cat.category.trim()) return toast.error('Category name cannot be empty.');
            if (cat.items.some(it => !it.name.trim())) return toast.error(`All skill names in "${cat.category}" must be filled in.`);
        }
        setSaving(true);
        try {
            // Strip local _id for new entries
            const payload = skills.map(({ _id, ...rest }, idx) => ({
                ...rest,
                order: idx,
                // Keep _id only if it's a real MongoDB id (not our temp 'new-...')
                ...(_id && !String(_id).startsWith('new-') ? { _id } : {}),
            }));
            await api.put('/skills', { skills: payload });
            toast.success('Skills saved successfully!');
            fetchSkills();
        } catch {
            toast.error('Failed to save skills.');
        } finally {
            setSaving(false);
        }
    };

    const handleSeed = async () => {
        setSeeding(true);
        try {
            const r = await api.post('/skills/seed');
            if (r.data.seeded) {
                toast.success('Default skills seeded!');
                fetchSkills();
            } else {
                toast('Skills already exist. Use "Save" to update them.', { icon: 'ℹ️' });
            }
        } catch {
            toast.error('Seed failed.');
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>Skills</h1>
                    <p style={{ color: 'var(--muted)' }}>Manage your skill categories and items.</p>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button onClick={handleSeed} disabled={seeding || loading} title="Load default skills into DB (only if empty)"
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00bcd4'; e.currentTarget.style.color = '#00bcd4'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                    >
                        {seeding ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={16} />}
                        Load Defaults
                    </button>
                    <button onClick={addCategory}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                    >
                        <Plus size={16} /> Add Category
                    </button>
                    <button onClick={handleSave} disabled={saving}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, transition: 'opacity 0.2s' }}
                    >
                        {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                        {saving ? 'Saving…' : 'Save All'}
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
                    <Loader2 size={36} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
                </div>
            ) : skills.length === 0 ? (
                <div className="card" style={{ padding: 60, textAlign: 'center' }}>
                    <Zap size={48} color="var(--muted)" style={{ margin: '0 auto 16px' }} />
                    <p style={{ color: 'var(--muted)', marginBottom: 20 }}>No skills yet.</p>
                    <button onClick={handleSeed}
                        style={{ background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '11px 24px', fontWeight: 700, cursor: 'pointer' }}
                    >Load Default Skills</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {skills.map((cat, catIdx) => (
                        <div key={cat._id || catIdx} className="card" style={{ padding: 28 }}>
                            {/* Category header controls */}
                            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                <div style={{ flex: '0 0 60px' }}>
                                    <label style={labelStyle}>Emoji</label>
                                    <input
                                        value={cat.emoji}
                                        onChange={e => updateCategory(catIdx, 'emoji', e.target.value)}
                                        style={{ ...inputStyle, textAlign: 'center', fontSize: '1.4rem', padding: '6px 8px' }}
                                        maxLength={4}
                                    />
                                </div>
                                <div style={{ flex: '1 1 200px' }}>
                                    <label style={labelStyle}>Category Name</label>
                                    <input
                                        value={cat.category}
                                        onChange={e => updateCategory(catIdx, 'category', e.target.value)}
                                        placeholder="e.g. Frontend"
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{ flex: '0 0 150px' }}>
                                    <label style={labelStyle}>Accent Color</label>
                                    <select
                                        value={cat.accentColor}
                                        onChange={e => updateCategory(catIdx, 'accentColor', e.target.value)}
                                        style={{ ...inputStyle, cursor: 'pointer' }}
                                    >
                                        {ACCENT_OPTIONS.map(o => (
                                            <option key={o.value} value={o.value}>{o.label} ({o.value})</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: cat.accentColor, boxShadow: `0 0 8px ${cat.accentColor}`, flexShrink: 0 }} />
                                    <button onClick={() => removeCategory(catIdx)}
                                        style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                    >
                                        <Trash2 size={14} /> Remove Category
                                    </button>
                                </div>
                            </div>

                            {/* Divider */}
                            <div style={{ borderTop: '1px solid var(--border)', marginBottom: 20 }} />

                            {/* Skill items */}
                            <label style={{ ...labelStyle, marginBottom: 12 }}>Skills ({cat.items.length})</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 16 }}>
                                {cat.items.map((item, itemIdx) => (
                                    <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <input
                                            value={item.name}
                                            onChange={e => updateItem(catIdx, itemIdx, e.target.value)}
                                            placeholder="Skill name"
                                            style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                                        />
                                        <button onClick={() => removeItem(catIdx, itemIdx)}
                                            style={{ padding: 8, borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s', display: 'flex', alignItems: 'center' }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => addItem(catIdx)}
                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: `1px dashed ${cat.accentColor}50`, background: 'none', color: cat.accentColor, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${cat.accentColor}10`; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                            >
                                <Plus size={14} /> Add Skill
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

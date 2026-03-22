import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Save, ExternalLink, FileText, Loader2, Trash2 } from 'lucide-react';
import api from '../api/api';

const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' };
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #30363d', borderRadius: 8, padding: '11px 14px', color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' };

export default function ManageResume() {
    const [url, setUrl] = useState('');
    const [filename, setFilename] = useState('resume.pdf');
    const [savedUrl, setSavedUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [removing, setRemoving] = useState(false);

    const fetchResume = useCallback(() => {
        setLoading(true);
        api.get('/resume')
            .then(r => {
                const data = r.data?.data;
                setUrl(data?.url || '');
                setSavedUrl(data?.url || '');
                setFilename(data?.filename || 'resume.pdf');
            })
            .catch(() => toast.error('Failed to load resume info'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(fetchResume, [fetchResume]);

    const handleSave = async () => {
        if (!url.trim()) return toast.error('Please enter a PDF URL.');
        // Basic URL validation
        try { new URL(url); } catch { return toast.error('Please enter a valid URL.'); }

        setSaving(true);
        try {
            await api.put('/resume', { url: url.trim(), filename: filename.trim() || 'resume.pdf' });
            setSavedUrl(url.trim());
            toast.success('Resume URL saved!');
        } catch {
            toast.error('Failed to save resume.');
        } finally {
            setSaving(false);
        }
    };

    const handleRemove = async () => {
        if (!confirm('Remove the current resume URL?')) return;
        setRemoving(true);
        try {
            await api.put('/resume', { url: '', filename: 'resume.pdf' });
            setUrl('');
            setSavedUrl('');
            setFilename('resume.pdf');
            toast.success('Resume removed.');
        } catch {
            toast.error('Failed to remove resume.');
        } finally {
            setRemoving(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>Resume</h1>
                <p style={{ color: 'var(--muted)' }}>Set a public direct PDF link for your resume displayed on the portfolio.</p>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
                    <Loader2 size={36} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 700 }}>

                    {/* Current status card */}
                    <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: savedUrl ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${savedUrl ? 'rgba(0,255,136,0.3)' : '#30363d'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FileText size={22} color={savedUrl ? 'var(--accent)' : 'var(--muted)'} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontWeight: 600, marginBottom: 2 }}>
                                {savedUrl ? 'Resume is set ✓' : 'No resume set'}
                            </p>
                            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {savedUrl || 'Use a public direct PDF URL. Bundled local resume is used as a fallback.'}
                            </p>
                        </div>
                        {savedUrl && (
                            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                <a href={savedUrl} target="_blank" rel="noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid #30363d', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                >
                                    <ExternalLink size={14} /> Preview
                                </a>
                                <button onClick={handleRemove} disabled={removing}
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid #30363d', background: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                                >
                                    {removing ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <div className="card" style={{ padding: 28 }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 24 }}>
                            {savedUrl ? 'Update Resume URL' : 'Set Resume URL'}
                        </h2>

                        <label style={labelStyle}>PDF Direct URL *</label>
                        <input
                            id="resume-url-input"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            placeholder="https://drive.google.com/uc?export=download&id=..."
                            style={{ ...inputStyle, marginBottom: 16 }}
                        />

                        <label style={labelStyle}>File Name (for download)</label>
                        <input
                            value={filename}
                            onChange={e => setFilename(e.target.value)}
                            placeholder="resume.pdf"
                            style={{ ...inputStyle, marginBottom: 24 }}
                        />

                        {/* Tips */}
                        <div style={{ background: 'rgba(0,188,212,0.06)', border: '1px solid rgba(0,188,212,0.2)', borderRadius: 10, padding: '14px 18px', marginBottom: 24 }}>
                            <p style={{ color: '#00bcd4', fontWeight: 700, fontSize: '0.82rem', marginBottom: 8 }}>How to get a direct PDF link</p>
                            <ul style={{ color: 'var(--muted)', fontSize: '0.82rem', paddingLeft: 16, lineHeight: 1.8, margin: 0 }}>
                                <li><strong>Google Drive:</strong> The file must be shared as anyone with the link, but embeds can still be blocked in iframes.</li>
                                <li><strong>Best option:</strong> Use a public direct PDF URL from Cloudinary, S3, Vercel Blob, or another file host.</li>
                                <li><strong>Cloudinary:</strong> Upload PDF → Copy the direct URL</li>
                                <li><strong>Any CDN:</strong> Paste any publicly accessible direct PDF link</li>
                            </ul>
                        </div>

                        <button onClick={handleSave} disabled={saving}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#0d1117', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: '0.95rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, transition: 'opacity 0.2s' }}
                        >
                            {saving ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={18} />}
                            {saving ? 'Saving…' : 'Save Resume URL'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

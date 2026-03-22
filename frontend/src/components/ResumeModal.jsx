import { useEffect, useState } from 'react';
import { X, Download, Loader2, FileText } from 'lucide-react';
import bundledResume from '../assets/resume.pdf';
import api from '../api/api';

const getGoogleDriveFileId = (url) => {
    if (!url) return '';
    const match = url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
    return match?.[1] || '';
};

const resolveResumeUrls = (url) => {
    if (!url) {
        return { previewUrl: bundledResume, downloadUrl: bundledResume };
    }

    const fileId = getGoogleDriveFileId(url);
    if (fileId) {
        return {
            previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
            downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
        };
    }

    return { previewUrl: url, downloadUrl: url };
};

export default function ResumeModal({ onClose }) {
    const [resumeUrl, setResumeUrl] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);

        api.get('/resume')
            .then(({ data }) => {
                if (!data.success) {
                    const fallback = resolveResumeUrls('');
                    setResumeUrl(fallback.previewUrl);
                    setDownloadUrl(fallback.downloadUrl);
                    return;
                }

                const savedUrl = data.data?.url || '';
                const resolved = resolveResumeUrls(savedUrl);
                setResumeUrl(resolved.previewUrl);
                setDownloadUrl(resolved.downloadUrl);
            })
            .catch(() => {
                const fallback = resolveResumeUrls('');
                setResumeUrl(fallback.previewUrl);
                setDownloadUrl(fallback.downloadUrl);
            })
            .finally(() => setLoading(false));

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
                animation: 'fadeIn 0.2s ease',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: 820,
                    height: '80vh',
                    background: '#0d1117',
                    border: '1px solid #30363d',
                    borderRadius: 16,
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,255,136,0.08)',
                    animation: 'slideUp 0.25s ease',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: '1px solid #21262d',
                    background: '#161b22',
                    flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            width: 10, height: 10, borderRadius: '50%',
                            background: 'var(--accent)',
                            boxShadow: '0 0 8px var(--accent)',
                        }} />
                        <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>
                            Resume — Manas Tripathi
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                download="Manas_Tripathi_Resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                title="Download Resume"
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    background: 'var(--accent)', color: '#0d1117',
                                    border: 'none', borderRadius: 8,
                                    padding: '8px 16px',
                                    fontWeight: 700, fontSize: '0.85rem',
                                    cursor: 'pointer', textDecoration: 'none',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <Download size={15} />
                                Download
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            title="Close"
                            style={{
                                width: 34, height: 34,
                                borderRadius: 8,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid #30363d',
                                color: 'var(--muted)',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.15)'; e.currentTarget.style.borderColor = '#ff5050'; e.currentTarget.style.color = '#ff5050'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = 'var(--muted)'; }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, overflow: 'hidden', background: '#1c2128', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {loading ? (
                        <Loader2 size={36} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
                    ) : resumeUrl ? (
                        <iframe
                            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                            title="Resume Preview"
                            width="100%"
                            height="100%"
                            style={{ border: 'none', display: 'block' }}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>
                            <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                            <p style={{ fontWeight: 600, marginBottom: 8 }}>Resume not available yet</p>
                            <p style={{ fontSize: '0.85rem' }}>The admin hasn't uploaded a resume link yet.</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
            `}</style>
        </div>
    );
}

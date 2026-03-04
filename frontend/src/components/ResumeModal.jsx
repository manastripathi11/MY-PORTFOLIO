import { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import resumePDF from '../assets/resume.pdf';

export default function ResumeModal({ onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
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
                        <a
                            href={resumePDF}
                            download="Manas_Tripathi_Resume.pdf"
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

                {/* PDF iframe */}
                <div style={{ flex: 1, overflow: 'hidden', background: '#1c2128' }}>
                    <iframe
                        src={`${resumePDF}#toolbar=0&navpanes=0&scrollbar=1`}
                        title="Resume Preview"
                        width="100%"
                        height="100%"
                        style={{ border: 'none', display: 'block' }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </div>
    );
}

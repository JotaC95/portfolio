import React, { useState, useEffect } from 'react';
import { Activity, Server, Wifi, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LiveDashboard = () => {
    const { t } = useLanguage();
    const [temp, setTemp] = useState(42);
    const [nodes, setNodes] = useState(15);
    const [latency, setLatency] = useState(24);
    const [history, setHistory] = useState(Array(20).fill(40));
    const [isMinimized, setIsMinimized] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate random fluctuations
            const newTemp = Math.floor(40 + Math.random() * 5);
            setTemp(newTemp);
            setLatency(Math.floor(20 + Math.random() * 10));

            setHistory(prev => {
                const newHistory = [...prev.slice(1), newTemp];
                return newHistory;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (isMinimized) {
        return (
            <div
                className="fade-in live-dashboard-minimized"
                onClick={() => setIsMinimized(false)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(11, 17, 32, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease'
                }}
                title={t.liveDashboard?.title || "Live Monitor"}
            >
                <Activity size={24} color="#10B981" />
                <span style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#10B981',
                    borderRadius: '50%',
                    border: '2px solid rgba(11, 17, 32, 0.9)'
                }}></span>
            </div>
        );
    }

    return (
        <div className="fade-in live-dashboard" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(11, 17, 32, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1rem',
            zIndex: 1000,
            maxWidth: '300px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '2rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                    {t.liveDashboard?.title || "Live Monitor"}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981' }}></span>
                        <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 'bold' }}>ONLINE</span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                    >
                        <Minimize2 size={16} />
                    </button>
                </div>
            </div>

            {/* Grid Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <Server size={14} color="var(--accent-primary)" />
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{t.liveDashboard?.temp || "Server Temp"}</span>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{temp}°C</span>
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <Wifi size={14} color="var(--accent-secondary)" />
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{t.liveDashboard?.nodes || "Active Nodes"}</span>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{nodes}</span>
                </div>
            </div>

            {/* Mini Svg Graph */}
            <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '2px', opacity: 0.8 }}>
                {history.map((h, i) => (
                    <div key={i} style={{
                        flex: 1,
                        backgroundColor: i === history.length - 1 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        height: `${(h - 35) * 10}%`,
                        borderRadius: '2px 2px 0 0',
                        opacity: i / history.length
                    }}></div>
                ))}
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.65rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                Latency: {latency}ms
            </p>

            <style>{`
                @media (max-width: 768px) {
                    .live-dashboard { display: none !important; }
                    .live-dashboard-minimized { display: flex !important; margin-bottom: 50px; }
                }
             `}</style>

        </div>
    );
};

export default LiveDashboard;

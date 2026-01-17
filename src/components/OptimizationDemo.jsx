import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, DollarSign, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const OptimizationDemo = () => {
    const { t } = useLanguage();
    const [automationLevel, setAutomationLevel] = useState(30);
    const [efficiency, setEfficiency] = useState(0);
    const [profit, setProfit] = useState(0);

    // Simulate complex calculation based on input
    useEffect(() => {
        const calculatedEfficiency = Math.min(100, Math.floor(automationLevel * 1.5 + 20));
        // Profit grows exponentially with efficiency, but has diminishing returns at very high levels
        const calculatedProfit = Math.floor(Math.pow(automationLevel, 1.6) * 10 + 5000);

        setEfficiency(calculatedEfficiency);
        setProfit(calculatedProfit);
    }, [automationLevel]);

    return (
        <section className="section" style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">{t.demo.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        {t.demo.subtitle}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-card)',
                    padding: '3rem',
                    borderRadius: '24px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}>
                    {/* Controls */}
                    <div>
                        <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity color="var(--accent-primary)" />
                            {t.demo.params}
                        </h3>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t.demo.automation}</label>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{automationLevel}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={automationLevel}
                                onChange={(e) => setAutomationLevel(parseInt(e.target.value))}
                                style={{
                                    width: '100%',
                                    accentColor: 'var(--accent-primary)',
                                    height: '6px',
                                    cursor: 'pointer'
                                }}
                            />
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {t.demo.automationDesc}
                            </p>
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(6, 182, 212, 0.05)',
                            border: '1px solid rgba(6, 182, 212, 0.2)'
                        }}>
                            <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>{t.demo.note}</strong>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                {t.demo.noteText}
                            </p>
                        </div>
                    </div>

                    {/* Results Visualization */}
                    <div style={{ display: 'grid', gap: '1.5rem' }}>

                        {/* Efficiency Metric */}
                        <div style={{
                            backgroundColor: 'var(--bg-primary)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderLeft: '4px solid var(--accent-secondary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.8rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', color: 'var(--accent-secondary)' }}>
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.demo.efficiency}</p>
                                    <h4 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{efficiency}%</h4>
                                </div>
                            </div>
                            {/* Simple Bar Chart Visualization */}
                            <div style={{ width: '100px', height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${efficiency}%`, height: '100%', backgroundColor: 'var(--accent-secondary)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                            </div>
                        </div>

                        {/* Profit Metric (Main Focus) */}
                        <div style={{
                            backgroundColor: 'var(--bg-primary)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderLeft: '4px solid var(--accent-primary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.8rem', backgroundColor: 'rgba(6, 182, 212, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.demo.revenue}</p>
                                    <h4 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>${profit.toLocaleString()}</h4>
                                </div>
                            </div>
                            <div style={{ width: '100px', height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${Math.min(100, (profit / 20000) * 100)}%`, height: '100%', backgroundColor: 'var(--accent-primary)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: 'var(--bg-primary)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderLeft: '4px solid #10B981'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.8rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', color: '#10B981' }}>
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.demo.roi}</p>
                                    <h4 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>+{Math.floor(automationLevel * 2.5)}%</h4>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default OptimizationDemo;

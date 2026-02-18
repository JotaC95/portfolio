import React from 'react';
import { Briefcase, GraduationCap, Calendar, Rocket, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { t } = useLanguage();

    const getIcon = (type) => {
        switch (type) {
            case 'education':
                return <GraduationCap size={20} />;
            case 'entrepreneurship':
                return <Rocket size={20} />;
            case 'project':
                return <Cpu size={20} />;
            default:
                return <Briefcase size={20} />;
        }
    };

    return (
        <section id="experience" className="section">
            <div className="container">
                <h2 className="section-title">{t.experience.title}</h2>

                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '20px',
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        backgroundColor: 'var(--border-color)',
                        zIndex: 0
                    }}></div>

                    {t.experience.jobs.map((item, index) => (
                        <div key={index} className="fade-in" style={{
                            display: 'flex',
                            gap: '2rem',
                            marginBottom: '3rem',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {/* Icon Bubble */}
                            <div style={{
                                flexShrink: 0,
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--bg-card)',
                                border: '2px solid var(--accent-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--accent-primary)',
                                boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)'
                            }}>
                                {getIcon(item.type)}
                            </div>

                            {/* Content Card */}
                            <div style={{
                                flex: 1,
                                backgroundColor: 'var(--bg-card)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '600' }}>{item.title}</h3>
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.85rem',
                                        color: 'var(--accent-primary)',
                                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <Calendar size={14} /> {item.date}
                                    </span>
                                </div>

                                <h4 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '1rem', fontWeight: '500' }}>{item.company}</h4>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    {item.description}
                                </p>

                                {/* Tags */}
                                {item.tags && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {item.tags.map((tag, i) => (
                                            <span key={i} style={{
                                                fontSize: '0.75rem',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '12px',
                                                backgroundColor: 'var(--bg-hover)',
                                                color: 'var(--text-secondary)',
                                                border: '1px solid var(--border-color)',
                                                fontFamily: 'monospace'
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

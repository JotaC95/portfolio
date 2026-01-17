import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { t } = useLanguage();

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
                            {/* Icon Bubble (Logic assumes last item is education, or we check title/content - keeping simple for now) */}
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
                                color: 'var(--accent-primary)'
                            }}>
                                {/* For simplicity in this generic map, we'll use Briefcase unless it's the last one which is usually education in this specific data set, or we could add a 'type' field to the translation object, but let's stick to Briefcase for work and Cap for uni based on index for now to avoid breaking the translation object structure if not needed */}
                                {index === t.experience.jobs.length - 1 ? <GraduationCap size={20} /> : <Briefcase size={20} />}
                            </div>

                            {/* Content Card */}
                            <div style={{
                                flex: 1,
                                backgroundColor: 'var(--bg-card)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.85rem',
                                        color: 'var(--accent-primary)',
                                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px'
                                    }}>
                                        <Calendar size={14} /> {item.date}
                                    </span>
                                </div>

                                <h4 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '1rem' }}>{item.company}</h4>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

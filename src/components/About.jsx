import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">{t.about.title}</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center'
                }}>
                    {/* Image Placeholder */}
                    <div style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        backgroundColor: 'var(--bg-card)',
                        borderRadius: '20px',
                        border: '2px solid var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(245, 158, 11, 0.1))'
                        }}></div>
                        [Profile Image]
                    </div>

                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            {t.about.heading}
                        </h3>

                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            {t.about.text1}
                        </p>

                        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            {t.about.text2}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={statCardStyle}>
                                <span style={statNumberStyle}>4+</span>
                                <span style={statLabelStyle}>{t.about.statExp}</span>
                            </div>
                            <div style={statCardStyle}>
                                <span style={statNumberStyle}>20+</span>
                                <span style={statLabelStyle}>{t.about.statProj}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const statCardStyle = {
    backgroundColor: 'var(--bg-primary)',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid var(--border-color)'
};

const statNumberStyle = {
    display: 'block',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--accent-primary)',
    marginBottom: '0.5rem'
};

const statLabelStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem'
};

export default About;

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FallingText from './FallingText';

const About = () => {
    const { t } = useLanguage();
    const [isGravityActive, setIsGravityActive] = useState(false);

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
                        <h3
                            className="section-title"
                            style={{
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                color: 'var(--text-primary)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                            onClick={() => setIsGravityActive(true)}
                            title="??? : Activate Gravity Protocol"
                        >
                            {t.about.heading}
                            <span style={{ fontSize: '1rem', marginLeft: '10px', opacity: 0.3 }}>▼</span>
                        </h3>

                        <div style={{ position: 'relative', minHeight: '300px' }}>
                            {isGravityActive ? (
                                <FallingText
                                    text={`${t.about.text1} ${t.about.text2}`}
                                    duration={8000} // 8 seconds of chaos
                                    onFinished={() => setIsGravityActive(false)}
                                />
                            ) : (
                                <>
                                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                                        {t.about.text1}
                                    </p>

                                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                                        {t.about.text2}
                                    </p>
                                </>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={statCardStyle}>
                                <span style={statNumberStyle}>1+</span>
                                <span style={statLabelStyle}>{t.about.statExp}</span>
                            </div>
                            <div style={statCardStyle}>
                                <span style={statNumberStyle}>4+</span>
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

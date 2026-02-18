import React, { Suspense } from 'react';
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DecryptedText from './DecryptedText';

// Lazy load 3D component to ensure performance
const Hero3D = React.lazy(() => import('./Hero3D'));

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="section" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'var(--header-height)',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* 3D Background Element */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6 }}>
                <Suspense fallback={null}>
                    <Hero3D />
                </Suspense>
            </div>

            {/* Ambient Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <h2 className="fade-in" style={{
                    color: 'var(--accent-primary)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '1rem',
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '20px',
                    background: 'rgba(6, 182, 212, 0.05)'
                }}>
                    <DecryptedText text={t.hero.role} speed={50} />
                </h2>

                <h1 className="fade-in" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    animationDelay: '0.2s'
                }}>
                    <DecryptedText text={t.hero.title} speed={40} /> <br />
                    <span style={{
                        color: 'transparent',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        backgroundImage: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
                    }}>
                        {t.hero.subtitle}
                    </span>
                </h1>

                <p className="fade-in" style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '800px',
                    margin: '0 auto 3rem',
                    animationDelay: '0.4s',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
                    {t.hero.description}
                </p>

                <div className="fade-in" style={{
                    display: 'flex',
                    gap: '1.5rem',
                    justifyContent: 'center',
                    animationDelay: '0.6s',
                    flexWrap: 'wrap'
                }}>
                    <a href="#projects" className="btn btn-primary">
                        {t.hero.ctaWork} <ArrowRight size={20} />
                    </a>
                    <a href="/cv.pdf" download className="btn btn-outline" style={{ borderColor: 'var(--text-secondary)', color: 'var(--text-primary)' }}>
                        {t.hero.ctaCV} <Download size={20} />
                    </a>
                    <a href="#contact" className="btn btn-outline">
                        {t.hero.ctaTalk}
                    </a>
                </div>

                {/* Social Icons for Hero */}
                <div className="fade-in" style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    marginTop: '2.5rem',
                    animationDelay: '0.8s'
                }}>
                    <a href="https://github.com/JotaC95" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--text-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/jaimejosecrow" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#0077b5'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:jota.crow@gmail.com" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#ea4335'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                        <Mail size={24} />
                    </a>
                </div>

            </div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'bounce 2s infinite'
            }}>
                <ChevronDown color="var(--text-secondary)" size={32} />
            </div>

            <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
          40% {transform: translateX(-50%) translateY(-10px);}
          60% {transform: translateX(-50%) translateY(-5px);}
        }
      `}</style>
        </section>
    );
};

export default Hero;

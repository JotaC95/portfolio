import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Globe, Sun, Moon, Ruler } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ onLogoClick, onBlueprintClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        if (isDark) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const navLinks = [
        { name: t.nav.about, href: '#about' },
        { name: t.nav.experience, href: '#experience' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.contact, href: '#contact' },
    ];

    return (
        <nav className="navbar" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: isDark ? 'rgba(11, 17, 32, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-color)',
            transition: 'background-color 0.3s ease'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 'var(--header-height)'
            }}>
                {/* Logo */}
                <div className="tooltip-container" style={{ position: 'relative' }}>
                    <div
                        className="glitch-hover"
                        onDoubleClick={onLogoClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            userSelect: 'none',
                            transition: 'all 0.3s ease'
                        }}>
                        <Cpu color="var(--accent-primary)" size={32} />
                        <span>Percival<span style={{ color: 'var(--accent-primary)' }}>.</span></span>
                    </div>
                    <span className="tooltip-text">¿Quieres ver el mundo como yo lo veo?</span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <ul style={{ display: 'flex', gap: '2rem' }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} style={{
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500
                                }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Blueprint Toggle */}
                    <button
                        onClick={onLogoClick ? () => { /* no-op for logo click prop re-use confusion logic check */ } : null}
                        style={{ display: 'none' }} // Safety check
                    />
                    <button
                        onClick={onBlueprintClick}
                        title="Blueprint Mode"
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Ruler size={20} />
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 600
                        }}
                    >
                        <Globe size={16} />
                        {language === 'en' ? 'ES' : 'EN'}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" style={{ display: 'none' }}>
                    <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

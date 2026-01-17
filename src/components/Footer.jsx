import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = ({ onAdminClick, onHover }) => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '2rem 0',
            borderTop: '1px solid var(--border-color)',
            marginTop: '4rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        &copy; {currentYear} Percival. {t.footer.rights}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <span
                        onClick={onAdminClick}
                        style={{
                            fontSize: '0.7rem',
                            color: 'var(--bg-card)',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        Admin Access
                    </span>
                    <a href="#" className="social-link" onMouseEnter={onHover}>LinkedIn</a>
                    <a href="#" className="social-link" onMouseEnter={onHover}>GitHub</a>
                    <a href="#" className="social-link" onMouseEnter={onHover}>Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

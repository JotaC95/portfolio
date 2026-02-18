import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialSidebar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show sidebar after scrolling past the Hero section (approx 500px)
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/JotaC95',
            icon: <Github size={20} />,
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/jaimejosecrow',
            icon: <Linkedin size={20} />,
        },
        {
            name: 'Email',
            url: 'mailto:jota.crow@gmail.com',
            icon: <Mail size={20} />,
        },
    ];

    return (
        <div
            className="social-sidebar"
            style={{
                position: 'fixed',
                top: '50%',
                left: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                zIndex: 100,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-50px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                pointerEvents: isVisible ? 'auto' : 'none',
            }}
        >
            <style>
                {`
          @media (max-width: 768px) {
            .social-sidebar {
              display: none !important;
            }
          }
        `}
            </style>

            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                    style={{
                        color: 'var(--text-secondary)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--accent-primary)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialSidebar;

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [copied, setCopied] = useState(false);

    const emailAddress = "jota.crow@gmail.com";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Robust Mailto Construction
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);

        // Open default mail client
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

        // Give UI feedback
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            alert('Opening your email client to send the message...');
            setStatus('');
        }, 1000);
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">{t.contact.title}</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                            {t.contact.heading}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            {t.contact.text}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                                    <Mail size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.contact.email}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <a href={`mailto:${emailAddress}`} style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{emailAddress}</a>
                                        <button
                                            onClick={handleCopyEmail}
                                            title="Copy Email"
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: copied ? '#10B981' : 'var(--text-secondary)',
                                                padding: '0.2rem',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Removed */}
                        </div>
                    </div>

                    {/* Functional Form */}
                    <form onSubmit={handleSubmit} style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.contact.formName}</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.contact.formEmail}</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.contact.formMessage}</label>
                            <textarea
                                rows="4"
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can I help you?"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            ></textarea>
                        </div>

                        <button type="submit" disabled={status === 'sending'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
                            {status === 'sending' ? 'Opening Email Client...' : 'Send via Email App'} <ExternalLink size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            *Uses your device's default email client
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

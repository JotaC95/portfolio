import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [copied, setCopied] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const emailAddress = "jota.crow@gmail.com";
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send email');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setStatus('');
            }, 3000);
        } catch (error) {
            console.error('Contact form error:', error);
            setErrorMessage(error.message || 'Failed to send email. Please try again.');
            setStatus('error');
        }
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

                        {status === 'success' && (
                            <div style={{
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid #10B981',
                                color: '#10B981',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                ✓ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}

                        {status === 'error' && (
                            <div style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                ✗ {errorMessage}
                            </div>
                        )}

                        <button type="submit" disabled={status === 'sending'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'} <ExternalLink size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            Or email me directly at <a href={`mailto:${emailAddress}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{emailAddress}</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

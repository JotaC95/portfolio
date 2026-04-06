import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MessageSquare, Send, Copy, Check, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// -------------------------------------------------------------------
// EmailJS configuration
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an Email Template with variables:
//      {{from_name}}, {{from_email}}, {{message}}
//    → copy the Template ID
// 4. Go to Account → Public Key → copy it
// -------------------------------------------------------------------
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const Contact = () => {
    const { t } = useLanguage();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // If EmailJS is not configured yet, fall back to mailto
        if (
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
        ) {
            const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            );
            window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
            setStatus('idle');
            return;
        }

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        outline: 'none',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease',
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
                                        <a href={`mailto:${emailAddress}`} style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                            {emailAddress}
                                        </a>
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
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        style={{
                            backgroundColor: 'var(--bg-card)',
                            padding: '2rem',
                            borderRadius: '20px',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                {t.contact.formName}
                            </label>
                            <input
                                type="text"
                                name="from_name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                {t.contact.formEmail}
                            </label>
                            <input
                                type="email"
                                name="from_email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                {t.contact.formMessage}
                            </label>
                            <textarea
                                rows="4"
                                name="message"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="How can I help you?"
                                style={{ ...inputStyle, resize: 'none' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
                        >
                            {status === 'sending' ? (
                                <><Loader size={18} style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} /> Sending...</>
                            ) : (
                                <><Send size={18} style={{ marginRight: '0.5rem' }} /> {t.contact.formSend || 'Send Message'}</>
                            )}
                        </button>

                        {status === 'success' && (
                            <p style={{ marginTop: '1rem', color: '#10B981', textAlign: 'center', fontWeight: 500 }}>
                                Message sent successfully! I'll get back to you soon.
                            </p>
                        )}
                        {status === 'error' && (
                            <p style={{ marginTop: '1rem', color: '#EF4444', textAlign: 'center', fontWeight: 500 }}>
                                Something went wrong. Please email me directly at {emailAddress}.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

import React, { useState } from 'react';
import { BookOpen, Tag, Calendar, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BlogSection = () => {
    const { t } = useLanguage();
    const [selectedPost, setSelectedPost] = useState(null);

    const posts = [
        {
            id: 1,
            title: "Optimizing PID Loops for High-Speed Robotics",
            date: "2025-10-15",
            tags: ["Control Theory", "Robotics", "C++"],
            summary: "How I reduced settling time by 40% in a 6-axis arm using adaptive gain scheduling.",
            content: `
                <h3>The Challenge</h3>
                <p>Standard PID controllers often struggle with the non-linear dynamics of high-speed robotic arms. The inertia changes significantly depending on the arm's extension.</p>
                
                <h3>The Solution: Adaptive Gain Scheduling</h3>
                <p>Instead of a static set of P-I-D values, I implemented a gain scheduler that adjusts the 'P' term based on the joint angle and estimated load.</p>
                
                <pre style="background: #1e293b; padding: 1rem; border-radius: 8px; overflow-x: auto; color: #e2e8f0;">
// C++ Pseudo-code for Gain Scheduling
float calculateGain(float angle) {
    float baseKp = 12.5;
    float extensionFactor = sin(angle); 
    return baseKp * (1.0 + extensionFactor * 0.5);
}
                </pre>
                
                <h3>Results</h3>
                <p>Oscillation was virtually eliminated at full extension, and response time improved by 40%.</p>
            `
        },
        {
            id: 2,
            title: "IoT Coffee Maker: Hacking the ESP32",
            date: "2025-09-22",
            tags: ["IoT", "ESP32", "Home Automation"],
            summary: "Reverse engineering a standard coffee machine to accept MQTT commands via Home Assistant.",
            content: `
                <h3>Why?</h3>
                <p>Because waiting for coffee is inefficient. I wanted my machine to start brewing exactly when my alarm goes off.</p>
                
                <h3>Hardware Hacking</h3>
                <p>I soldered an ESP32 microcontroller directly to the button pads of the PCB. Using optocouplers ensured galvanic isolation to protect the 5V logic from the mains voltage.</p>
                
                <h3>Integration</h3>
                <p>The ESP32 runs a simple MQTT client. Home Assistant sends a payload: <code>{ "action": "brew", "strength": "strong" }</code>.</p>
            `
        },
        {
            id: 3,
            title: "React vs. Vue for Industrial HMI Panels",
            date: "2025-08-10",
            tags: ["Frontend", "HMI", "React"],
            summary: "A comparative analysis of using modern web frameworks for SCADA and HMI interfaces.",
            content: `
                <h3>Context</h3>
                <p>Industrial Human-Machine Interfaces (HMIs) are traditionally clunky. Web technologies offer a superior UX.</p>
                
                <h3>Performance</h3>
                <p>React's Virtual DOM provides excellent update performance for high-frequency sensor data, provided you memoize components correctly.</p>
                
                <h3>Conclusion</h3>
                <p>For complex logic and state management (Redux/Zustand), React wins. For simple, lightweight panels, Vue's template syntax is faster to deploy.</p>
            `
        }
    ];

    return (
        <section id="blog" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title">ENGINEERING LOGS</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Documenting my journey through code, circuits, and control systems.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {posts.map(post => (
                        <div key={post.id} className="card" onClick={() => setSelectedPost(post)} style={{
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}>
                            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Calendar size={16} />
                                <span>{post.date}</span>
                            </div>

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{post.title}</h3>

                            <p style={{ color: 'var(--text-secondary)', flex: 1, marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                {post.summary}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {post.tags.map(tag => (
                                    <span key={tag} style={{
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '20px',
                                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                                        color: 'var(--accent-primary)',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}>
                                        <Tag size={12} /> {tag}
                                    </span>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'var(--accent-secondary)',
                                fontWeight: 'bold',
                                marginTop: 'auto'
                            }}>
                                Read Log <ChevronRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Reading Post */}
            {selectedPost && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setSelectedPost(null)}>
                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        overflowY: 'auto',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }} onClick={e => e.stopPropagation()}>

                        <button onClick={() => setSelectedPost(null)} style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: 'none',
                            color: 'var(--text-primary)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <X size={24} />
                        </button>

                        <div style={{ padding: '3rem' }}>
                            <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--accent-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    <span>{selectedPost.date}</span>
                                    <span>•</span>
                                    <span>By Percival</span>
                                </div>
                                <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2', color: 'var(--text-primary)' }}>{selectedPost.title}</h2>
                            </div>

                            <div
                                style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}
                                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            />

                            <button onClick={() => setSelectedPost(null)} className="btn btn-outline" style={{ marginTop: '3rem' }}>
                                Close Log
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BlogSection;

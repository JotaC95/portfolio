import React from 'react';
import { Code, Cpu, Database, Layout, PenTool, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const { t } = useLanguage();

    const skills = [
        {
            category: t.skills.categories.frontend,
            icon: <Layout size={40} color="var(--accent-primary)" />,
            items: ["React", "JavaScript (ES6+)", "CSS3/Tailwind", "HTML5"]
        },
        {
            category: t.skills.categories.backend,
            icon: <Terminal size={40} color="var(--accent-secondary)" />,
            items: ["Node.js", "Python", "C++", "API Integration"]
        },
        {
            category: t.skills.categories.mechatronics,
            icon: <Cpu size={40} color="var(--accent-primary)" />,
            items: ["Arduino/ESP32", "PLC Programming", "Sensors & Actuators", "Circuit Design"]
        },
        {
            category: t.skills.categories.data,
            icon: <Database size={40} color="var(--accent-secondary)" />,
            items: ["SQL", "Data Analysis", "Process Automation", "System Control"]
        }
    ];

    return (
        <section id="skills" className="section">
            <div className="container">
                <h2 className="section-title">{t.skills.title}</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-card" style={{
                            backgroundColor: 'var(--bg-card)',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.3s ease',
                            cursor: 'default'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{skill.icon}</div>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{skill.category}</h3>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                                {skill.items.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent-primary)', borderRadius: '50%' }}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

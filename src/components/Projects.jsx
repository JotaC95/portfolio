import React, { useState } from 'react';
import { ExternalLink, Github, Filter, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import hotelImg from '../assets/hotel_saas.png';
import pharmacyImg from '../assets/pharmacy_dashboard.png';
import bakeryImg from '../assets/bakery_landing.png';
import cattleImg from '../assets/cattle_fence.png';
import estruccomImg from '../assets/estruccom.png';
import corecareImg from '../assets/corecare.png';


const Projects = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = [
        { id: 'all', label: t.projects.filters.all },
        { id: 'IoT', label: t.projects.filters.iot },
        { id: 'Automation', label: t.projects.filters.automation },
        { id: 'Software', label: t.projects.filters.software },
        { id: 'Data', label: t.projects.filters.data }
    ];

    const projectsData = [
        {
            id: 1,
            category: "Software", // Hotel App
            image: hotelImg,
            tech: ["React Native", "Expo", "Supabase", "TypeScript"],
            link: "#",
            github: "https://github.com/JotaC95/HotelProject"
        },
        {
            id: 2,
            category: "Data", // Pharmacy
            image: pharmacyImg,
            tech: ["React", "Node.js", "SQL", "Dashboard"],
            link: "#",
            github: "https://github.com/JotaC95/FarmaciaJose"
        },
        {
            id: 3,
            category: "Software", // Bakery
            image: bakeryImg,
            tech: ["React", "Tailwind", "UX/UI"],
            link: "#",
            github: "https://github.com/JotaC95/LaSerenaPage"
        },
        {
            id: 4,
            category: "Automation", // Structural Design
            image: estruccomImg,
            tech: ["React", "Portfolio", "Design"],
            link: "#",
            github: "https://github.com/JotaC95/estruccom-web"
        },
        {
            id: 5,
            category: "IoT", // Cattle Fence
            image: cattleImg,
            tech: ["AI", "Python", "Computer Vision", "GPS"],
            link: "#",
            github: "https://github.com/JotaC95/cattle_virtual_fence"
        },
        {
            id: 6,
            category: "HealthTech", // Corecare
            image: corecareImg,
            tech: ["React", "WebRTC", "Node.js", "HealthTech"],
            link: "#",
            github: "https://github.com/JotaC95/Corecare"
        }
    ];

    const projects = projectsData.map((p, i) => ({
        ...p,
        ...t.projects.list[i] // This will need to match the order in LanguageContext
    }));

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">{t.projects.title}</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    {t.projects.subtitle}
                </p>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '20px',
                                border: filter === cat.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                backgroundColor: filter === cat.id ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                                color: filter === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="project-card fade-in" style={{
                            backgroundColor: 'var(--bg-primary)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Project Image */}
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        color: 'var(--accent-secondary)',
                                        fontWeight: 600
                                    }}>
                                        {project.category}
                                    </span>
                                </div>

                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                                    {project.title}
                                </h3>

                                <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>{project.problem}</p>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                                    >
                                        Read Full Case Study <ArrowRight size={16} />
                                    </button>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {project.tech.slice(0, 3).map((t, i) => (
                                            <span key={i} style={{
                                                fontSize: '0.8rem',
                                                padding: '0.2rem 0.6rem',
                                                backgroundColor: 'var(--bg-card)',
                                                color: 'var(--text-secondary)',
                                                borderRadius: '4px',
                                                border: '1px solid var(--border-color)'
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 2000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem'
                }} onClick={() => setSelectedProject(null)}>
                    <div style={{
                        backgroundColor: 'var(--bg-primary)',
                        maxWidth: '800px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        borderRadius: '24px',
                        border: '1px solid var(--border-color)',
                        position: 'relative',
                        padding: '0'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Modal Header Image */}
                        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                            <img src={selectedProject.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px 24px 0 0' }} />
                            <button onClick={() => setSelectedProject(null)} style={{
                                position: 'absolute',
                                top: '20px',
                                right: '25px', // Adjusted to account for scrollbar potentially
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div style={{ padding: '3rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: 'var(--accent-secondary)',
                                    fontWeight: 600,
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '8px'
                                }}>
                                    {selectedProject.category}
                                </span>
                                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
                            </div>

                            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{selectedProject.title}</h2>

                            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
                                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--text-secondary)' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.projects.labels.problem}</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.problem}</p>
                                </div>

                                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.projects.labels.solution}</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.solution}</p>
                                </div>

                                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: '4px solid #10B981' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.projects.labels.impact}</h4>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedProject.impact}</p>
                                </div>
                            </div>

                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Technologies Used</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
                                {selectedProject.tech.map((t, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.9rem',
                                        padding: '0.4rem 1rem',
                                        backgroundColor: 'var(--bg-card)',
                                        color: 'var(--text-primary)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href={selectedProject.github} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                                    <Github size={20} /> View Source Code
                                </a>
                                <a href={selectedProject.link} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    View Live Demo <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;

import React, { createContext, useState, useContext } from 'react';

// Translation Dictionary
const translations = {
    en: {
        nav: {
            about: "About",
            experience: "Experience",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            role: "Mechatronics Engineer",
            title: "Innovating with",
            subtitle: "Mint Mango",
            description: "Founder of Mint Mango. I combine Mechatronics Engineering with specific software solutions to solve real-world logistical and operational problems for businesses.",
            ctaWork: "View Projects",
            ctaTalk: "Let's Talk",
            ctaCV: "Download CV"
        },
        about: {
            title: "About Me",
            heading: "Engineering Solutions, Not Just Code.",
            text1: "I am Jaime Crow, a Mechatronics Engineer and the founder of Mint Mango. My journey is defined by a hands-on approach to solving problems. Currently gaining international perspective in Australia's hospitality sector, I've seen firsthand how operational inefficiencies cost money.",
            text2: "I created Mint Mango to bridge that gap. Whether it's a hotel management SaaS or a pharmacy inventory system, I build tools that organize employees, streamline logistics, and maximize profitability.",
            statExp: "Ventures",
            statProj: "Projects"
        },
        experience: {
            title: "Career Path",
            jobs: [
                {
                    title: "Founder & Lead Engineer",
                    company: "Mint Mango",
                    date: "2024 - Present",
                    description: "Established a software development venture to provide tailored SaaS solutions. Successfully deployed applications for inventory management and logistical organization."
                },
                {
                    title: "In-Field Operations (Hospitality)",
                    company: "Australia",
                    date: "2024 - Present",
                    description: "Working in a high-volume hotel environment to identify logistical bottlenecks. This direct experience inspired the development of the Hotel Logistics SaaS."
                },
                {
                    title: "B.S. Mechatronics Engineering",
                    company: "University",
                    date: "Graduated",
                    description: "Specialized in automation and systems engineering. Applied engineering principles to software architecture and business logic."
                }
            ]
        },
        skills: {
            title: "Technical Expertise",
            categories: {
                frontend: "Frontend & UI",
                backend: "Backend & Database",
                mechatronics: "Engineering Logic",
                data: "Tools & Platforms"
            }
        },
        demo: {
            title: "Optimization Demo",
            subtitle: "See how optimizing process variables improves the final output.",
            params: "System Parameters",
            automation: "Automation Level",
            automationDesc: "Higher automation reduces manual error rates.",
            note: "Founder's Note:",
            noteText: "\"My goal is to take these variables in your business—time, inventory, staff allocation—and optimize them using software.\"",
            efficiency: "Efficiency",
            revenue: "Projected Growth",
            roi: "ROI"
        },
        projects: {
            title: "Featured Projects",
            subtitle: "Real solutions built for real operational needs.",
            filters: {
                all: "All",
                iot: "IoT",
                automation: "Automation",
                software: "Software",
                data: "Data"
            },
            labels: {
                problem: "The Challenge:",
                solution: "The Solution:",
                impact: "Key Impact:",
                code: "Code",
                demo: "Demo"
            },
            list: [
                {
                    title: "Hotel Logistics SaaS",
                    problem: "Inefficient room cleaning assignments and lack of real-time status tracking in a busy hotel.",
                    solution: "A complete SaaS platform for assigning rooms, tracking cleaner progress, and managing shift logistics.",
                    impact: "Streamlines daily operations and improves staff accountability."
                },
                {
                    title: "Pharmacy Management Dashboard",
                    problem: "A local pharmacy struggled with manual inventory tracking and profit calculation per product.",
                    solution: "An inventory and financial management system that tracks stock levels, expenses, and calculates profit margins.",
                    impact: "Provides clear financial visibility and prevents stock discrepencies."
                },
                {
                    title: "La Serena Bakery",
                    problem: "A local bakery needed a way to showcase their brand and communicate effective sponsorship opportunities.",
                    solution: "A modern, responsive landing page designed to attract partners and engage customers.",
                    impact: "Enhances digital presence and brand professionalism."
                },
                {
                    title: "Estruccom Engineering",
                    problem: "A structural design firm needed a portfolio to demonstrate their technical capabilities and project status.",
                    solution: "A project showcase platform detailing engineering projects, progress, and client benefits.",
                    impact: "Increases client trust and conversion for high-value contracts."
                },
                {
                    title: "AI Cattle Virtual Fence",
                    problem: "Ranchers face high costs and labor in maintaining physical fences and monitoring herd safety.",
                    solution: "An AI-powered system using computer vision and GPS to create virtual boundaries and monitor cattle 24/7.",
                    impact: "Reduces material costs, allows flexible grazing management, and ensures herd security."
                },
                {
                    title: "Corecare Telemedicine",
                    problem: "Healthcare professionals need a unified platform for remote patient monitoring, communication, and treatment planning.",
                    solution: "A comprehensive telemedicine platform with video conferencing, chat, versioned treatment plans, and progress tracking.",
                    impact: "Improves patient adherence, streamlines clinical workflow, and enables continuous care."
                }
            ]
        },
        contact: {
            title: "Get In Touch",
            heading: "Ready to Optimize?",
            text: "I'm open to freelance projects or discuss how Mint Mango can help your business. Let's connect.",
            email: "Email",
            phone: "Phone",
            formName: "Name",
            formEmail: "Email",
            formMessage: "Message",
            send: "Send Message"
        },
        footer: {
            rights: "Founder of Mint Mango. All rights reserved."
        },
        liveDashboard: {
            title: "System Status",
            nodes: "Active Projects",
            temp: "Optimization",
            uptime: "Uptime"
        }
    },
    es: {
        nav: {
            about: "Sobre Mí",
            experience: "Experiencia",
            skills: "Habilidades",
            projects: "Proyectos",
            contact: "Contacto"
        },
        hero: {
            role: "Ingeniero Mecatrónico",
            title: "Innovando con",
            subtitle: "Mint Mango",
            description: "Fundador de Mint Mango. Combino la Ingeniería Mecatrónica con soluciones de software específicas para resolver problemas logísticos y operativos reales.",
            ctaWork: "Ver Proyectos",
            ctaTalk: "Hablemos",
            ctaCV: "Descargar CV"
        },
        about: {
            title: "Sobre Mí",
            heading: "Ingeniería de Soluciones, no solo código.",
            text1: "Soy Jaime Crow, Ingeniero Mecatrónico y fundador de Mint Mango. Mi enfoque es práctico: resolver problemas. Actualmente, desde Australia, observo de primera mano cómo las ineficiencias logísticas cuestan dinero en el sector hotelero.",
            text2: "Creé Mint Mango para cerrar esa brecha. Ya sea un SaaS de gestión hotelera o un sistema de inventario para farmacias, construyo herramientas que organizan empleados, agilizan la logística y maximizan la rentabilidad.",
            statExp: "Emprendimiento",
            statProj: "Proyectos"
        },
        experience: {
            title: "Trayectoria",
            jobs: [
                {
                    title: "Fundador e Ingeniero Principal",
                    company: "Mint Mango",
                    date: "2024 - Presente",
                    description: "Establecí una empresa de desarrollo para ofrecer soluciones SaaS a medida. Desplegué aplicaciones exitosas para gestión de inventarios y organización logística."
                },
                {
                    title: "Operaciones en Campo (Hospitalidad)",
                    company: "Australia",
                    date: "2024 - Presente",
                    description: "Trabajando en un entorno hotelero de alto volumen para identificar cuellos de botella. Esta experiencia directa inspiró el desarrollo del SaaS de Logística Hotelera."
                },
                {
                    title: "Ingeniería Mecatrónica",
                    company: "Universidad",
                    date: "Graduado",
                    description: "Especialización en automatización y sistemas. Apliqué principios de ingeniería a la arquitectura de software y lógica de negocios."
                }
            ]
        },
        skills: {
            title: "Experiencia Técnica",
            categories: {
                frontend: "Frontend y UI",
                backend: "Backend y Datos",
                mechatronics: "Lógica de Ingeniería",
                data: "Herramientas"
            }
        },
        demo: {
            title: "Demo de Optimización",
            subtitle: "Mira cómo la optimización de variables mejora el resultado final.",
            params: "Parámetros",
            automation: "Nivel de Automatización",
            automationDesc: "Mayor automatización reduce errores manuales.",
            note: "Nota del Fundador:",
            noteText: "\"Mi objetivo es tomar estas variables en tu negocio—tiempo, inventario, personal—y optimizarlas usando software.\"",
            efficiency: "Eficiencia",
            revenue: "Crecimiento",
            roi: "ROI"
        },
        projects: {
            title: "Proyectos Destacados",
            subtitle: "Soluciones reales para necesidades operativas reales.",
            filters: {
                all: "Todos",
                iot: "IoT",
                automation: "Automatización",
                software: "Software",
                data: "Datos"
            },
            labels: {
                problem: "El Desafío:",
                solution: "La Solución:",
                impact: "Impacto Clave:",
                code: "Código",
                demo: "Demo"
            },
            list: [
                {
                    title: "SaaS Logística Hotelera",
                    problem: "Asignación ineficiente de limpieza de habitaciones y falta de seguimiento en tiempo real.",
                    solution: "Plataforma SaaS completa para asignar habitaciones, rastrear progreso y gestionar logística.",
                    impact: "Agiliza las operaciones diarias y mejora la responsabilidad del personal."
                },
                {
                    title: "Dashboard Gestión de Farmacia",
                    problem: "Farmacia local con dificultades en seguimiento manual de inventario y cálculo de ganancias.",
                    solution: "Sistema de gestión financiera y de inventario que rastrea stock, gastos y márgenes.",
                    impact: "Proporciona visibilidad financiera clara y evita discrepancias de stock."
                },
                {
                    title: "La Serena Pastelería",
                    problem: "Necesidad de mostrar la marca y comunicar oportunidades de patrocinio eficazmente.",
                    solution: "Landing page moderna y responsiva diseñada para atraer socios y clientes.",
                    impact: "Mejora la presencia digital y la profesionalidad de la marca."
                },
                {
                    title: "Estruccom Ingeniería",
                    problem: "Firma de diseño estructural necesitaba portafolio para mostrar capacidad técnica.",
                    solution: "Plataforma de escaparate de proyectos detallando progreso y beneficios.",
                    impact: "Aumenta la confianza del cliente y la conversión de contratos."
                },
                {
                    title: "Cerca Virtual Ganadera con IA",
                    problem: "Los ganaderos enfrentan altos costos y trabajo en mantener cercas físicas y monitorear al ganado.",
                    solution: "Sistema impulsado por IA usando visión artificial y GPS para crear límites virtuales y monitorear 24/7.",
                    impact: "Ahorra en materiales, permite pastoreo flexible y asegura la seguridad del rebaño."
                },
                {
                    title: "Corecare Telemedicina",
                    problem: "Los profesionales de salud necesitan una plataforma unificada para monitoreo remoto, comunicación y planes de tratamiento.",
                    solution: "Plataforma integral de telemedicina con videoconferencia, chat, planes de tratamiento versionados y seguimiento de progreso.",
                    impact: "Mejora la adherencia del paciente, optimiza el flujo clínico y permite una atención continua."
                }
            ]
        },
        contact: {
            title: "Contáctame",
            heading: "¿Listo para Optimizar?",
            text: "Estoy abierto a proyectos freelance o discutir cómo Mint Mango puede ayudar a tu negocio.",
            email: "Correo",
            phone: "Teléfono",
            formName: "Nombre",
            formEmail: "Correo",
            formMessage: "Mensaje",
            send: "Enviar Mensaje"
        },
        footer: {
            rights: "Fundador de Mint Mango. Todos los derechos reservados."
        },
        liveDashboard: {
            title: "Estado del Sistema",
            nodes: "Proyectos Activos",
            temp: "Optimización",
            uptime: "Tiempo Activo"
        }
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default to English

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

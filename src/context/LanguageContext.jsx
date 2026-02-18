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
                    title: "Adv. Diploma in IT (Telecommunications)",
                    company: "Australia",
                    type: "education",
                    date: "2025 - Present",
                    description: "Specializing in network infrastructure, wireless communication, and IoT connectivity protocols.",
                    tags: ["Networking", "IoT", "Telecommunications"]
                },
                {
                    title: "Co-Founder & Lead Engineer",
                    company: "Mint Mango",
                    type: "entrepreneurship",
                    date: "2025 - Present",
                    description: "Identified logistical inefficiencies in hospitality. Co-founded a SaaS startup to automate hotel operations and staff management.",
                    tags: ["React", "Supabase", "SaaS", "Business Logic"]
                },
                {
                    title: "Logistics & Housekeeping",
                    company: "Quest Hotels",
                    type: "work",
                    date: "2025 - Present",
                    description: "Gained firsthand insight into operational bottlenecks. This direct experience inspired the architecture of Mint Mango's logic.",
                    tags: ["Operations", "Logistics", "Process Optimization"]
                },
                {
                    title: "Founder",
                    company: "Virtual Cattle Fence",
                    type: "entrepreneurship",
                    date: "2024 - Present",
                    description: "Pivoted from hardware repair to creating a GPS-based virtual fencing system for livestock management.",
                    tags: ["IoT", "Hardware", "GPS", "Embedded Systems"]
                },
                {
                    title: "Full Stack Developer (Self-Taught)",
                    company: "Self-Employed",
                    type: "education",
                    date: "2020 - 2023",
                    description: "Leveraged COVID isolation to master modern web stacks. Shifted focus from mechanical systems to software architecture.",
                    tags: ["JavaScript", "Python", "Web Development"]
                },
                {
                    title: "Maintenance Engineer",
                    company: "AEMSA",
                    type: "work",
                    date: "2023",
                    description: "Brief tenure in industrial maintenance. Realized a passion for building new systems rather than maintaining old ones.",
                    tags: ["Maintenance", "Industrial Engineering"]
                },
                {
                    title: "B.S. Mechatronics Engineering",
                    company: "University",
                    type: "education",
                    date: "Graduated 2023",
                    description: "Foundation in automation, control systems, and electronics. The bridge between hardware logic and software code.",
                    tags: ["Mechatronics", "Automation", "Control Systems"]
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
                    title: "Adv. Diploma en TI (Telecomunicaciones)",
                    company: "Australia",
                    type: "education",
                    date: "2025 - Presente",
                    description: "Especialización en infraestructura de redes, comunicación inalámbrica y protocolos de conectividad IoT.",
                    tags: ["Redes", "IoT", "Telecomunicaciones"]
                },
                {
                    title: "Cofundador e Ingeniero Principal",
                    company: "Mint Mango",
                    type: "entrepreneurship",
                    date: "2025 - Presente",
                    description: "Identifiqué ineficiencias logísticas en la hospitalidad. Cofundé una startup SaaS para automatizar operaciones hoteleras.",
                    tags: ["React", "Supabase", "SaaS", "Lógica de Negocios"]
                },
                {
                    title: "Logística y Housekeeping",
                    company: "Quest Hotels",
                    type: "work",
                    date: "2025 - Presente",
                    description: "Obtuve visión directa de los cuellos de botella operativos. Esta experiencia inspiró la arquitectura de Mint Mango.",
                    tags: ["Operaciones", "Logística", "Optimización de Procesos"]
                },
                {
                    title: "Fundador",
                    company: "Cerca Virtual Ganadera",
                    type: "entrepreneurship",
                    date: "2024 - Presente",
                    description: "Pivoteé de la reparación de hardware a crear un sistema de cercado virtual basado en GPS para ganado.",
                    tags: ["IoT", "Hardware", "GPS", "Sistemas Embebidos"]
                },
                {
                    title: "Desarrollador Full Stack (Autodidacta)",
                    company: "Independiente",
                    type: "education",
                    date: "2020 - 2023",
                    description: "Aproveché el aislamiento por COVID para dominar stacks web modernos. Cambié el enfoque de sistemas mecánicos a arquitectura de software.",
                    tags: ["JavaScript", "Python", "Desarrollo Web"]
                },
                {
                    title: "Ingeniero de Mantenimiento",
                    company: "AEMSA",
                    type: "work",
                    date: "2023",
                    description: "Breve periodo en mantenimiento industrial. Descubrí mi pasión por construir nuevos sistemas en lugar de mantener los antiguos.",
                    tags: ["Mantenimiento", "Ingeniería Industrial"]
                },
                {
                    title: "Ingeniero Mecatrónica",
                    company: "Universidad",
                    type: "education",
                    date: "Graduado 2023",
                    description: "Fundamentos en automatización, sistemas de control y electrónica. El puente entre la lógica de hardware y el código de software.",
                    tags: ["Mecatrónica", "Automatización", "Sistemas de Control"]
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

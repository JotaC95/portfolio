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
            title: "Optimizing Business",
            subtitle: "Through Engineering",
            description: "I develop high-impact technical solutions to maximize efficiency and profitability. Bridging the gap between mechanical systems, electronics, and software.",
            ctaWork: "View My Work",
            ctaTalk: "Let's Talk",
            ctaCV: "Download CV"
        },
        about: {
            title: "About Me",
            heading: "More than just code. I build solutions.",
            text1: "As a Mechatronics Engineer, I don't just see software or hardware in isolation. I see systems. My passion lies in identifying inefficiencies and engineering robust automation solutions that driving real business value.",
            text2: "Whether it's optimizing a production line algorithm, developing a custom IoT dashboard, or automating administrative workflow, my goal is always the same: Maximize Profitability through Optimization.",
            statExp: "Years Exp",
            statProj: "Projects"
        },
        experience: {
            title: "Career Map",
            jobs: [
                {
                    title: "Senior Mechatronics Engineer",
                    company: "TechAutomate Solutions",
                    date: "2023 - Present",
                    description: "Leading a team of 5 in designing custom automated assembly lines. Improved client throughput by an average of 35%."
                },
                {
                    title: "Automation Specialist",
                    company: "Industrial Systems Inc.",
                    date: "2021 - 2023",
                    description: "Programmed PLC logic for packaging machinery and implemented SCADA systems for real-time monitoring."
                },
                {
                    title: "B.S. Mechatronics Engineering",
                    company: "Technical University",
                    date: "2017 - 2021",
                    description: "Graduated with Honors. Capstone project: Autonomous warehouse sorting robot using computer vision."
                }
            ]
        },
        skills: {
            title: "Technical Expertise",
            categories: {
                frontend: "Frontend Development",
                backend: "Backend & Systems",
                mechatronics: "Mechatronics & IoT",
                data: "Data & Optimization"
            }
        },
        demo: {
            title: "See The Impact",
            subtitle: "Adjust the automation level to see how engineering improvements directly translate to business results.",
            params: "System Parameters",
            automation: "Automation Level",
            automationDesc: "Increasing automation reduces manual error and speeds up throughput.",
            note: "Engineer's Note:",
            noteText: "\"Every standard deviation reduced in process variability correlates directly to bottom-line growth. My job is to move these sliders for you using code and hardware.\"",
            efficiency: "Operational Efficiency",
            revenue: "Projected Revenue",
            roi: "ROI"
        },
        projects: {
            title: "Case Studies",
            subtitle: "Real-world problems solved through engineering and optimization.",
            filters: {
                all: "All",
                iot: "IoT",
                automation: "Automation",
                software: "Software",
                data: "Data"
            },
            labels: {
                problem: "Problem:",
                solution: "Solution:",
                impact: "Impact:",
                code: "Code",
                demo: "Demo"
            },
            list: [
                {
                    title: "Automated Inventory System",
                    problem: "Manual stock tracking led to 15% discrepancies and lost revenue.",
                    solution: "Implemented IoT weight sensors linked to a React dashboard.",
                    impact: "Reduced errors by 40% and improved turnover speed by 25%."
                },
                {
                    title: "Production Line Monitor",
                    problem: "Unpredicted equipment failure caused 4 hours of downtime/week.",
                    solution: "Developed vibration analysis system using ESP32 & WebSockets.",
                    impact: "Predicted maintenance allowed 0% unplanned downtime in Q1."
                },
                {
                    title: "Energy Efficiency Bot",
                    problem: "HVAC systems ran constantly, wasting energy in empty zones.",
                    solution: "Created ML algorithm adjusting to occupancy & weather.",
                    impact: "Saved client an estimated 15% in annual energy costs."
                },
                {
                    title: "Smart Agriculture Controller",
                    problem: "Inconsistent irrigation wasted water and reduced crop yield.",
                    solution: "Automated valve control system based on soil moisture sensors.",
                    impact: "Reduced water usage by 30% while increasing yield by 10%."
                }
            ]
        },
        contact: {
            title: "Get In Touch",
            heading: "Let's Build Something Great",
            text: "I'm currently open to new opportunities, freelance projects, or consulting work. If you have an efficiency problem that needs engineering, let's talk.",
            email: "Email",
            phone: "Phone",
            formName: "Name",
            formEmail: "Email",
            formMessage: "Message",
            send: "Send Message"
        },
        footer: {
            rights: "Mechatronics Engineer. All rights reserved."
        },
        liveDashboard: {
            title: "Live Server Status",
            nodes: "Active Nodes",
            temp: "Server Temp",
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
            title: "Optimizando Negocios",
            subtitle: "A Través de la Ingeniería",
            description: "Desarrollo soluciones técnicas de alto impacto para maximizar la eficiencia y la rentabilidad. Uniendo sistemas mecánicos, electrónica y software.",
            ctaWork: "Ver Proyectos",
            ctaTalk: "Hablemos",
            ctaCV: "Descargar CV"
        },
        about: {
            title: "Sobre Mí",
            heading: "Más que código. Construyo soluciones.",
            text1: "Como Ingeniero Mecatrónico, no veo software o hardware de forma aislada. Veo sistemas. Mi pasión es identificar ineficiencias y diseñar soluciones de automatización robustas que generen valor real al negocio.",
            text2: "Ya sea optimizando un algoritmo de línea de producción, desarrollando un dashboard IoT a medida o automatizando flujos administrativos, mi objetivo es siempre el mismo: Maximizar la Rentabilidad a través de la Optimización.",
            statExp: "Años Exp",
            statProj: "Proyectos"
        },
        experience: {
            title: "Trayectoria",
            jobs: [
                {
                    title: "Ingeniero Mecatrónico Senior",
                    company: "TechAutomate Solutions",
                    date: "2023 - Presente",
                    description: "Liderando un equipo de 5 personas en el diseño de líneas de montaje automatizadas. Mejoré el rendimiento del cliente en un promedio del 35%."
                },
                {
                    title: "Especialista en Automatización",
                    company: "Industrial Systems Inc.",
                    date: "2021 - 2023",
                    description: "Programación de lógica PLC para maquinaria de envasado e implementación de sistemas SCADA para monitoreo en tiempo real."
                },
                {
                    title: "Ingeniería Mecatrónica",
                    company: "Universidad Técnica",
                    date: "2017 - 2021",
                    description: "Graduado con Honores. Proyecto final: Robot de clasificación de almacén autónomo usando visión artificial."
                }
            ]
        },
        skills: {
            title: "Experiencia Técnica",
            categories: {
                frontend: "Desarrollo Frontend",
                backend: "Backend y Sistemas",
                mechatronics: "Mecatrónica e IoT",
                data: "Datos y Optimización"
            }
        },
        demo: {
            title: "Mira El Impacto",
            subtitle: "Ajusta el nivel de automatización para ver cómo las mejoras de ingeniería se traducen directamente en resultados comerciales.",
            params: "Parámetros del Sistema",
            automation: "Nivel de Automatización",
            automationDesc: "Aumentar la automatización reduce el error manual y acelera el rendimiento.",
            note: "Nota del Ingeniero:",
            noteText: "\"Cada desviación estándar reducida en la variabilidad del proceso se correlaciona directamente con el crecimiento de las ganancias. Mi trabajo es mover estos controles usando código y hardware.\"",
            efficiency: "Eficiencia Operativa",
            revenue: "Ingresos Proyectados",
            roi: "ROI"
        },
        projects: {
            title: "Casos de Estudio",
            subtitle: "Problemas del mundo real resueltos a través de ingeniería y optimización.",
            filters: {
                all: "Todos",
                iot: "IoT",
                automation: "Automatización",
                software: "Software",
                data: "Datos"
            },
            labels: {
                problem: "Problema:",
                solution: "Solución:",
                impact: "Impacto:",
                code: "Código",
                demo: "Demo"
            },
            list: [
                {
                    title: "Sistema de Inventario Automatizado",
                    problem: "El seguimiento manual causaba discrepancias del 15% y pérdida de ingresos.",
                    solution: "Sensores de peso IoT implementados vinculados a un dashboard React.",
                    impact: "Reducción de errores del 40% y mejora de velocidad del 25%."
                },
                {
                    title: "Monitor de Línea de Producción",
                    problem: "Fallas imprevistas de equipos causaban 4 horas de inactividad/semana.",
                    solution: "Sistema de análisis de vibraciones con ESP32 y WebSockets.",
                    impact: "El mantenimiento predictivo permitió 0% de inactividad no planificada."
                },
                {
                    title: "Bot de Eficiencia Energética",
                    problem: "Los sistemas HVAC funcionaban constantemente, desperdiciando energía.",
                    solution: "Algoritmo de ML creado que se ajusta a la ocupación y el clima.",
                    impact: "Ahorro estimado del 15% en costos de energía anuales para el cliente."
                },
                {
                    title: "Controlador de Agricultura Inteligente",
                    problem: "El riego inconsistente desperdiciaba agua y reducía el rendimiento.",
                    solution: "Sistema de control de válvulas automatizado basado en sensores de humedad.",
                    impact: "Reducción del uso de agua del 30% y aumento del rendimiento del 10%."
                }
            ]
        },
        contact: {
            title: "Contáctame",
            heading: "Construyamos Algo Genial",
            text: "Actualmente estoy abierto a nuevas oportunidades, proyectos freelance o consultoría. Si tienes un problema de eficiencia que necesita ingeniería, hablemos.",
            email: "Correo",
            phone: "Teléfono",
            formName: "Nombre",
            formEmail: "Correo",
            formMessage: "Mensaje",
            send: "Enviar Mensaje"
        },
        footer: {
            rights: "Ingeniero Mecatrónico. Todos los derechos reservados."
        },
        liveDashboard: {
            title: "Estado del Servidor",
            nodes: "Nodos Activos",
            temp: "Temp. Servidor",
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

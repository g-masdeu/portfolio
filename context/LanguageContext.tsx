"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

// Diccionario de traducciones
const translations = {
    en: {
        nav: {
            about: "About me",
            projects: "Projects",
            tech: "Technologies",
            contact: "Contact me",
        },
        hero: {
            role: "Full-stack Developer",
        },
        about: {
            title: "About me",
            based: "Based in",
            role: "Role",
            focus: "Focus",
            introTitle: "Hi, I’m Guillem — I build clean, fast apps.",
            introText: "I’m a developer focused on delivering accessible, performant interfaces and maintainable backends. I enjoy translating product ideas into clear components, reusable patterns, and measurable impact.",
            exp: "Experience",
            projects: "Projects",
            stack: "Stack",
            ctaProject: "View projects",
            ctaContact: "Contact me",
            ctaCV: "Download CV",
            years: "1+ yrs",
            shipped: "3+ shipped",
        },
        projects: {
            title: "Projects",
            searchPlaceholder: "Search by title, tech…",
            recent: "Recent",
            alpha: "A–Z",
            all: "All",
            openSource: "Open-source",
            private: "Private",
            notFound: "No projects found.",
        },
        tech: {
            title: "Languages & Technologies",
            searchPlaceholder: "Search tech, e.g. React…",
            notFound: "No technologies found.",
            categories: {
                technologies: "Technologies",
                databases: "Databases",
                tooling: "Tooling & DevOps",
                testing: "Testing",
                design: "Design & UX",
            }
        },
        contact: {
            title: "Contact me",
            formTitle: "Send me a message",
            name: "Name",
            namePlaceholder: "Your name",
            email: "Email",
            emailPlaceholder: "you@email.com",
            message: "Message",
            messagePlaceholder: "Tell me about your project…",
            send: "Send",
            sending: "Sending…",
            sent: "Thanks! Your message has been sent.",
            error: "Something went wrong.",
            direct: "Direct contact",
            note: "Prefer email for proposals.",
            response: "Response within 24–48h"
        },
        footer: {
            rights: "All rights reserved.",
            top: "Top",
        },
    },
    es: {
        nav: {
            about: "Sobre mí",
            projects: "Proyectos",
            tech: "Tecnologías",
            contact: "Contacto",
        },
        hero: {
            role: "Desarrollador Full-stack",
        },
        about: {
            title: "Sobre mí",
            based: "Ubicación",
            role: "Rol",
            focus: "Enfoque",
            introTitle: "Hola, soy Guillem. Creo apps limpias y rápidas.",
            introText: "Soy un desarrollador centrado en ofrecer interfaces accesibles y backends mantenibles. Disfruto traduciendo ideas de productos en componentes claros y patrones reutilizables.",
            exp: "Experiencia",
            projects: "Proyectos",
            stack: "Stack",
            ctaProject: "Ver proyectos",
            ctaContact: "Contactar",
            ctaCV: "Descargar CV",
            years: "1+ años",
            shipped: "3+ lanzados",
        },
        projects: {
            title: "Proyectos",
            searchPlaceholder: "Buscar por título, tecnología...",
            recent: "Recientes",
            alpha: "A–Z",
            all: "Todos",
            openSource: "Código abierto",
            private: "Privado",
            notFound: "No se encontraron proyectos.",
        },
        tech: {
            title: "Lenguajes y Tecnologías",
            searchPlaceholder: "Buscar tecnología...",
            notFound: "No se encontraron tecnologías.",
            categories: {
                technologies: "Tecnologías",
                databases: "Base de Datos",
                tooling: "Herramientas & DevOps",
                testing: "Testing",
                design: "Diseño & UX",
            }
        },
        contact: {
            title: "Contáctame",
            formTitle: "Envíame un mensaje",
            name: "Nombre",
            namePlaceholder: "Tu nombre",
            email: "Email",
            emailPlaceholder: "tu@email.com",
            message: "Mensaje",
            messagePlaceholder: "Háblame de tu proyecto...",
            send: "Enviar",
            sending: "Enviando...",
            sent: "¡Gracias! Tu mensaje ha sido enviado.",
            error: "Algo salió mal.",
            direct: "Contacto directo",
            note: "Prefiero email para propuestas.",
            response: "Respuesta en 24-48h"
        },
        footer: {
            rights: "Todos los derechos reservados.",
            top: "Arriba",
        },
    },
};

interface LanguageContextProps {
    language: Language;
    toggleLanguage: () => void;
    t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "es" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
"use client";

import { LanguageProvider, useLanguage } from "@/context/LanguageContext"; // Importa el provider
import LanguageToggle from "@/components/LanguageToggle"; // Importa el botón
import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import TechSection from "@/components/sections/TechSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactMeSection from "@/components/sections/ContactMeSection";

// Creamos un componente interno para usar el hook 'useLanguage'
function HomeContent() {
  const { t } = useLanguage();

  return (
    <div>
      <div id="top" />
      <LanguageToggle /> {/* Aquí va el botón de la bandera */}

      {/* NOMBRE */}
      <h1>Guillem Masdeu</h1>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50">
        <Navigation />
      </header>

      {/* ABOUT ME */}
      <h2 id="about-me" className="scroll-mt-28">{t.about.title}</h2>
      <div className="seccion">
        <AboutSection />
      </div>

      <div className="divider" />

      {/* PROJECTS */}
      <h2 id="projects" className="scroll-mt-28">{t.projects.title}</h2>
      <div className="seccion">
        <ProjectsSection />
      </div>

      <div className="divider" />

      {/* TECHNOLOGIES */}
      <h2 id="technologies" className="scroll-mt-28">{t.tech.title}</h2>
      <div className="seccion">
        <TechSection />
      </div>

      <div className="divider" />

      {/* CONTACT */}
      <h2 id="contact" className="scroll-mt-28">{t.contact.title}</h2>
      <div className="seccion">
        <ContactMeSection />
      </div>
    </div>
  );
}

// El componente default exportado envuelve todo en el Provider
export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
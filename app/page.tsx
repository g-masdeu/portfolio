"use client";

import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import TechSection from "@/components/sections/TechSection";
import ContactMeSection from "@/components/sections/ContactMeSection";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center">
      
      {/* Ancla invisible para volver arriba */}
      <div id="top" />

      {/* 
         1. BOTÓN DE IDIOMA 
         Se renderiza aquí limpio. La animación y posición van dentro del componente.
      */}
      <LanguageToggle />

      {/* 
         2. TÍTULO CON ANIMACIÓN DE ENTRADA (PIXAR)
         Es el único elemento visible al cargar la página.
      */}
      <div className="relative z-50 pt-8 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold animate-pixar cursor-default">
          Guillem Masdeu
        </h1>
      </div>

      {/* 
         3. NAVBAR (STICKY)
         Tiene su propia animación de entrada (delayed). 
         Está fuera de <main> para garantizar que 'sticky' funcione.
      */}
      <header className="sticky top-0 z-40 mb-8 w-full flex justify-center animate-delayed-reveal">
        <Navigation />
      </header>

      {/* 
         4. RESTO DEL CONTENIDO
         Todo esto aparece suavemente después de que el título sube.
      */}
      <main className="animate-delayed-reveal w-full flex flex-col items-center pb-20">
        
        <div className="w-full max-w-[1100px] px-4 space-y-12">
          
          {/* SECCIÓN: SOBRE MÍ */}
          <div>
             <h2 id="about-me" className="scroll-mt-28">{t.about.title}</h2>
             <div className="seccion">
               <AboutSection />
             </div>
          </div>

          <div className="divider" />

          {/* SECCIÓN: PROYECTOS */}
          <div>
            <h2 id="projects" className="scroll-mt-28">{t.projects.title}</h2>
            <div className="seccion">
              <ProjectsSection />
            </div>
          </div>

          <div className="divider" />

          {/* SECCIÓN: TECNOLOGÍAS */}
          <div>
            <h2 id="technologies" className="scroll-mt-28">{t.tech.title}</h2>
            <div className="seccion">
              <TechSection />
            </div>
          </div>

          <div className="divider" />

          {/* SECCIÓN: CONTACTO */}
          <div>
            <h2 id="contact" className="scroll-mt-28">{t.contact.title}</h2>
            <div className="seccion">
              <ContactMeSection />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
"use client";

import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import TechSection from "@/components/sections/TechSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactMeSection from "@/components/sections/ContactMeSection";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <div>
      <div id="top" />

      {/* NOMBRE */}
      <h1>Guillem Masdeu</h1>

      {/* NAVBAR debajo del nombre */}
      <header className="sticky top-0 z-50">
        <Navigation />
      </header>

      {/* ABOUT ME */}
      <h2 id="about-me" className="scroll-mt-28">About me</h2>
      <div className="seccion">
        <AboutSection />
      </div>

      <div className="divider" />

      {/* PROJECTS */}
      <h2 id="projects" className="scroll-mt-28">Projects</h2>
      <div className="seccion">
        <ProjectsSection />
      </div>

      <div className="divider" />

      {/* TECHNOLOGIES */}
      <h2 id="technologies" className="scroll-mt-28">Languages & Technologies</h2>
      <div className="seccion">
        <TechSection />
      </div>

      <div className="divider" />

      {/* CONTACT */}
      <h2 id="contact" className="scroll-mt-28">Contact me</h2>
      <div className="seccion">
        <ContactMeSection />
      </div>
    </div>
  )
}

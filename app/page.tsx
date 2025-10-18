"use client";

import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import TechSection from "@/components/sections/TechSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactMeSection from "@/components/sections/ContactMeSection";

export default function Home() {

  return (
    <div>
      <div id="top"></div>
      <h1 className="text-center">Guillem Masdeu</h1>
      <div className="sticky top-0 z-50">
        <Navigation />      
      </div>

      <h2 id="about-me" className="scroll-mt-28">About me</h2>
      <AboutSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mt-5" />
      <h2 id="projects" className="scroll-mt-28">Projects</h2>
      <ProjectsSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mt-5" />
      <h2 id="technologies" className="scroll-mt-28">Languages & Technologies</h2>
      <TechSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mt-5" />
      <h2 id="contact" className="scroll-mt-28">Contact me</h2>
      <ContactMeSection />
    </div>
  )
}

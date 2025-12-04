"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  name?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  // Quitamos 'sections' de los props obligatorios para gestionarlo internamente con traducciones,
  // pero lo dejamos opcional por si quieres forzar enlaces distintos.
  sections?: { href: string; label: string }[];
};

export default function FooterFullBleed({
  name = "Guillem Masdeu",
  email = "guillem.masdeu97@gmail.com",
  github = "https://github.com/g-masdeu",
  linkedin = "https://www.linkedin.com/in/guillem9masdeu",
  sections, 
}: Props) {
  const { t } = useLanguage(); // <--- Usar traducciones
  const year = new Date().getFullYear();

  // Si no se pasan secciones por props, usamos las traducidas por defecto
  const navLinks = sections || [
    { href: "#about-me", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#technologies", label: t.nav.tech },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="w-full">
      {/* Capa de fondo a pantalla completa */}
      <div className="w-full bg-gradient-to-b from-background/60 to-background/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-t mt-10">
        {/* Contenedor interno centrado */}
        <div className="container mx-auto px-4 py-8">
          {/* Fila principal */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Footer" className="text-sm">
              <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("#") ? (
                      <a 
                        href={item.href} 
                        className="inline-flex items-center gap-2 rounded-full bg-black text-white border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link 
                        href={item.href} 
                        className="inline-flex items-center gap-2 rounded-full bg-black text-white border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-left">
              <a 
                 href={`mailto:${email}?subject=Propuesta`}                
                 className="inline-flex items-center gap-2 rounded-full bg-black text-white border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Mail className="size-4 opacity-80" />
                {email}
              </a>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black text-white border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Github className="size-4 opacity-80" />
                GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black text-white border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Linkedin className="size-4 opacity-80" />
                LinkedIn
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-full bg-black text-white border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp className="size-4" /> {t.footer?.top || "Top"}
              </button>
            </div>
          </div>

          {/* Línea inferior */}
          <div className="mt-6 flex flex-col items-center gap-2 md:flex-row justify-center">
            <p className="text-xs text-muted-foreground">
              © {year} {name}. {t.footer?.rights || "All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
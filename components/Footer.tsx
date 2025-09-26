// components/FooterFullBleed.tsx
"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, ArrowUp } from "lucide-react";

type Props = {
  name?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  sections?: { href: string; label: string }[];
};

export default function FooterFullBleed({
  name = "Guillem Masdeu",
  email = "guillem.masdeu97@gmail.com",
  github = "https://github.com/g-masdeu",
  linkedin = "https://www.linkedin.com/in/guillem9masdeu",
  sections = [
    { href: "#about-me", label: "About me" },
    { href: "#technologies", label: "Technologies" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#more-about-me", label: "More" },
    { href: "#contact", label: "Contact" },
  ],
}: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* Capa de fondo a pantalla completa */}
      <div className="w-full bg-gradient-to-b from-background/60 to-background/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-t mt-10">
        {/* Contenedor interno centrado */}
        <div className="container mx-auto px-4 py-8">
          {/* Fila principal */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Footer" className="text-sm">
              <ul className="flex gap-2">
                {sections.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("#") ? (
                      <a href={item.href} className=" inline-flex items-center gap-2 rounded-full bg-black text-whtie border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="w-25 mx-auto inline-flex items-center gap-2 rounded-full bg-black text-whtie border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-full bg-black text-whtie border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Mail className="size-4 opacity-80" />
                {email}
              </a>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black text-whtie border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Github className="size-4 opacity-80" />
                GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black text-whtie border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Linkedin className="size-4 opacity-80" />
                LinkedIn
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-full bg-black text-whtie border px-3 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp className="size-4" /> Top
              </button>
            </div>
          </div>

          {/* Línea inferior */}
          <div className="mt-6 flex flex-col items-center gap-2 md:flex-row justify-center">
            <p className="text-xs text-muted-foreground">© {year} {name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

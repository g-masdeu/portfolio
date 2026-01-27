"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type Project = {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  image?: string;
  github?: string;
  year?: number;
  link?: string;
};

const getProjects = (lang: "en" | "es"): Project[] => {
  const isEn = lang === "en";

  return [
    {
      id: "p8",
      title: "Penalty Game",
      summary: isEn
        ? "Online web game to shoot and save football penalties against another player."
        : "Juego web online para chutar y parar penaltis de fútbol contra otro jugador.",
      tech: ["React", "NodeJS"],
      image: "/projects/p8.png",
      github: "https://github.com/asogomez22/DevChallenge3",
      link: "https://juego-penaltis-web.onrender.com/",
      year: 2025,
    },
    {
      id: "p7",
      title: "To Do List",
      summary: isEn
        ? "Web application designed to manage shopping lists and share them with other users."
        : "Aplicación web diseñada para gestionar listas de la compra y poder compartirlas con otros usuarios.",
      tech: ["Laravel", "PHP", "Bootstrap", "SQLite"],
      image: "/projects/p7.png",
      github: "https://github.com/asogomez22/DevChallenge2",
      link: "https://devchallenge2-main-j86vay.laravel.cloud/",
      year: 2025,
    },
    {
      id: "p6",
      title: "Quiz Game",
      summary: isEn
        ? "Quiz Game designed for Android using Flutter, featuring multi-language support, sound effects, and animations."
        : "Juego de preguntas para Android hecho con Flutter. Incluye soporte multiidioma, efectos de sonido y animaciones.",
      tech: [".dart", "Flutter"],
      image: "/quiz.png",
      github: "https://github.com/g-masdeu/QuizGame",
      link: "http://213.199.55.138:8082/",
      year: 2025,
    },
    {
      id: "p1",
      title: "VideoClub Store",
      summary: isEn
        ? "Project to work with Laravel CRUD MVC architecture."
        : "Proyecto para practicar la arquitectura CRUD MVC con Laravel.",
      tech: ["Laravel", "Bootstrap", "PHP", "MySQL"],
      image: "/projects/p1.png",
      github: "https://github.com/g-masdeu/VideoClub",
      year: 2025,
    },
    {
      id: "p5",
      title: "Portfolio",
      summary: isEn
        ? "My personal portfolio as a full-stack developer."
        : "Mi portafolio personal como desarrollador full-stack.",
      tech: ["Next.js", "TypeScript", "JavaScript", "TailwindCSS"],
      image: "/projects/p5.png",
      github: "https://github.com/g-masdeu/portfolio",
      link: "https://www.guillemmasdeu.dev/",
      year: 2025,
    },
    {
      id: "p2",
      title: "Book Reviews",
      summary: isEn
        ? "Social app where users can read and write reviews of books. Designed as a Laravel MVC CRUD."
        : "App social donde los usuarios leen y escriben reseñas de libros. Diseñado como un CRUD MVC en Laravel.",
      tech: ["Laravel", "Bootstrap", "PHP", "MySQL"],
      image: "/projects/p2.png",
      github: "https://github.com/g-masdeu/Llibres",
      year: 2025,
    },
    {
      id: "p3",
      title: "GPX Statics",
      summary: isEn
        ? "App to handle .GPX files. Users can upload a file to view main statistics and a map track."
        : "App para gestionar archivos .GPX. El usuario sube un archivo para ver estadísticas clave y la ruta en un mapa.",
      tech: ["Flutter", "SQLite", ".dart"],
      image: "/projects/p3.png",
      github: "https://github.com/g-masdeu/GPXStatics",
      year: 2025,
    },
    {
      id: "p4",
      title: "Buscaminas",
      summary: isEn
        ? "Classic Minesweeper game built with JavaScript to master DOM manipulation."
        : "El clásico Buscaminas creado con JavaScript para dominar la manipulación del DOM.",
      tech: ["JavaScript"],
      image: "/projects/p4.png",
      github: "https://github.com/g-masdeu/Buscaminas",
      year: 2025,
      link: "http://213.199.55.138/",
    },
  ];
};

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const projectsData = getProjects(language);

  // Extraemos todas las tecnologías para los filtros
  const allTech = useMemo(() => Array.from(new Set(projectsData.flatMap(p => p.tech))).sort(), [projectsData]);

  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"recent" | "alpha">("recent");

  // Lógica de filtrado
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = projectsData.filter(p => {
      const textMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tech.join(" ").toLowerCase().includes(q);

      const tagsMatch =
        activeTags.length === 0 ||
        activeTags.every(t => p.tech.includes(t));

      return textMatch && tagsMatch;
    });

    if (sort === "recent") list = list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    if (sort === "alpha") list = list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [query, activeTags, sort, projectsData]);

  const toggleTag = (t: string) =>
    setActiveTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));

  return (
    <section className="mt-4">
      {/* Controles de búsqueda y filtros */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-72 bg-white hover:shadow-amber-50 text-black"
            aria-label="Search projects"
          />
          <div className="inline-flex rounded-full border bg-background/70 p-1">
            <Button
              size="sm"
              variant={sort === "recent" ? "default" : "ghost"}
              className={cn(
                "rounded-full",
                // Estilo actualizado para coincidir con TechSection
                sort === "recent" ? "bg-white text-black hover:bg-white/90" : "text-muted-foreground"
              )}
              onClick={() => setSort("recent")}
            >
              {t.projects.recent}
            </Button>
            <Button
              size="sm"
              variant={sort === "alpha" ? "default" : "ghost"}
              className={cn(
                "rounded-full",
                // Estilo actualizado para coincidir con TechSection
                sort === "alpha" ? "bg-white text-black hover:bg-white/90" : "text-muted-foreground"
              )}
              onClick={() => setSort("alpha")}
            >
              {t.projects.alpha}
            </Button>
          </div>
        </div>

        {/* Badges de filtro */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={activeTags.length === 0 ? "default" : "outline"}
            className={cn(
              "cursor-pointer select-none",
              // Estilo actualizado para coincidir con TechSection
              activeTags.length === 0 && "bg-white text-black hover:bg-white/90"
            )}
            onClick={() => setActiveTags([])}
          >
            {t.projects.all}
          </Badge>
          {allTech.map(t => (
            <Badge
              key={t}
              variant={activeTags.includes(t) ? "default" : "outline"}
              className={cn(
                "cursor-pointer select-none",
                // Estilo actualizado para coincidir con TechSection
                activeTags.includes(t) && "bg-white text-black hover:bg-white/90"
              )}
              onClick={() => toggleTag(t)}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <Card key={p.id} className="overflow-hidden border bg-card/70 backdrop-blur transition hover:shadow-lg flex flex-col">
            {/* Imagen del proyecto */}
            {p.image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <div className="text-xs text-muted-foreground">{p.year ?? ""}</div>
            </CardHeader>

            <CardContent className="space-y-3 flex-grow">
              <p className="text-sm text-muted-foreground">{p.summary}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <Badge
                    key={t}
                    // Utilizamos variant outline por defecto o default si está activo
                    variant={activeTags.includes(t) ? "default" : "secondary"}
                    className={cn(
                      "cursor-pointer transition-colors",
                      // Estilo activo: blanco con texto negro (TechSection style)
                      activeTags.includes(t)
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-2 mt-auto">
              <div className="flex gap-3 ml-auto">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    title={p.title}
                    aria-label={p.title}
                    className="relative text-muted-foreground transition hover:text-primary 
                   before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 
                   before:bg-primary before:transition-all before:duration-300 
                   hover:before:w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z" />
                      <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                    </svg>
                  </a>
                )}

                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    title={p.title}
                    aria-label={p.title}
                    className="relative text-muted-foreground transition hover:text-primary 
                   after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 
                   after:h-8 after:w-0 after:bg-primary/20 after:skew-x-12 after:transition-all 
                   after:duration-300 hover:after:w-[140%]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.74 1.27 3.41.97.11-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.27.45-2.31 1.2-3.13-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.58.23 2.75.11 3.04.75.82 1.19 1.86 1.19 3.13 0 4.45-2.69 5.42-5.25 5.7.42.36.8 1.1.8 2.22v3.29c0 .31.21.68.8.56A10.99 10.99 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                    </svg>
                  </a>
                )}
              </div>
            </CardFooter>

          </Card>
        ))}
      </div>

      {/* Mensaje de no encontrado */}
      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border bg-background/70 p-6 text-center text-sm text-muted-foreground">
          {t.projects.notFound}
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
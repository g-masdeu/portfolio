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
};

// Función que devuelve los proyectos con los textos traducidos según el idioma
const getProjects = (lang: "en" | "es"): Project[] => {
  const isEn = lang === "en";

  return [
    {
      id: "p6",
      title: "Quiz Game",
      summary: isEn 
        ? "Quiz Game designed for Android using Flutter, featuring multi-language support, sound effects, and animations." 
        : "Juego de preguntas para Android hecho con Flutter. Incluye soporte multiidioma, efectos de sonido y animaciones.",
      tech: [".dart", "Flutter"],
      image: "/quiz.png",
      github: "https://github.com/g-masdeu/QuizGame", 
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
      tech: ["Next.js", "TypeScript", "JavaScript", "TailwindCSS" ],
      image: "/nextjs.jpg",
      github: "https://github.com/g-masdeu/portfolio", 
      year: 2025,
    },
    {
      id: "p2",
      title: "Book Reviews",
      summary: isEn 
        ? "Social app where users can read and write reviews of books. Designed as a Laravel MVC CRUD." 
        : "App social donde los usuarios leen y escriben reseñas de libros. Diseñado como un CRUD MVC en Laravel.",
      tech: ["Laravel", "Bootstrap","PHP", "MySQL"],
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
    },
  ];
};

export function ProjectsSection() {
  const { language, t } = useLanguage(); 
  
  // Obtenemos los proyectos traducidos cada vez que cambie el idioma
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
              className={cn("rounded-full", sort === "recent" && "bg-primary text-primary-foreground")}
              onClick={() => setSort("recent")}
            >
              {t.projects.recent}
            </Button>
            <Button
              size="sm"
              variant={sort === "alpha" ? "default" : "ghost"}
              className={cn("rounded-full", sort === "alpha" && "bg-primary text-primary-foreground")}
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
            className={cn("cursor-pointer select-none", activeTags.length === 0 && "bg-primary text-primary-foreground")}
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
                activeTags.includes(t) && "bg-primary text-primary-foreground"
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
                    variant={activeTags.includes(t) ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-2 mt-auto">
              <div className="text-xs text-muted-foreground">
                {p.github ? t.projects.openSource : t.projects.private}
              </div>
              <div className="flex gap-2">
                {p.github && (
                  <Button asChild size="sm" className="rounded-full">
                    <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>
                  </Button>
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
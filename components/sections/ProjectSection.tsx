"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  image?: string;     // /public/… (opcional)
  github?: string;
  year?: number;
};

const ALL_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "VideoClub Store",
    summary: "Proyecto para crear una página web de un Videclub",
    tech: ["Laravel", "Bootstrap", "PHP", "MySQL"],
    image: "/laravel.png",
    github: "https://github.com/g-masdeu/smart-garden",
    year: 2025,
  },
  {
    id: "p2",
    title: "Book Reviews",
    summary: "App social para que los usuarios puedan puntuar y dar reseñas a diferentes libros",
    tech: ["Laravel", "Bootstrap","PHP", "MySQL"],
    image: "/laravel.png",
    github: "https://github.com/usuario/edutrack",
    year: 2025,
  },
  {
    id: "p3",
    title: "GPX Statics",
    summary: "App para mostrar datos a partir de un archivo .gpx. Ideal para entrenadores de runners, bikers y otros deportes",
    tech: ["Flutter", "SQLite"],
    image: "/flutter.png",
    github: "https://github.com/usuario/vision-board",
    year: 2025,
  },
  {
    id: "p4",
    title: "Buscaminas",
    summary: "Juego del buscaminas desarrollado puramente en JavaScript",
    tech: ["JavaScript"],
    image: "/javascript.png",
    github: "https://github.com/usuario/vision-board",
    year: 2025,
  },
];

const allTech = Array.from(new Set(ALL_PROJECTS.flatMap(p => p.tech))).sort();

export function ProjectsSection() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"recent" | "alpha">("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ALL_PROJECTS.filter(p => {
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
  }, [query, activeTags, sort]);

  const toggleTag = (t: string) =>
    setActiveTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));

  return (
    <section className="mt-4">
      {/* Controles */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, tech…"
            className="w-64"
            aria-label="Search projects"
          />
          <div className="inline-flex rounded-full border bg-background/70 p-1">
            <Button
              size="sm"
              variant={sort === "recent" ? "default" : "ghost"}
              className={cn("rounded-full", sort === "recent" && "bg-primary text-primary-foreground")}
              onClick={() => setSort("recent")}
            >
              Recent
            </Button>
            <Button
              size="sm"
              variant={sort === "alpha" ? "default" : "ghost"}
              className={cn("rounded-full", sort === "alpha" && "bg-primary text-primary-foreground")}
              onClick={() => setSort("alpha")}
            >
              A–Z
            </Button>
          </div>
        </div>

        {/* Filtro por tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={activeTags.length === 0 ? "default" : "outline"}
            className={cn("cursor-pointer select-none", activeTags.length === 0 && "bg-primary text-primary-foreground")}
            onClick={() => setActiveTags([])}
          >
            All
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
          <Card key={p.id} className="overflow-hidden border bg-card/70 backdrop-blur transition hover:shadow-lg">
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
                {/* oscurecedor sutil para legibilidad si pones texto encima */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <div className="text-xs text-muted-foreground">{p.year ?? ""}</div>
            </CardHeader>

            <CardContent className="space-y-3">
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

            <CardFooter className="flex items-center justify-between gap-2">
              <div className="text-xs text-muted-foreground">
                {p.github ? "Open-source" : "Private"}
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

      {/* Estado vacío */}
      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border bg-background/70 p-6 text-center text-sm text-muted-foreground">
          No projects found. Try another tag or search term.
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;

"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  level: number;   // 0–100
  years?: number;  // opcional
  tags?: string[];
  category: keyof typeof CATEGORIES;
};

const CATEGORIES = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  tooling: "Tooling & DevOps",
  testing: "Testing",
  design: "Design & UX",
} as const;

const SKILLS: Skill[] = [
  // Languages
  { name: "TypeScript", level: 85, years: 3, category: "languages", tags: ["TS", "types"] },
  { name: "JavaScript", level: 90, years: 5, category: "languages", tags: ["ES202x"] },
  { name: "PHP", level: 75, years: 3, category: "languages" },
  { name: "Java", level: 70, years: 2, category: "languages" },
  { name: "HTML5", level: 95, years: 6, category: "languages" },
  { name: "CSS3", level: 88, years: 6, category: "languages", tags: ["Flex", "Grid"] },

  // Frontend
  { name: "React", level: 88, years: 4, category: "frontend", tags: ["Hooks", "Context"] },
  { name: "Next.js", level: 85, years: 3, category: "frontend", tags: ["App Router"] },
  { name: "Tailwind CSS", level: 90, years: 3, category: "frontend" },
  { name: "Zustand", level: 70, category: "frontend" },

  // Backend
  { name: "Laravel", level: 78, years: 3, category: "backend" },
  { name: "Node.js", level: 75, years: 4, category: "backend" },
  { name: "Spring Boot", level: 60, years: 1, category: "backend" },

  // Databases
  { name: "MySQL", level: 80, years: 3, category: "databases" },
  { name: "PostgreSQL", level: 65, category: "databases" },

  // Tooling & DevOps
  { name: "Git", level: 90, years: 6, category: "tooling" },
  { name: "Vite", level: 75, category: "tooling" },
  { name: "Docker", level: 60, category: "tooling" },

  // Testing
  { name: "Jest", level: 65, category: "testing" },
  { name: "React Testing Library", level: 60, category: "testing" },
  { name: "PHPUnit", level: 55, category: "testing" },

  // Design
  { name: "Figma", level: 70, category: "design" },
];

const CATEGORY_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>;

export function TechSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<keyof typeof CATEGORIES | "all">("all");
  const [sort, setSort] = useState<"level" | "alpha">("level");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SKILLS.filter(s => {
      const textMatch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.tags?.some(t => t.toLowerCase().includes(q));
      const catMatch = category === "all" || s.category === category;
      return textMatch && catMatch;
    });

    if (sort === "level") list = list.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
    if (sort === "alpha") list = list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [query, category, sort]);

  // Agrupa por categoría para render ordenado
  const byCategory = useMemo(() => {
    const map: Record<string, Skill[]> = {};
    for (const key of CATEGORY_KEYS) map[key] = [];
    for (const s of filtered) map[s.category].push(s);
    return map;
  }, [filtered]);

  return (
    <section className="mt-4">
      {/* Controles */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tech, e.g. React, Docker…"
            className="w-72"
            aria-label="Search technologies"
          />
          <div className="inline-flex rounded-full border bg-background/70 p-1">
            <Button
              size="sm"
              variant={sort === "level" ? "default" : "ghost"}
              className={cn("rounded-full", sort === "level" && "bg-primary text-primary-foreground")}
              onClick={() => setSort("level")}
            >
              By level
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

        {/* Filtro por categoría */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={category === "all" ? "default" : "outline"}
            className={cn("cursor-pointer select-none", category === "all" && "bg-primary text-primary-foreground")}
            onClick={() => setCategory("all")}
          >
            All
          </Badge>
          {CATEGORY_KEYS.map((k) => (
            <Badge
              key={k}
              variant={category === k ? "default" : "outline"}
              className={cn("cursor-pointer select-none", category === k && "bg-primary text-primary-foreground")}
              onClick={() => setCategory(k)}
            >
              {CATEGORIES[k]}
            </Badge>
          ))}
        </div>
      </div>

      {/* Leyenda pequeña */}
      <div className="mb-3 text-xs text-muted-foreground">
        Level: 0–100 (Beginner 0–40, Intermediate 40–70, Advanced 70–90, Expert 90–100)
      </div>

      {/* Render por categoría */}
      <div className="space-y-6">
        {CATEGORY_KEYS.map((k) => {
          const items = byCategory[k];
          if (!items || items.length === 0) return null;
          return (
            <Card key={k} className="border bg-card/70 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{CATEGORIES[k]}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-lg border p-3 transition hover:shadow-sm bg-background/60"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs tabular-nums text-muted-foreground">
                        {s.level}%
                      </div>
                    </div>
                    <Progress value={s.level} className="mt-2 h-2" />
                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      {s.years != null && (
                        <Badge variant="secondary" className="text-[10px]">
                          {s.years}+ yrs
                        </Badge>
                      )}
                      {s.tags?.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Estado vacío */}
      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border bg-background/70 p-6 text-center text-sm text-muted-foreground">
          No technologies found. Try another term or category.
        </div>
      )}
    </section>
  );
}

export default TechSection;

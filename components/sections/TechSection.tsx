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
  tags?: string[];
  category: keyof typeof CATEGORIES;
};

const CATEGORIES = {
  technologies: "Technologies",
  databases: "Databases",
  tooling: "Tooling & DevOps",
  testing: "Testing",
  design: "Design & UX",
} as const;

const SKILLS: Skill[] = [
  // Languages
  { name: "TypeScript", category: "technologies", tags: ["TS", "types"] },
  { name: "JavaScript", category: "technologies", tags: ["ES202x"] },
  { name: "PHP", category: "technologies", tags: ["languages", "web"] },
  { name: "Java", category: "technologies", tags:["languages", "backend"] },
  { name: "HTML5", category: "technologies",  tags:["web"]},
  { name: "CSS3", category: "technologies", tags: ["Flex", "Grid"] },
  { name: "React", category: "technologies", tags: ["Hooks", "Context"] },
  { name: "Next.js", category: "technologies", tags: ["App Router"] },
  { name: "Tailwind CSS", category: "technologies", tags:["styles"] },
  { name: "Flutter", category: "technologies", tags:["web", "windows", "mac", "mobile", "app", "frontend"] },
  { name: "Dart", category: "technologies", tags:["web", "windows", "mac", "mobile", "app", "frontend"] },
  { name: "Laravel", category: "technologies", tags:["monolithic", "frontend", "backend", "PHP"] },
  { name: "Node.js", category: "technologies", tags:["languages", "frontend", "backend", "luxury"] },
  { name: "Spring Boot", category: "technologies", tags:["web", "API", "APIREST", "backend"] },
  { name: "Bootstrap", category: "technologies", tags:["styles", "style", "shit"] },

  // Databases
  { name: "MySQL", category: "databases" }, 
  { name: "PostgreSQL", category: "databases" },
  { name: "SQLite", category: "databases" },
  { name: "MongoDB", category: "databases" },

  // Tooling & DevOps
  { name: "Git", category: "tooling" },
  { name: "Docker", category: "tooling" },

  // Testing
  { name: "Jest", category: "testing" },
  { name: "JUnit 5", category: "testing" },
  { name: "React Testing Library", category: "testing" },
  { name: "PHPUnit", category: "testing" },
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

    if (sort === "alpha") list = list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [query, category, sort]);

  const byCategory = useMemo(() => {
    const map: Record<string, Skill[]> = {};
    for (const key of CATEGORY_KEYS) map[key] = [];
    for (const s of filtered) map[s.category].push(s);
    return map;
  }, [filtered]);

  return (
    <section className="mt-4">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tech, e.g. React, Docker…"
            className="w-72 bg-white hover:shadow-amber-50 text-black"
            aria-label="Search technologies"
          />
          <div className="inline-flex rounded-full border bg-background/70 p-1">
            <Button
              size="sm"
              variant={sort === "alpha" ? "default" : "ghost"}
              className={cn(
                "rounded-full",
                sort === "alpha"
                  ? "bg-white text-black hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                  : "text-muted-foreground"
              )}

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
            className={cn("cursor-pointer select-none", category === "all" && "bg-white text-black")}
            onClick={() => setCategory("all")}
          >
            All
          </Badge>
          {CATEGORY_KEYS.map((k) => (
            <Badge
              key={k}
              variant={category === k ? "default" : "outline"}
              className={cn("cursor-pointer select-none", category === k && "bg-white text-black")}
              onClick={() => setCategory(k)}
            >
              {CATEGORIES[k]}
            </Badge>
          ))}
        </div>
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
              <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-lg border p-3 transition hover:shadow-sm bg-background/60"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-medium">{s.name}</div>
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

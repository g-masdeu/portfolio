"use client";

import { GraduationCap, BadgeCheck, BookOpen, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type EduItem = {
  id: string;
  kind: "degree" | "cert" | "course";
  title: string;
  org: string;
  location?: string;
  period: { start: string; end?: string }; // "YYYY" o "YYYY–MM"
  details?: string;
  link?: string; // plan de estudios, certificado, etc.
};

const EDUCATION: EduItem[] = [
  {
    id: "deg-1",
    kind: "degree",
    title: "BSc in Computer Science",
    org: "Universitat Rovira i Virgili",
    location: "Tarragona, ES",
    period: { start: "2019", end: "2023" },
    details: "Focus in web engineering, HCI and databases.",
  },
  {
    id: "cert-1",
    kind: "cert",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    period: { start: "2024" },
    link: "https://www.cert-url.example",
  },
  {
    id: "course-1",
    kind: "course",
    title: "Advanced React & Next.js",
    org: "Frontend Masters",
    period: { start: "2025" },
    details: "App Router, RSC, caching, accessibility and performance.",
  },
];

function kindStyles(kind: EduItem["kind"]) {
  switch (kind) {
    case "degree":
      return { icon: GraduationCap, label: "Degree", variant: "default" as const };
    case "cert":
      return { icon: BadgeCheck as LucideIcon, label: "Certification", variant: "secondary" as const };
    case "course":
      return { icon: BookOpen, label: "Course", variant: "outline" as const };
  }
}

export function EducationSection() {
  // Orden: reciente primero por año de fin (o inicio si no hay fin)
  const items = [...EDUCATION].sort((a, b) => {
    const getYear = (e: EduItem) => Number(e.period.end ?? e.period.start);
    return getYear(b) - getYear(a);
  });

  return (
    <section className="mt-4">
      <Card className="border bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">Education & Credentials</CardTitle>
            <div className="flex gap-2">
              <Button asChild size="sm" className="rounded-full">
                <a href="/cv.pdf" target="_blank" rel="noreferrer">Download CV</a>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <a href="#projects">See projects</a>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          {/* Timeline */}
          <ol className="relative ms-4 border-s">
            {items.map((e, i) => {
              const meta = kindStyles(e.kind);
              const Icon = meta.icon;
              const periodText = e.period.end
                ? `${e.period.start} — ${e.period.end}`
                : e.period.start;

              return (
                <li key={e.id} className="mb-6 ms-4">
                  {/* Punto del timeline */}
                  <span className="absolute -start-1 top-2 block size-2 rounded-full bg-primary ring-2 ring-background" />
                  {/* Cabecera */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Badge variant={meta.variant} className="inline-flex items-center gap-1">
                      <Icon className="size-3" />
                      {meta.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{periodText}</span>
                  </div>

                  {/* Título y organización */}
                  <div className="mt-1 text-base font-medium">
                    {e.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {e.org}
                    {e.location ? ` — ${e.location}` : ""}
                  </div>

                  {/* Detalles */}
                  {e.details && (
                    <p className="mt-2 text-sm text-muted-foreground">{e.details}</p>
                  )}

                  {/* Enlace opcional */}
                  {e.link && (
                    <div className="mt-2">
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm underline underline-offset-4 hover:text-accent-foreground"
                      >
                        View credential / syllabus
                      </a>
                    </div>
                  )}

                  {/* Separador entre ítems (excepto el último) */}
                  {i < items.length - 1 && <Separator className="mt-4" />}
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}

export default EducationSection;

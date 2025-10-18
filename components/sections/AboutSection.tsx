"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="mt-4">
      <Card className="overflow-hidden border bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <CardContent className="p-4 sm:p-6">
          {/* Grid de 2 columnas en desktop */}
          <div className="grid gap-6 md:grid-cols-2 items-start">

            {/* Columna izquierda: Foto + datos rápidos */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative h-60 w-40 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border shadow-lg mx-auto sm:mx-0">
                <Image
                  src="/me.png"
                  alt="Portrait of Guillem Masdeu"
                  fill
                  className="object-cover"
                  sizes="160px"
                  priority
                />
              </div>

              <div className="flex-1 rounded-xl border bg-background/60 p-3 text-sm">
                <p className="text-muted-foreground">Based in</p>
                <p className="text-base">Tarragona, Spain</p>

                <Separator className="my-2" />

                <p className="text-muted-foreground">Role</p>
                <p className="text-base">Full-stack Developer</p>

                <Separator className="my-2" />

                <p className="text-muted-foreground">Focus</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge variant="secondary">NextJS</Badge>
                  <Badge variant="secondary">Laravel</Badge>
                  <Badge variant="secondary">Flutter</Badge>
                  <Badge variant="secondary">SpringBoot</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                  <Badge variant="secondary">APIRest</Badge>
                  <Badge variant="secondary">Hexagonal</Badge>
                  <Badge variant="secondary">Microservices</Badge>
                </div>
              </div>
            </div>

            {/* Columna derecha: Bio + métricas + CTA */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 id="about-title" className="text-lg font-semibold">
                  Hi, I’m Guillem — I build clean, fast apps.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  I’m a developer focused on delivering accessible, performant interfaces and
                  maintainable backends. I enjoy translating product ideas into clear components,
                  reusable patterns, and measurable impact. Focused on hexagonal programming and 
                  microservices on suitable frameworks
                </p>
              </div>

              <ul className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <li className="rounded-lg border p-2 text-center">
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">1+ yrs</p>
                </li>
                <li className="rounded-lg border p-2 text-center">
                  <p className="text-muted-foreground">Projects</p>
                  <p className="font-medium">10+ shipped</p>
                </li>
                <li className="rounded-lg border p-2 text-center">
                  <p className="text-muted-foreground">Stack</p>
                  <p className="font-medium">React · SpringBoot · Laravel</p>
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <a href="#projects">View projects</a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href="#contact">Contact me</a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="rounded-full underline underline-offset-4"
                >
                  <a href="/cv.pdf" target="_blank" rel="noreferrer">
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default AboutSection;

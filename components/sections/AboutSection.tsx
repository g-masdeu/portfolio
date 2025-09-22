"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="mt-4"
    >
      <Card className="overflow-hidden border bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            {/* Columna izquierda: foto y datos rápidos */}
            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl ring-1 ring-border shadow-lg">
                {/* Reemplaza /me.jpg por tu imagen en /public */}
                <Image
                  src="/me.png"
                  alt="Portrait of Guillem Masdeu"
                  fill
                  className="object-cover"
                  sizes="192px"
                  priority
                />
              </div>

              <div className="w-full rounded-xl border bg-background/60 p-3">
                <p className="text-sm text-muted-foreground">Based in</p>
                <p className="text-base">Tarragona, Spain</p>

                <Separator className="my-3" />

                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-base">Full-stack Developer</p>

                <Separator className="my-3" />

                <p className="text-sm text-muted-foreground">Focus</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Laravel</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                </div>
              </div>
            </div>

            {/* Columna derecha: bio + CTAs */}
            <div className="flex flex-col">
              <h3 id="about-title" className="text-xl font-semibold">
                Hi, I’m Guillem — I build clean, fast web apps.
              </h3>

              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                I’m a developer focused on delivering accessible, performant interfaces and
                maintainable backends. I enjoy translating product ideas into clear components,
                reusable patterns, and measurable impact.
              </p>

              <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <li className="rounded-lg border p-3">
                  <p className="text-muted-foreground">Experience</p>
                  <p className="mt-1 text-base font-medium">3+ years</p>
                </li>
                <li className="rounded-lg border p-3">
                  <p className="text-muted-foreground">Projects</p>
                  <p className="mt-1 text-base font-medium">10+ shipped</p>
                </li>
                <li className="rounded-lg border p-3">
                  <p className="text-muted-foreground">Stack</p>
                  <p className="mt-1 text-base font-medium">TS · React · PHP</p>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {/* Cambia hrefs por tus enlaces reales */}
                <Button asChild className="rounded-full">
                  <a href="#projects">View projects</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <a href="#contact">Contact me</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full underline underline-offset-4"
                >
                  <a href="/cv.pdf" target="_blank" rel="noreferrer">Download CV</a>
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

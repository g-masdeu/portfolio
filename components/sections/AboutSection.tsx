"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext"; // <--- IMPORTANTE

export function AboutSection() {
  const { t } = useLanguage(); // <--- USAR HOOK

  return (
    <section aria-labelledby="about-title" className="mt-4">
      <Card className="overflow-hidden border bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* ... (Imagen igual que antes) ... */}
              <div className="relative h-60 w-40 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border shadow-lg mx-auto sm:mx-0">
                <Image src="/me.png" alt="Guillem Masdeu" fill className="object-cover" sizes="160px" priority />
              </div>

              <div className="flex-1 rounded-xl border bg-background/60 p-3 text-sm">
                <p className="text-muted-foreground">{t.about.based}</p>
                <p className="text-base">Tarragona, Spain</p>
                <Separator className="my-2" />
                <p className="text-muted-foreground">{t.about.role}</p>
                <p className="text-base">Full-stack Developer</p>
                <Separator className="my-2" />
                <p className="text-muted-foreground">{t.about.focus}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge variant="secondary">NextJS</Badge>
                  <Badge variant="secondary">Laravel</Badge>
                  <Badge variant="secondary">Flutter</Badge>
                  <Badge variant="secondary">SpringBoot</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                  <Badge variant="secondary">APIRest</Badge>
                  <Badge variant="secondary">SSR</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 id="about-title" className="text-lg font-semibold">
                  {t.about.introTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.about.introText}
                </p>
              </div>

              <ul className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <li className="rounded-lg border p-2 text-center">
                  <p className="text-muted-foreground">{t.about.exp}</p>
                  <p className="font-medium">{t.about.years}</p>
                </li>
                <li className="rounded-lg border p-2 text-center">
                  <p className="text-muted-foreground">{t.about.projects}</p>
                  <p className="font-medium">{t.about.shipped}</p>
                </li>
                <li className="rounded-lg border p-2 text-center">
                  <p className="text-muted-foreground">{t.about.stack}</p>
                  <p className="font-medium">NextJS · SpringBoot · Laravel</p>
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <a href="#projects">{t.about.ctaProject}</a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href="#contact">{t.about.ctaContact}</a>
                </Button>
                <Button asChild size="sm" variant="ghost" className="rounded-full underline underline-offset-4">
                  <a href="/cv.pdf" target="_blank" rel="noreferrer">{t.about.ctaCV}</a>
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
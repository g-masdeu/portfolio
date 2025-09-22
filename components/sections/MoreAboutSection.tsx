"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Gamepad2,
  Film,
  Music2,
  BookOpen,
  Dumbbell,
  Coffee,
  Globe2,
  Sparkles,
  Smile,
} from "lucide-react";

export function MoreAboutSection() {
  return (
    <section className="mt-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Intereses principales */}
        <Card className="border bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="size-4" />
              Interests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Gamepad2 className="size-3" /> Strategy games
              </Badge>
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Film className="size-3" /> Cinema
              </Badge>
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Music2 className="size-3" /> Soundtracks
              </Badge>
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <BookOpen className="size-3" /> Tech & design
              </Badge>
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Dumbbell className="size-3" /> Training
              </Badge>
              <Badge variant="secondary" className="inline-flex items-center gap-1">
                <Coffee className="size-3" /> Specialty coffee
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Soft skills */}
        <Card className="border bg-card/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Smile className="size-4" />
              Soft skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                Communication <Badge variant="outline">Clear & concise</Badge>
              </li>
              <li className="flex items-center justify-between">
                Ownership <Badge variant="outline">End-to-end</Badge>
              </li>
              <li className="flex items-center justify-between">
                Collaboration <Badge variant="outline">Design ↔ Dev</Badge>
              </li>
              <li className="flex items-center justify-between">
                Problem solving <Badge variant="outline">Data-driven</Badge>
              </li>
            </ul>
            <Separator />
            <p className="text-xs text-muted-foreground">
              I like writing small docs/PRDs before building to align scope and UX early.
            </p>
          </CardContent>
        </Card>

        {/* Idiomas y disponibilidad */}
        <Card className="border bg-card/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe2 className="size-4" />
              Languages & availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                🇪🇸 Spanish <Badge variant="outline">Native</Badge>
              </li>
              <li className="flex items-center justify-between">
                🇬🇧 English <Badge variant="outline">B2–C1</Badge>
              </li>
              <li className="flex items-center justify-between">
                🇫🇷 French <Badge variant="outline">A2</Badge>
              </li>
            </ul>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Remote-friendly</Badge>
              <Badge variant="secondary">CET (EU)</Badge>
              <Badge variant="secondary">Async comms</Badge>
            </div>
            <div className="pt-1">
              <Button asChild size="sm" className="rounded-full">
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fun facts / extras */}
      <Card className="mt-4 border bg-card/70 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Fun facts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Fact>Keyboard nerd: custom switches & layouts.</Fact>
          <Fact>Cinema nerd: I log films and soundtracks.</Fact>
          <Fact>Build-first: I prototype UI before long docs.</Fact>
          <Fact>Tests: I like visual regression + unit mix.</Fact>
          <Fact>Performance: Core Web Vitals watcher.</Fact>
          <Fact>Design tokens: OKLCH enjoyer.</Fact>
        </CardContent>
      </Card>
    </section>
  );
}

/* Subcomponente simple para hechos */
function Fact({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-background/60 p-3 text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export default MoreAboutSection;

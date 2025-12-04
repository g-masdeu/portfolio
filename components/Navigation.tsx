"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext"; // <--- Importamos

export default function Navigation() {
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav.about, href: "#about-me" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.tech, href: "#technologies" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="flex justify-center p-4 bg-background/80 backdrop-blur-md border-b">
      <ul className="flex gap-4 md:gap-8 overflow-x-auto">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                "text-muted-foreground hover:text-foreground block whitespace-nowrap"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
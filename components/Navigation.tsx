"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const ITEMS = [
  { href: "#about-me", label: "About me" },
  { href: "#technologies", label: "Technologies" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#more-about-me", label: "More about me" },
  { href: "#contact", label: "Contact" },
];

function Navigation() {
  return (
    <nav aria-label="Primary" className="w-full">
      <NavigationMenu
        viewport={false}
        className="sticky top-4 z-50 mx-auto mt-6 rounded-full border bg-background/70 backdrop-blur px-2 shadow-lg supports-[backdrop-filter]:backdrop-blur"
      >
        <NavigationMenuList className="gap-1">
          {ITEMS.map((it) => (
            <NavigationMenuItem key={it.href}>
              <NavigationMenuLink asChild>
                <a
                  href={it.href}
                  className={navigationMenuTriggerStyle({
                    className:
                      "rounded-full hover:shadow-sm transition-all text-foreground hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
                  })}
                >
                  {it.label}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default Navigation;

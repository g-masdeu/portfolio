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
  { href: "#projects", label: "Projects" },
  { href: "#technologies", label: "Technologies" },
  { href: "#contact", label: "Contact" },
];

function Navigation() {
  return (
    <nav aria-label="Primary" className="w-full">
      <NavigationMenu
        viewport={false}
        className="sticky top-0 z-50 mx-auto px-2 rounded-full"
      >
        <NavigationMenuList className="gap-1">
          {ITEMS.map((it) => (
            <NavigationMenuItem key={it.href}>
              <NavigationMenuLink asChild>
                <a
                  href={it.href}
                  className={navigationMenuTriggerStyle({
                    className:
                      "rounded-full text-foreground hover:text-accent-foreground hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
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

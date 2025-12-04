"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    // CLAVE: 'fixed' y 'animate-delayed-reveal' en el MISMO elemento.
    // Al terminar la animación, el CSS global hace 'transform: none', 
    // permitiendo que 'fixed' vuelva a funcionar con respecto a la ventana.
    <div className="fixed top-4 right-4 z-[100] animate-delayed-reveal">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleLanguage}
        // Incluimos tu efecto de grayscale + hover color
        className="rounded-full bg-background/80 backdrop-blur shadow-md hover:scale-105 border-2 grayscale hover:grayscale-0 transition-all duration-300"
        title={language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
      >
        {language === "en" ? (
          // Bandera UK
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="30" height="15">
            <clipPath id="s">
              <path d="M0,0 v30 h60 v-30 z"/>
            </clipPath>
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
            </clipPath>
            <g clipPath="url(#s)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
            </g>
          </svg>
        ) : (
          // Bandera España
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="30" height="20">
             <path fill="#AA151B" d="M0 0h750v500H0z"/>
             <path fill="#F1BF00" d="M0 125h750v250H0z"/>
          </svg>
        )}
      </Button>
    </div>
  );
}
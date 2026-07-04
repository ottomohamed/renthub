import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "wouter";

const ANNOUNCEMENTS = [
  {
    id: 1,
    text: "🔥 ¡Oferta de Verano! 50% de descuento en el primer alquiler",
    link: "/#",
    color: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/50"
  },
  {
    id: 2,
    text: "⭐ Hazte Premium y destaca tus anuncios en primera página",
    link: "/premium",
    color: "bg-gradient-to-r from-primary/20 to-blue-500/20",
    borderColor: "border-primary/50"
  },
  {
    id: 3,
    text: "🚀 Nuevos tractores y maquinaria pesada disponibles en Madrid",
    link: "/#",
    color: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/50"
  }
];

export function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="w-full bg-background border-b border-border overflow-hidden">
      <Link href={current.link}>
        <a className="block w-full">
          <div 
            className={`w-full transition-all duration-500 ease-in-out px-4 py-3 ${current.color} border-l-4 ${current.borderColor}`}
            key={current.id}
          >
            <div className="container mx-auto flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <p className="text-white font-medium text-sm md:text-base animate-in fade-in zoom-in duration-300">
                {current.text}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

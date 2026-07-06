import { useState, useEffect } from 'react';
import { Sparkles, Info } from "lucide-react";
import { Link } from "wouter";

const ANNOUNCEMENTS = [
  {
    id: 1,
    text: "🔥 ¡Oferta de Verano! 50% de descuento en el primer alquiler",
    link: "/#",
    color: "bg-[#10192B]",
    textColor: "text-white"
  },
  {
    id: 2,
    text: "⭐ Hazte Premium y destaca tus anuncios en primera página",
    link: "/premium",
    color: "bg-[#E85A2A]",
    textColor: "text-black"
  },
  {
    id: 3,
    text: "🚀 Nuevos tractores y maquinaria pesada disponibles en Madrid",
    link: "/#",
    color: "bg-[#37475a]",
    textColor: "text-white"
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
    <div className="w-full overflow-hidden">
      <Link href={current.link}>
        <a className="block w-full">
          <div 
            className={`w-full transition-all duration-500 ease-in-out px-4 py-2 ${current.color}`}
            key={current.id}
          >
            <div className="container mx-auto flex items-center justify-center gap-2">
              {current.id === 2 ? (
                <Sparkles className={`w-4 h-4 ${current.textColor} animate-pulse`} />
              ) : (
                <Info className={`w-4 h-4 ${current.textColor}`} />
              )}
              <p className={`${current.textColor} font-medium text-sm md:text-sm animate-in fade-in duration-300`}>
                {current.text}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

import { Info } from "lucide-react";

export function AdSensePlaceholder({ width = "100%", height = "250px", className = "" }: { width?: string, height?: string, className?: string }) {
  return (
    <div 
      className={`bg-gray-100 border border-gray-300 flex flex-col items-center justify-center text-gray-400 relative overflow-hidden ${className}`}
      style={{ width, height, minHeight: height }}
    >
      <div className="absolute top-0 right-0 bg-white border-b border-l border-gray-300 px-1 text-[10px] flex items-center gap-1 z-10">
        <Info className="w-3 h-3" />
        Anuncios Google
      </div>
      <div className="text-center px-4">
        <p className="font-bold text-gray-500 mb-1">Espacio publicitario</p>
        <p className="text-xs">Reservado para Google AdSense</p>
      </div>
    </div>
  );
}

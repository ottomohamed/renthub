import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AmazonReviews({ rating, totalReviews }: { rating: number, totalReviews: number }) {
  // Mock review distribution based on average rating
  // Amazon style: 5 stars (highest %), 4 stars, 3, 2, 1
  const getDistribution = (avg: number) => {
    if (avg >= 4.8) return [85, 10, 3, 1, 1];
    if (avg >= 4.5) return [75, 15, 6, 2, 2];
    if (avg >= 4.0) return [60, 20, 10, 5, 5];
    return [40, 25, 15, 10, 10]; // Default fallback
  };

  const dist = getDistribution(rating);

  return (
    <div className="border-t border-gray-200 mt-8 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Review Summary */}
        <div className="md:col-span-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Opiniones de clientes</h2>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex text-[#FBBF24]">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < Math.floor(rating) 
                      ? 'fill-current' 
                      : i < rating 
                        ? 'fill-current opacity-50' // Half star simulation
                        : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-lg font-medium">{rating} de 5</span>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">{totalReviews} valoraciones globales</p>
          
          {/* Progress Bars */}
          <div className="space-y-3">
            {dist.map((percent, index) => {
              const stars = 5 - index;
              return (
                <div key={stars} className="flex items-center gap-4 group">
                  <a href="#" className="text-sm text-[#2563EB] hover:text-[#EA580C] hover:underline w-16 whitespace-nowrap">
                    {stars} estrellas
                  </a>
                  <div className="flex-1 h-4 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden cursor-pointer">
                    <div 
                      className="h-full bg-[#FBBF24] rounded-l-sm" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <a href="#" className="text-sm text-[#2563EB] hover:text-[#EA580C] hover:underline w-10 text-right">
                    {percent}%
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-2">Evaluar este producto</h3>
            <p className="text-sm text-gray-600 mb-4">Comparte tu opinión con otros clientes</p>
            <button className="w-full bg-white border border-gray-300 rounded-full py-1.5 px-4 text-sm font-medium hover:bg-gray-50 shadow-sm text-gray-800">
              Escribir una opinión
            </button>
          </div>
        </div>

        {/* Right Side: Review List (Mock Data) */}
        <div className="md:col-span-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Reseñas destacadas de España</h3>
          
          <div className="space-y-8">
            {/* Review 1 */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                  C
                </div>
                <span className="text-sm text-gray-900 font-medium">Constructora Martínez</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-sm font-bold text-gray-900">Excelente maquinaria, muy buen estado</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Revisado en España el 12 de septiembre de 2025</p>
              <div className="text-xs text-[#EA580C] font-bold mb-2">Alquiler Verificado</div>
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                Alquilamos este equipo para una obra en el centro de la ciudad y el rendimiento fue excepcional. El propietario lo entregó puntual, con el depósito lleno y completamente limpio. La comunicación fue muy fluida. Sin duda volveremos a trabajar con ellos para futuros proyectos.
              </p>
              <div className="flex items-center gap-3">
                <button className="border border-gray-300 rounded px-4 py-1 text-xs hover:bg-gray-50 text-gray-800 shadow-sm">
                  Útil
                </button>
                <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-900">
                  Informar de un abuso
                </span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                  R
                </div>
                <span className="text-sm text-gray-900 font-medium">Reformas Integrales Ruiz</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-[#FBBF24]">
                  {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
                <span className="text-sm font-bold text-gray-900">Cumple su función perfectamente</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Revisado en España el 3 de agosto de 2025</p>
              <div className="text-xs text-[#EA580C] font-bold mb-2">Alquiler Verificado</div>
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                El equipo funciona tal como se describe. Tuvo un pequeño problema con una de las luces pero nada que impidiera el trabajo. El precio es competitivo y el servicio al cliente del propietario fue rápido a la hora de responder mis dudas técnicas. Recomendado.
              </p>
              <div className="text-xs text-gray-500 mb-2">A 5 personas les ha parecido esto útil</div>
              <div className="flex items-center gap-3">
                <button className="border border-gray-300 rounded px-4 py-1 text-xs hover:bg-gray-50 text-gray-800 shadow-sm">
                  Útil
                </button>
                <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-900">
                  Informar de un abuso
                </span>
              </div>
            </div>
            
            <a href="#" className="text-sm font-bold text-[#2563EB] hover:text-[#EA580C] hover:underline flex items-center">
              Ver todas las valoraciones <span className="ml-1">›</span>
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { Star } from "lucide-react";
import { type Item } from "@/lib/mock-db";

export function SponsoredCarousel({ items, title = "Productos patrocinados relacionados con este artículo" }: { items: Item[], title?: string }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 pt-4 border-t border-gray-200 w-full max-w-[1400px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#c45500] font-sans">{title}</h2>
        <span className="text-xs text-gray-500 cursor-pointer hover:underline">Comentarios sobre los anuncios</span>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
        {items.map(item => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <a className="min-w-[160px] md:min-w-[200px] max-w-[200px] flex flex-col group snap-start">
              <div className="bg-gray-50 h-[200px] mb-2 p-2 flex items-center justify-center rounded-sm">
                <img 
                  src={item.images[0]} 
                  alt={item.titleEs} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" 
                />
              </div>
              <h3 className="text-[#007185] group-hover:text-[#c45500] group-hover:underline text-sm font-medium line-clamp-2 mb-1">
                {item.titleEs}
              </h3>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex text-[#ffa41c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-xs text-[#007185]">{item.totalReviews}</span>
              </div>
              <div className="text-lg font-medium text-[#B12704]">
                {item.pricePerDay}€ <span className="text-xs text-gray-500 font-normal">/día</span>
              </div>
              {item.isPromoted && (
                <span className="text-[10px] text-gray-500 mt-1">Patrocinado</span>
              )}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

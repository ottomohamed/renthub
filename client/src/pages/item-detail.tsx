import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { getItemById, getUserById, type Item, type User } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Phone, ArrowLeft, MapPin, Calendar, Truck, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function ItemDetail() {
  const [, params] = useRoute("/item/:id");
  const [item, setItem] = useState<Item | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const foundItem = getItemById(params.id);
      setItem(foundItem || null);
      
      if (foundItem) {
        const foundOwner = getUserById(foundItem.ownerId);
        setOwner(foundOwner || null);
      }
    }
    setLoading(false);
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        <h1 className="text-2xl font-bold animate-pulse">Cargando...</h1>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">Error: Producto no encontrado o inactivo.</h1>
        <Link href="/">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      {/* Amazon-style header */}
      <header className="bg-[#131921] text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/">
            <a className="text-xl font-bold text-white hover:text-[#f3a847] transition-colors flex items-center gap-1">
              <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
              <span className="tracking-tight">RentHub</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/"><a className="hover:underline hover:text-[#007185]">Inicio</a></Link> › 
          <span className="mx-1">Alquiler de Maquinaria</span> › 
          <span className="mx-1 capitalize">{item.category}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white p-6 rounded-lg border border-gray-200">
          {/* Left Column - Images */}
          <div className="md:col-span-5">
            <div className="sticky top-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-gray-200 bg-gray-100 flex items-center justify-center mb-4">
                <img 
                  src={item.images[0]} 
                  alt={item.titleEs} 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex gap-2">
                <div className="w-16 h-16 border-2 border-[#f3a847] rounded cursor-pointer p-1">
                  <img src={item.images[0]} className="w-full h-full object-cover" alt="Thumbnail" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div className="md:col-span-4 space-y-4">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
              {item.titleEs}
            </h1>
            
            <div className="flex items-center gap-4 text-sm border-b border-gray-200 pb-4">
              <div className="flex items-center gap-1">
                <div className="flex text-[#ffa41c]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">
                  {item.totalReviews} valoraciones
                </span>
              </div>
            </div>

            <div className="py-2">
              <div className="flex items-baseline gap-1 text-gray-900">
                <span className="text-sm font-medium">Precio alquiler:</span>
                <span className="text-xl align-top">€</span>
                <span className="text-3xl font-medium">{item.pricePerDay}</span>
                <span className="text-sm text-gray-500">/día</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700 mt-4">
              <div className="flex items-start gap-2">
                <Truck className="w-5 h-5 text-gray-600 shrink-0" />
                <div>
                  <span className="font-bold">Entrega disponible</span> en {item.city} y alrededores.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-600 shrink-0" />
                <div>
                  <span className="font-bold">Garantía RentHub</span> cubre hasta 50.000€ en daños.
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-gray-900 mb-2">Acerca de este equipo</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {item.specifications && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-2">Especificaciones</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b border-gray-100 pb-1">
                      <span className="text-gray-600 uppercase font-medium w-1/3">{key}</span>
                      <span className="text-gray-900 w-2/3">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Buy Box */}
          <div className="md:col-span-3">
            <Card className="border border-gray-300 rounded-lg shadow-sm">
              <div className="p-4 space-y-4">
                <div className="flex items-baseline gap-1 text-gray-900">
                  <span className="text-xl align-top">€</span>
                  <span className="text-3xl font-medium">{item.pricePerDay}</span>
                  <span className="text-sm text-gray-500">/día</span>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-[#007185] mb-2 hover:underline cursor-pointer">
                    <MapPin className="w-4 h-4" />
                    <span>Enviar a {item.city}</span>
                  </div>
                  
                  {item.available ? (
                    <h4 className="text-lg text-[#007600] font-medium">Disponible</h4>
                  ) : (
                    <h4 className="text-lg text-[#B12704] font-medium">No Disponible</h4>
                  )}
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Propietario:</span>
                    <span className="text-[#007185] hover:underline cursor-pointer truncate max-w-[120px] text-right">
                      {owner ? owner.nameEs : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ubicación:</span>
                    <span>{item.city}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <Button className="w-full rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] shadow-sm">
                    Añadir a la cesta
                  </Button>
                  <Button 
                    className="w-full rounded-full bg-[#ffa41c] hover:bg-[#fa8900] text-black border border-[#ff8f00] shadow-sm flex items-center justify-center gap-2"
                    onClick={() => window.location.href = `tel:${owner?.phoneNumber}`}
                  >
                    <Phone className="w-4 h-4" />
                    Contactar Propietario
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

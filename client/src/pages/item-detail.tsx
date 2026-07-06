import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { getItemById, getUserById, reloadFromStorage, getAllItems, type Item, type User } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Phone, ArrowLeft, MapPin, Calendar, Truck, ShieldCheck, Check, MessageCircle, Mail } from "lucide-react";
import { Link } from "wouter";
import { AmazonReviews } from "@/components/AmazonReviews";
import { SponsoredCarousel } from "@/components/SponsoredCarousel";

export default function ItemDetail() {
  const [, params] = useRoute("/item/:id");
  const [item, setItem] = useState<Item | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (params?.id) {
      reloadFromStorage();
      const foundItem = getItemById(params.id);
      setItem(foundItem || null);
      
      if (foundItem) {
        const foundOwner = getUserById(foundItem.ownerId);
        setOwner(foundOwner || null);
      }
      setActiveImage(0);
    }
    setLoading(false);
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#f3a847]">
        <h1 className="text-2xl font-bold animate-pulse">Cargando detalles...</h1>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-[#B12704]">No se encontró el artículo solicitado.</h1>
        <Link href="/">
          <Button variant="outline" className="bg-white"><ArrowLeft className="mr-2 h-4 w-4"/> Volver a la tienda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-12 font-sans">
      {/* Amazon-style header */}
      <header className="bg-[#131921] text-white p-3">
        <div className="container mx-auto flex items-center">
          <Link href="/">
            <a className="text-xl font-bold text-white hover:text-[#f3a847] transition-colors flex items-center gap-1 border border-transparent hover:border-white p-1 rounded-sm">
              <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
              <span className="tracking-tight">RentHub</span>
            </a>
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto p-2 max-w-[1400px]">
          <div className="text-xs text-gray-500">
            <Link href="/"><a className="hover:underline hover:text-[#007185]">Inicio</a></Link> › 
            <span className="mx-1">Maquinaria Pesada</span> › 
            <span className="mx-1 capitalize">{item.category}</span> › 
            <span className="mx-1 text-gray-400">{item.titleEs}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Image Gallery (Amazon Style) */}
          <div className="md:col-span-5 flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-12 shrink-0">
              {item.images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`w-12 h-12 border rounded cursor-pointer p-1 overflow-hidden transition-all
                    ${activeImage === idx ? 'border-[#e77600] shadow-[0_0_3px_rgba(231,118,0,0.5)]' : 'border-gray-300 hover:border-[#e77600]'}`}
                  onMouseEnter={() => setActiveImage(idx)}
                >
                  <img src={img} className="w-full h-full object-cover mix-blend-multiply" alt={`Vista ${idx+1}`} />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="aspect-[4/3] w-full overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={item.images[activeImage]} 
                  alt={item.titleEs} 
                  className="max-w-full max-h-full object-contain cursor-zoom-in mix-blend-multiply transition-opacity duration-300"
                />
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                Pasa el ratón por encima de la imagen para ampliarla
              </div>
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div className="md:col-span-4 space-y-4">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
              {item.titleEs}
            </h1>
            
            <div className="flex items-center gap-4 text-sm border-b border-gray-200 pb-2">
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

            {/* Price block in middle column */}
            <div className="py-2 border-b border-gray-200 pb-4">
              <div className="flex items-start gap-1 text-gray-900">
                <span className="text-sm font-medium mt-1">Precio:</span>
                <span className="text-[#B12704] flex items-start">
                  <span className="text-lg align-top font-medium mt-1">€</span>
                  <span className="text-4xl font-medium">{item.pricePerDay}</span>
                </span>
                <span className="text-sm text-gray-500 mt-auto mb-1">/ día</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Todos los impuestos incluidos.</div>
            </div>

            {/* Bullet points features */}
            {item.features && item.features.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold text-gray-900 mb-2">Características principales:</h3>
                <ul className="space-y-1.5 pl-4 list-disc text-sm text-gray-800">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="pl-1 leading-snug">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 text-sm text-gray-700 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <Truck className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <span className="font-bold">Entrega y recogida disponible</span>
                  <p className="text-gray-500">Servicio de transporte mediante góndola a {item.city} y radio de 50km.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <span className="font-bold">Protección RentHub Garantizada</span>
                  <p className="text-gray-500">Alquiler asegurado contra daños accidentales y robo hasta 50.000€.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Buy Box */}
          <div className="md:col-span-3">
            <Card className="border border-gray-300 rounded-lg shadow-sm">
              <div className="p-4 space-y-4">
                
                {/* Price */}
                <div className="flex items-start gap-1 text-[#B12704]">
                  <span className="text-xl align-top font-medium mt-1">€</span>
                  <span className="text-3xl font-medium">{item.pricePerDay}</span>
                  <span className="text-sm text-gray-500 mt-auto mb-1 ml-1">/ día</span>
                </div>
                
                {/* Delivery Info */}
                <div className="text-sm">
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                    <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer leading-tight">
                      Enviar a {item.city} y alrededores
                    </span>
                  </div>
                  
                  {item.available ? (
                    <h4 className="text-lg text-[#007600] font-medium leading-tight mb-2">Disponible.</h4>
                  ) : (
                    <h4 className="text-lg text-[#B12704] font-medium leading-tight mb-2">No Disponible Temporalmente.</h4>
                  )}
                </div>

                {/* Seller Info */}
                <div className="text-sm space-y-2 py-3 border-y border-gray-200">
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-gray-500 text-xs">Vendido por</span>
                    <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer truncate text-sm">
                      {owner ? owner.nameEs : 'N/A'}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-gray-500 text-xs">Gestión por</span>
                    <span className="text-sm">RentHub Segura</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-gray-500 text-xs">Ubicación</span>
                    <span className="text-sm">{item.city}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] shadow-sm font-normal py-5">
                    Añadir a la cesta
                  </Button>
                  <Button className="w-full rounded-full bg-[#ffa41c] hover:bg-[#fa8900] text-black border border-[#ff8f00] shadow-sm font-normal py-5">
                    Alquilar ya
                  </Button>
                  
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Contactar con el propietario:</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="flex-1 rounded bg-white hover:bg-gray-50 text-gray-800 border-gray-300 h-9"
                        onClick={() => window.location.href = `tel:${owner?.phoneNumber}`}
                        title="Llamar por teléfono"
                      >
                        <Phone className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 rounded bg-white hover:bg-gray-50 text-gray-800 border-gray-300 h-9"
                        onClick={() => {
                          const msg = `Hola, estoy interesado en el anuncio: ${item.titleEs}`;
                          window.open(`https://wa.me/${owner?.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        title="Enviar WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 rounded bg-white hover:bg-gray-50 text-gray-800 border-gray-300 h-9"
                        onClick={() => window.location.href = `mailto:${owner?.email}?subject=Interés en: ${item.titleEs}`}
                        title="Enviar Correo"
                      >
                        <Mail className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Product Info Section below the fold */}
        <div className="mt-12 border-t border-gray-200 pt-8 max-w-5xl">
          
          {item.specifications && (
            <div className="mb-8">
              <h2 className="text-[#c45500] text-xl font-bold mb-4 font-sans">Especificaciones técnicas</h2>
              <div className="bg-white border border-gray-200 rounded overflow-hidden max-w-2xl">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(item.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-4 font-medium text-gray-700 w-1/3 border-r border-gray-100">{key}</td>
                        <td className="py-2 px-4 text-gray-900">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-[#c45500] text-xl font-bold mb-4 font-sans">Descripción del equipo</h2>
            <div className="text-base text-gray-800 leading-relaxed whitespace-pre-line max-w-4xl">
              {item.description}
            </div>
          </div>

          <SponsoredCarousel 
            items={getAllItems().filter(i => i.isPromoted && i.id !== item.id).slice(0, 8)} 
          />

          <AmazonReviews rating={item.rating} totalReviews={item.totalReviews} />
        </div>
      </div>
    </div>
  );
}

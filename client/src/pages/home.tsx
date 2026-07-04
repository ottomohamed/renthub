import { useState, useEffect } from "react";
import { searchItems, type Item } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Search, Menu, ShoppingCart, Info } from "lucide-react";
import { Link, useLocation } from "wouter";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [, setLocation] = useLocation();

  // Initial load and search effect
  useEffect(() => {
    const results = searchItems(query, city);
    // Filter to show mostly heavy machinery and sort sponsored first
    const sorted = [...results].sort((a, b) => {
      if (a.isPromoted && !b.isPromoted) return -1;
      if (!a.isPromoted && b.isPromoted) return 1;
      return 0;
    });
    setItems(sorted);
  }, [query, city]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <AnnouncementBanner />
      
      {/* Amazon-style Header */}
      <header className="bg-[#131921] text-white sticky top-0 z-20">
        <div className="container mx-auto px-2 py-2 flex items-center justify-between gap-2 flex-wrap md:flex-nowrap">
          {/* Logo & Location */}
          <div className="flex items-center gap-4 min-w-max">
            <Menu className="w-6 h-6 md:hidden ml-2" />
            <Link href="/">
              <a className="text-xl md:text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-1 border border-transparent hover:border-white p-1 rounded-sm">
                <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
                <span className="tracking-tight">RentHub</span>
              </a>
            </Link>
            
            <div className="hidden md:flex flex-col border border-transparent hover:border-white p-1 px-2 rounded-sm cursor-pointer">
              <span className="text-xs text-gray-300">Enviar a</span>
              <span className="text-sm font-bold flex items-center gap-1">
                <MapPin className="w-4 h-4" /> España
              </span>
            </div>
          </div>
          
          {/* Search Bar - Amazon Style (Center) */}
          <div className="flex-1 max-w-4xl flex order-last md:order-none w-full mt-2 md:mt-0 px-2 md:px-0">
            <select 
              className="bg-gray-100 text-black border-none rounded-l-md px-2 py-2 outline-none text-xs border-r border-gray-300 w-auto md:w-32 hidden md:block hover:bg-gray-200 cursor-pointer"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              data-testid="select-city"
            >
              <option value="">Todas las ciudades</option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Valencia">Valencia</option>
              <option value="Sevilla">Sevilla</option>
            </select>
            <div className="relative flex-1">
              <Input 
                placeholder="Buscar maquinaria pesada, excavadoras, tractores..." 
                className="w-full bg-white text-black border-none md:rounded-none rounded-l-md focus-visible:ring-2 focus-visible:ring-[#f3a847] h-10 px-4 text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <Button className="bg-[#febd69] hover:bg-[#f3a847] text-black border-none rounded-none rounded-r-md h-10 px-5">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2 min-w-max">
            <Link href="/admin">
              <a className="text-sm font-bold text-white hover:text-[#f3a847] hidden md:block border border-transparent hover:border-white p-2 rounded-sm">
                Panel Admin
              </a>
            </Link>
            
            <div className="flex flex-col text-sm border border-transparent hover:border-white p-2 rounded-sm cursor-pointer hidden lg:flex">
              <span className="text-xs text-gray-300">Hola, Identifícate</span>
              <span className="font-bold flex items-center text-sm leading-tight">Cuentas y Listas</span>
            </div>

            <div className="flex flex-col text-sm border border-transparent hover:border-white p-2 rounded-sm cursor-pointer hidden lg:flex">
              <span className="text-xs text-gray-300">Devoluciones</span>
              <span className="font-bold flex items-center text-sm leading-tight">y Pedidos</span>
            </div>
            
            <Link href="/premium">
              <Button className="bg-[#f3a847] text-black hover:bg-[#febd69] font-bold hidden sm:flex h-9 shadow-[0_0_5px_rgba(243,168,71,0.3)] ml-2">
                Destacar Anuncio
              </Button>
            </Link>
            
            <div className="flex items-end border border-transparent hover:border-white p-2 rounded-sm cursor-pointer relative ml-2">
              <ShoppingCart className="h-8 w-8" />
              <span className="absolute top-0 right-2 md:right-4 text-[#f3a847] font-bold text-lg leading-none">0</span>
              <span className="font-bold text-sm hidden md:block mt-auto">Cesta</span>
            </div>
          </div>
        </div>
        
        {/* Amazon Sub-nav */}
        <div className="bg-[#232f3e] px-4 py-2 text-sm flex gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <a href="#" className="flex items-center gap-1 font-bold hover:text-white border border-transparent hover:border-white px-2 rounded-sm"><Menu className="w-4 h-4"/> Todo</a>
          <a href="#" className="hover:text-white border border-transparent hover:border-white px-2 rounded-sm">Maquinaria Pesada</a>
          <a href="#" className="hover:text-white border border-transparent hover:border-white px-2 rounded-sm">Tractores</a>
          <a href="#" className="hover:text-white border border-transparent hover:border-white px-2 rounded-sm">Excavadoras</a>
          <a href="#" className="hover:text-white border border-transparent hover:border-white px-2 rounded-sm">Herramientas Profesionales</a>
          <a href="#" className="hover:text-white border border-transparent hover:border-white px-2 rounded-sm">Vehículos Industriales</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 bg-gray-50 dark:bg-background min-h-[calc(100vh-200px)]">
        <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
          <h2 className="text-xl font-bold text-gray-900">
            Resultados para "Maquinaria Pesada y Vehículos"
          </h2>
          <span className="text-sm text-gray-500 whitespace-nowrap">{items.length} resultados</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500">Prueba a buscar con otras palabras o cambiar de ciudad.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-6xl">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="bg-white border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors group cursor-pointer flex flex-col sm:flex-row rounded-xl w-full"
                onClick={() => setLocation(`/item/${item.id}`)}
                data-testid={`card-item-${item.id}`}
              >
                {/* Image Section - Large side image like Amazon list view */}
                <div className="relative w-full sm:w-1/3 md:w-1/4 xl:w-1/5 min-h-[200px] bg-gray-100 flex items-center justify-center p-4 shrink-0">
                  <img 
                    src={item.images[0]} 
                    alt={item.titleEs} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Sponsored badge if applicable */}
                  {item.isPromoted && (
                    <div className="mb-2 flex items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">Patrocinado</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                  )}

                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg md:text-xl font-medium line-clamp-2 leading-tight text-[#007185] group-hover:text-[#c45500] group-hover:underline transition-colors">
                      {item.titleEs}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0 flex-1">
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-[#ffa41c]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-[#007185] group-hover:text-[#c45500] group-hover:underline text-sm ml-1">
                        {item.totalReviews}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm align-top">€</span>
                      <span className="text-3xl font-medium text-gray-900">{item.pricePerDay}</span>
                      <span className="text-sm text-gray-500">/día</span>
                    </div>
                    
                    {item.available && (
                      <div className="text-xs md:text-sm text-[#007600] font-bold mt-2">
                        Entrega Disponible
                      </div>
                    )}
                    
                    <div className="text-xs md:text-sm text-gray-700 mt-2 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Ubicación: <span className="font-medium">{item.city}</span>
                    </div>
                    
                    {item.specifications && (
                      <div className="mt-3 flex gap-4 text-xs text-gray-600">
                        {Object.entries(item.specifications).slice(0, 2).map(([k, v]) => (
                          <span key={k}><b>{k}:</b> {v}</span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-[#232f3e] text-white pt-10 pb-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 max-w-5xl mx-auto">
            <div>
              <h4 className="font-bold mb-4">Conócenos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">Trabajar en RentHub</a></li>
                <li><a href="#" className="hover:underline">Sobre RentHub</a></li>
                <li><a href="#" className="hover:underline">Sostenibilidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Gana dinero con nosotros</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">Alquilar en RentHub</a></li>
                <li><a href="#" className="hover:underline">Anuncia tus productos</a></li>
                <li><a href="/premium" className="hover:underline text-[#f3a847]">Programa Premium</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Podemos ayudarte</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">RentHub y COVID-19</a></li>
                <li><a href="#" className="hover:underline">Localizar un pedido</a></li>
                <li><a href="#" className="hover:underline">Tarifas y políticas</a></li>
                <li><a href="#" className="hover:underline">Ayuda</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
              <span className="text-xl font-bold">RentHub</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-400">
              <a href="#" className="hover:underline">Condiciones de Uso</a>
              <a href="#" className="hover:underline">Aviso de Privacidad</a>
              <a href="#" className="hover:underline">Aviso sobre Cookies</a>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              © 2025 RentHub 2030. Un clon conceptual para demostración.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

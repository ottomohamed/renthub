import { useState, useEffect, Fragment } from "react";
import { searchItems, reloadFromStorage, type Item } from "@/lib/mock-db";
import { SPANISH_REGIONS, CATEGORIES, MAJOR_CITIES } from "@/lib/spain-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Search, Menu, ShoppingCart, Info, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { SponsoredCarousel } from "@/components/SponsoredCarousel";
import { AdSensePlaceholder } from "@/components/AdSensePlaceholder";

export default function Home() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [, setLocation] = useLocation();

// Initial load and search effect
  useEffect(() => {
    let cancelled = false;

    async function loadItems() {
      reloadFromStorage();
      const mockResults = searchItems(query, city);

      let realResults: Item[] = [];
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (city) params.set("city", city);
        if (category) params.set("category", category);
        const res = await fetch(`/api/items?${params.toString()}`);
        if (res.ok) {
          const rows = await res.json();
          realResults = rows.map((row: any) => ({
            id: row.id + 1_000_000,
            ownerId: row.ownerId,
            title: row.titleEs,
            titleEs: row.titleEs,
            description: row.description || "",
            features: row.features || [],
            category: row.category,
            pricePerDay: row.pricePerDay,
            currency: row.currency || "",
            city: row.city,
            country: row.country || "España",
            available: row.available,
            images: row.images || [],
            rating: row.rating || 0,
            totalReviews: row.totalReviews || 0,
            isPromoted: row.isPromoted || false,
            specifications: row.specifications || {},
            lastBumpTime: new Date(row.createdAt || Date.now()),
            isActive: row.isActive,
            trialEndsOn: null,
          }));
        }
      } catch {
      }

      if (cancelled) return;

      let filtered = mockResults;
      if (category) {
        filtered = filtered.filter((item) => item.category === category);
      }

      const combined = [...realResults, ...filtered];
      const sorted = [...combined].sort((a, b) => {
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;
        return 0;
      });
      setItems(sorted);
    }

    loadItems();
    return () => {
      cancelled = true;
    };
  }, [query, city, category]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <AnnouncementBanner />
      
      {/* Amazon-style Header */}
      <header className="bg-[#1B2A41] text-white sticky top-0 z-20">
        <div className="container mx-auto px-2 py-2 flex items-center justify-between gap-2 flex-wrap md:flex-nowrap">
          {/* Logo & Location */}
          <div className="flex items-center gap-4 min-w-max">
            <Menu className="w-6 h-6 md:hidden ml-2" />
            <Link href="/">
              <a className="text-xl md:text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-1 border border-transparent hover:border-white p-1 rounded-sm">
                <span className="bg-[#E85A2A] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
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
          
          {/* Search Bar - Keycap Style (Center) */}
          <div className="flex-1 max-w-4xl flex items-center gap-2 order-last md:order-none w-full mt-2 md:mt-0 px-2 md:px-0">
            <select 
              className="bg-white text-black rounded-md px-2 py-2 outline-none text-xs w-auto md:w-32 hidden md:block hover:bg-gray-100 cursor-pointer border-b-4 border-gray-300 transition-all duration-100 active:translate-y-1 active:border-b-0"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              data-testid="select-city"
            >
              <option value="">Toda España</option>
              <optgroup label="Comunidades Autónomas">
                {SPANISH_REGIONS.map(region => (
                  <option key={`region-${region}`} value={region}>{region}</option>
                ))}
              </optgroup>
              <optgroup label="Municipios y Ciudades Principales">
                {MAJOR_CITIES.map(city => (
                  <option key={`city-${city}`} value={city}>{city}</option>
                ))}
              </optgroup>
            </select>
            <div className="relative flex-1">
              <Input 
                placeholder="Buscar maquinaria, herramientas, vehículos..." 
                className="w-full bg-white text-black rounded-md focus-visible:ring-2 focus-visible:ring-[#E85A2A] h-10 px-4 text-base border-b-4 border-gray-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35] text-black rounded-md h-10 px-5 border-b-4 border-[#A83F1A] transition-all duration-100 active:translate-y-1 active:border-b-0">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Right Actions - Keycap Style */}
          <div className="flex items-center gap-2 md:gap-3 min-w-max">
            
            <Link href="/auth">
              <a className="hidden lg:flex flex-col text-sm bg-[#22334D] rounded-md px-3 py-1.5 cursor-pointer text-white border-b-4 border-[#0A121F] transition-all duration-100 hover:bg-[#2B3F5C] active:translate-y-1 active:border-b-0">
                <span className="text-xs text-gray-300">Hola, Identifícate</span>
                <span className="font-bold flex items-center text-sm leading-tight text-white">Mi Cuenta</span>
              </a>
            </Link>

            <div className="hidden lg:flex flex-col text-sm bg-[#22334D] rounded-md px-3 py-1.5 cursor-pointer border-b-4 border-[#0A121F] transition-all duration-100 hover:bg-[#2B3F5C] active:translate-y-1 active:border-b-0">
              <span className="text-xs text-gray-300">Devoluciones</span>
              <span className="font-bold flex items-center text-sm leading-tight">y Pedidos</span>
            </div>
            
            <Link href="/premium">
              <Button className="bg-[#FF6B35] hover:bg-[#FF6B35] text-black font-bold uppercase tracking-wide hidden sm:flex h-10 px-5 rounded-md border-b-4 border-[#A83F1A] transition-all duration-100 active:translate-y-1 active:border-b-0">
                Destacar Anuncio
              </Button>
            </Link>
            
            <div className="flex items-end bg-[#22334D] rounded-md px-3 py-1.5 cursor-pointer relative border-b-4 border-[#0A121F] transition-all duration-100 hover:bg-[#2B3F5C] active:translate-y-1 active:border-b-0">
              <ShoppingCart className="h-7 w-7" />
              <span className="absolute top-0 right-1 md:right-2 text-[#FF6B35] font-bold text-lg leading-none">0</span>
              <span className="font-bold text-sm hidden md:block mt-auto ml-1">Cesta</span>
            </div>
          </div>
        </div>
        
        {/* Category Sub-nav - Keycap Style */}
        <div className="bg-[#10192B] px-4 py-3 text-sm flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <a 
            href="#" 
            className={`flex items-center gap-1 font-bold px-3 py-1.5 rounded-md border-b-4 transition-all duration-100 active:translate-y-1 active:border-b-0 ${category === '' ? 'bg-[#FF6B35] border-[#A83F1A] text-black' : 'bg-[#22334D] border-[#0A121F] text-gray-200 hover:bg-[#2B3F5C]'}`}
            onClick={(e) => { e.preventDefault(); setCategory(""); }}
          >
            <Menu className="w-4 h-4"/> Todo
          </a>
          {CATEGORIES.map(cat => (
            <a 
              key={cat.id} 
              href="#" 
              onClick={(e) => { e.preventDefault(); setCategory(cat.id); }}
              className={`px-3 py-1.5 rounded-md border-b-4 font-medium transition-all duration-100 active:translate-y-1 active:border-b-0 ${category === cat.id ? 'bg-[#FF6B35] border-[#A83F1A] text-black font-bold' : 'bg-[#22334D] border-[#0A121F] text-gray-200 hover:bg-[#2B3F5C]'}`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </header>

{/* Main Content */}
      <main className="container mx-auto px-4 py-6 bg-gray-50 dark:bg-background min-h-[calc(100vh-200px)] pb-20 lg:pb-6">
        {/* AdSense Top Banner - Compact */}
        <div className="mb-6 w-full flex justify-center">
          <AdSensePlaceholder width="100%" height="90px" className="max-w-[728px] rounded-lg" />
        </div>
        {/* Sponsored Carousel */}
        {items.some(i => i.isPromoted) && (
          <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <SponsoredCarousel items={items.filter(i => i.isPromoted)} title="Anuncios Patrocinados Destacados" />
          </div>
        )}
        <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
          <h2 className="text-xl font-bold text-gray-900">
            {category ? `Resultados en: ${CATEGORIES.find(c => c.id === category)?.name}` : 'Resultados Destacados de Maquinaria y Equipamiento'}
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
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 min-w-0 auto-rows-fr">
              {items.map((item, index) => (
                <Fragment key={item.id}>
                  <Card 
                    className="bg-white border-gray-200 overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col rounded-xl h-full"
                    onClick={() => setLocation(`/item/${item.id}`)}
                    data-testid={`card-item-${item.id}`}
                  >
                    <div className="relative w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center p-3 shrink-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.titleEs} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      {item.isPromoted && (
                        <div className="mb-1 flex items-center gap-1">
                          <span className="text-[10px] sm:text-xs text-gray-500 font-medium">Patrocinado</span>
                          <Info className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <CardHeader className="p-0 mb-1">
                        <CardTitle className="text-sm sm:text-base font-medium line-clamp-2 leading-tight text-[#2563EB] group-hover:text-[#EA580C] group-hover:underline transition-colors">
                          {item.titleEs}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 flex-1 flex flex-col">
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-[#FBBF24]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-[#2563EB] text-xs ml-1">{item.totalReviews}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs align-top"></span>
                          <span className="text-xl sm:text-2xl font-medium text-gray-900">{item.pricePerDay}</span>
                          <span className="text-xs text-gray-500">/día</span>
                        </div>
                        {item.available && (
                          <div className="text-xs text-[#16A34A] font-bold mt-1">
                            Entrega Disponible
                          </div>
                        )}
                        <div className="text-xs text-gray-700 mt-auto pt-2 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="font-medium truncate">{item.city}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                  {(index + 1) % 8 === 0 && index !== items.length - 1 && (
                    <div className="col-span-2 md:col-span-3">
                      <AdSensePlaceholder width="100%" height="120px" className="rounded-xl" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-24 flex flex-col gap-4">
                <AdSensePlaceholder width="300px" height="600px" className="rounded-xl" />
              </div>
            </aside>
          </div>
        )}
      </main>
      
      <footer className="bg-[#10192B] text-white pt-10 pb-6 mt-auto">
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
                <li><Link href="/seller-dashboard"><a className="hover:underline">Anuncia tus productos</a></Link></li>
                <li><a href="/premium" className="hover:underline text-[#E85A2A]">Programa Premium</a></li>
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
          
          <div className="border-t border-gray-600 pt-8 flex flex-col items-center relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#E85A2A] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
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
            
            {/* Botón oculto para el admin */}
            <Link href="/admin-secret-hub-2030">
              <a className="absolute bottom-0 right-0 w-12 h-12 opacity-0 cursor-default" title=""></a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
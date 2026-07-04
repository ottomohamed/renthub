import { useState, useEffect } from "react";
import { searchItems, type Item } from "@/lib/mock-db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Zap, Search } from "lucide-react";
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
    setItems(results);
  }, [query, city]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <AnnouncementBanner />
      
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="text-2xl font-bold text-primary drop-shadow-[0_0_5px_rgba(0,255,192,0.5)]">RentHub 2030</a>
            </Link>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-background">Iniciar sesión</Button>
            <Button className="bg-primary text-background hover:bg-primary/90 font-bold">➕ Publicar Anuncio</Button>
          </div>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
            Encuentra maquinaria, herramientas y vehículos
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Alquila de particulares y empresas de confianza ahora en España.
          </p>
          
          <div className="bg-white/5 border border-primary/30 backdrop-blur-xl p-4 rounded-xl shadow-2xl mt-12 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Buscar por producto o categoría..." 
                className="pl-10 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <div className="w-px bg-primary/20 hidden md:block"></div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <select 
                className="w-full h-10 bg-transparent pl-10 outline-none text-foreground cursor-pointer appearance-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                data-testid="select-city"
              >
                <option value="" className="bg-card">Todas las ciudades</option>
                <option value="Madrid" className="bg-card">Madrid</option>
                <option value="Barcelona" className="bg-card">Barcelona</option>
                <option value="Valencia" className="bg-card">Valencia</option>
                <option value="Sevilla" className="bg-card">Sevilla</option>
              </select>
            </div>
            <Button className="bg-primary text-background hover:bg-primary/90 font-bold px-8 w-full md:w-auto">
              Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Resultados ({items.length})
          </h2>
          <Link href="/premium">
            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-primary/50 text-primary hover:bg-primary gap-2">
              <Zap className="w-4 h-4" /> Destacar mi anuncio
            </a>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No se encontraron resultados</h3>
            <p className="text-muted-foreground">Prueba a buscar con otras palabras o cambiar de ciudad.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,192,0.15)] group cursor-pointer"
                onClick={() => setLocation(`/item/${item.id}`)}
                data-testid={`card-item-${item.id}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.images[0]} 
                    alt={item.titleEs} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  
                  {item.badge?.es && (
                    <Badge className="absolute top-3 left-3 bg-primary text-background font-bold border-none">
                      {item.badge.es}
                    </Badge>
                  )}
                  
                  <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur text-foreground px-2 py-1 rounded-md font-bold border border-primary/20 text-sm">
                    {item.pricePerDay} {item.currency} <span className="text-[10px] text-muted-foreground font-normal">/día</span>
                  </div>
                </div>
                
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {item.titleEs}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    {item.city}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  {/* Bump Bar Indicator */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-[10px] text-muted-foreground w-8">Bump</div>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/70 rounded-full" 
                        style={{ 
                           width: `${Math.max(5, 100 - (Date.now() - new Date(item.lastBumpTime).getTime()) / (24 * 3600 * 10))}%` // Simplified viz logic for demo
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 border-t border-border bg-white/2 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-sm">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.totalReviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground" title="Última actualización (Bump)">
                    <Zap className="h-3 w-3 text-primary" />
                    <span>hace {Math.floor((Date.now() - new Date(item.lastBumpTime).getTime()) / 3600000)}h</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-card border-t border-border py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4 drop-shadow-[0_0_5px_rgba(0,255,192,0.5)]">RentHub 2030</h2>
          <p className="mb-8 max-w-lg mx-auto text-muted-foreground">La plataforma líder de alquiler de maquinaria en España. Conectamos propietarios con arrendatarios de forma fácil y segura.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Sobre nosotros</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Cómo funciona</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Precios</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Contacto</a>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-xs text-muted-foreground">
            © 2025 RentHub 2030. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

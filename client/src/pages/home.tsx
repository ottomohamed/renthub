import { useState, useEffect } from "react";
import { searchItems, type Item } from "@/lib/mock-db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Zap, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

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
    <div className="min-h-screen bg-background text-foreground font-sans" dir="rtl">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="text-2xl font-bold text-primary drop-shadow-[0_0_5px_rgba(0,255,192,0.5)]">RentHub 2030</a>
            </Link>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-background">تسجيل الدخول</Button>
            <Button className="bg-primary text-background hover:bg-primary/90 font-bold">➕ أضف إعلانك والدفع</Button>
          </div>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
            ابحث عن المعدات، الأدوات والمركبات للإيجار
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            استأجر من الأفراد والشركات الموثوقة الآن في إسبانيا.
          </p>
          
          <div className="bg-white/5 border border-primary/30 backdrop-blur-xl p-4 rounded-xl shadow-2xl mt-12 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="ابحث باسم المنتج أو الفئة..." 
                className="pr-10 text-right bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <div className="w-px bg-primary/20 hidden md:block"></div>
            <div className="relative flex-1">
              <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <select 
                className="w-full h-10 bg-transparent text-right pr-10 outline-none text-foreground cursor-pointer appearance-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                data-testid="select-city"
              >
                <option value="" className="bg-card">جميع المدن</option>
                <option value="Madrid" className="bg-card">مدريد</option>
                <option value="Barcelona" className="bg-card">برشلونة</option>
                <option value="Valencia" className="bg-card">فالنسيا</option>
                <option value="Sevilla" className="bg-card">إشبيلية</option>
              </select>
            </div>
            <Button className="md:w-32 h-12 text-lg font-bold bg-primary text-background hover:bg-primary/90" onClick={() => {}}>بحث 🔍</Button>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            الإعلانات المميزة 
            <span className="text-xs font-normal text-muted-foreground bg-white/5 px-2 py-1 rounded-full">(Bumped Items)</span>
          </h2>
          <span className="text-muted-foreground">{items.length} نتيجة</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-xl">لا توجد نتائج مطابقة لبحثك</p>
            <Button variant="link" className="text-primary" onClick={() => {setQuery(""); setCity("")}}>عرض كل الإعلانات</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden bg-card border-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group cursor-pointer" 
                data-testid={`card-product-${item.id}`}
                onClick={() => setLocation(`/item/${item.id}`)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  
                  {item.badge?.ar && (
                    <Badge className="absolute top-3 right-3 bg-primary text-background font-bold border-none hover:bg-primary">
                      {item.badge.ar}
                    </Badge>
                  )}
                  
                  <div className="absolute bottom-3 left-3">
                    <div className="text-2xl font-bold text-white drop-shadow-md">
                      {item.pricePerDay} {item.currency}
                    </div>
                  </div>

                  {item.isActive && (
                     <div className="absolute top-3 left-3 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-primary font-mono border border-primary/20">
                        ID: {item.id}
                     </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold line-clamp-1 text-foreground group-hover:text-primary transition-colors" title={item.title}>
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-1">{item.titleEs}</p>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{item.city}, {item.country}</span>
                  </div>
                  
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
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground" title="آخر تحديث (Bump)">
                    <Zap className="h-3 w-3 text-primary" />
                    <span>منذ {Math.floor((Date.now() - new Date(item.lastBumpTime).getTime()) / 3600000)} ساعة</span>
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
          <p className="mb-8 max-w-lg mx-auto text-muted-foreground">المنصة الرائدة لتأجير المعدات في إسبانيا. نوصل الملاك بالمستأجرين بسهولة وأمان.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-foreground hover:text-primary transition-colors">عن المنصة</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">كيف تعمل</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">الأسعار</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">اتصل بنا</a>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-xs text-muted-foreground">
            © 2025 RentHub 2030. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}

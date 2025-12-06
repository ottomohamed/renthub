import { useState, useEffect } from "react";
import { searchItems, type Item, type SubscriptionPlan } from "@/lib/mock-db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Zap, Search, Globe } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  // Initial load and search effect
  useEffect(() => {
    const results = searchItems(query, city);
    setItems(results);
  }, [query, city]);

  const getPlanColor = (plan: SubscriptionPlan | undefined) => {
    switch (plan) {
      case 'GOLD': return "bg-yellow-500";
      case 'SILVER': return "bg-slate-400";
      case 'BRONZE': return "bg-amber-700";
      default: return "bg-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 rtl:text-right font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              RH
            </div>
            <h1 className="text-2xl font-bold text-primary hidden md:block">RentHub 2030</h1>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline">تسجيل الدخول</Button>
            <Button>أضف إعلانك</Button>
          </div>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="bg-primary/5 py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            استأجر أي شيء، في أي مكان
          </h2>
          <p className="text-slate-600 text-lg">
            أكبر منصة لتأجير المعدات والآليات في إسبانيا والشرق الأوسط
          </p>
          
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="ابحث عن جرار، مثقاب، سيارة..." 
                className="pr-10 text-right"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="المدينة (مثلاً: Madrid)" 
                className="pr-10 text-right"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                data-testid="input-city"
              />
            </div>
            <Button className="md:w-32" onClick={() => {}}>بحث</Button>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800">أحدث الإعلانات</h3>
          <span className="text-slate-500">{items.length} نتيجة</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-xl">لا توجد نتائج مطابقة لبحثك</p>
            <Button variant="link" onClick={() => {setQuery(""); setCity("")}}>عرض كل الإعلانات</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer bg-white border-slate-200" data-testid={`card-product-${item.id}`}>
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge?.ar && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600 text-white border-none">
                      {item.badge.ar}
                    </Badge>
                  )}
                  {item.trialEndsOn && (
                    <Badge variant="secondary" className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-xs">
                      تجريبي
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-bold line-clamp-1" title={item.title}>
                      {item.title}
                    </CardTitle>
                    <div className="text-lg font-bold text-primary whitespace-nowrap">
                      {item.pricePerDay} {item.currency}
                      <span className="text-xs font-normal text-slate-500 block text-left">/ يوم</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">{item.titleEs}</p>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{item.city}, {item.country}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.specifications && Object.entries(item.specifications).slice(0, 2).map(([key, value]) => (
                      <Badge key={key} variant="outline" className="bg-slate-50 text-xs font-normal">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 border-t bg-slate-50/50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-sm">{item.rating}</span>
                    <span className="text-xs text-slate-400">({item.totalReviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400" title="آخر تحديث (Bump)">
                    <Zap className="h-3 w-3" />
                    <span>منذ {Math.floor((Date.now() - new Date(item.lastBumpTime).getTime()) / 3600000)} ساعة</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-slate-900 text-slate-300 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">RentHub 2030</h2>
          <p className="mb-8 max-w-lg mx-auto">المنصة الرائدة لتأجير المعدات في إسبانيا. نوصل الملاك بالمستأجرين بسهولة وأمان.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white">عن المنصة</a>
            <a href="#" className="hover:text-white">كيف تعمل</a>
            <a href="#" className="hover:text-white">الأسعار</a>
            <a href="#" className="hover:text-white">اتصل بنا</a>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-xs text-slate-500">
            © 2025 RentHub 2030. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}

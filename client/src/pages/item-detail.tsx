import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { getItemById, getUserById, type Item, type User } from "@/lib/mock-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Phone, ArrowRight, MapPin, Calendar } from "lucide-react";
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
        <h1 className="text-2xl font-bold animate-pulse">تحميل...</h1>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">خطأ: المنتج غير موجود أو غير نشط.</h1>
        <Link href="/">
          <Button variant="outline">← العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header Nav */}
        <header className="flex justify-end py-4 mb-8 border-b border-border/50">
          <Link href="/">
            <a className="text-primary hover:text-primary/80 flex items-center gap-2 text-lg font-bold transition-colors">
              <ArrowRight className="w-5 h-5" />
              العودة للصفحة الرئيسية
            </a>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{item.title}</h1>
              <div className="text-secondary-foreground text-lg mb-2">{item.titleEs}</div>
              
              <div className="text-5xl font-bold text-primary my-6 drop-shadow-[0_0_10px_rgba(0,255,192,0.3)]">
                {item.pricePerDay} {item.currency} <span className="text-lg text-muted-foreground font-normal">/ يوم</span>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-primary/30 shadow-2xl shadow-primary/5">
              <img 
                src={item.images[0]} 
                alt={item.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {item.badge?.ar && (
                <Badge className="absolute top-4 right-4 text-lg py-1 px-3 bg-primary text-background font-bold hover:bg-primary">
                  {item.badge.ar}
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary border-b border-border pb-2">الوصف الكامل</h3>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {item.specifications && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary border-b border-border pb-2">المواصفات الفنية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div key={key} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 flex justify-between items-center">
                      <span className="text-muted-foreground uppercase text-sm font-bold tracking-wider">{key}</span>
                      <span className="text-foreground font-bold text-lg">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Owner Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-foreground border-b-2 border-primary pb-3 mb-6">
                بيانات المالك
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">الاسم</p>
                  <p className="text-xl font-bold">{owner ? owner.name : 'N/A'}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-1">
                    <Star className="fill-current" /> 
                    {owner ? owner.ratingAvg : 'N/A'}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    ({owner ? owner.totalRatings : 0} تقييم)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{item.city}, {item.country}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>عضو منذ: {owner ? owner.memberSince : 'N/A'}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-14 text-lg font-bold bg-primary text-background hover:bg-primary/90 mt-4"
                  onClick={() => window.location.href = `tel:${owner?.phoneNumber}`}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  اتصل بالمالك
                </Button>
                
                {owner && (
                  <p className="text-center text-xs text-muted-foreground mt-2 dir-ltr">
                    {owner.phoneNumber}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

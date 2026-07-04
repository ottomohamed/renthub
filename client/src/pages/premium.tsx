import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePayment = () => {
    if (!selectedPlan) return;
    
    // Mock payment success
    toast({
      title: "Pago completado",
      description: "Tu anuncio ahora es premium y será destacado.",
    });
    
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="container mx-auto max-w-5xl">
        <header className="flex items-center mb-8">
          <Link href="/">
            <a className="text-primary hover:text-primary/80 flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Volver al inicio
            </a>
          </Link>
        </header>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Impulsa tus Alquileres</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Destaca tus anuncios en la página principal o en nuestro banner animado para multiplicar tus reservas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plan 1 */}
          <Card className={`bg-card/50 border-2 transition-all cursor-pointer ${selectedPlan === 'top_spot' ? 'border-primary shadow-[0_0_20px_rgba(0,255,192,0.2)]' : 'border-white/5 hover:border-white/20'}`} onClick={() => setSelectedPlan('top_spot')}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-white/5 text-white">Recomendado</Badge>
                <TrendingUp className="text-primary w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Destacado Superior</CardTitle>
              <CardDescription className="text-lg">Aparece siempre en las primeras posiciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-primary mb-6">9€ <span className="text-lg text-muted-foreground font-normal">/semana</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Posición prioritaria en búsquedas</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Etiqueta especial de "Destacado"</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Hasta 3x más visualizaciones</li>
              </ul>
            </CardContent>
          </Card>

          {/* Plan 2 */}
          <Card className={`bg-card/50 border-2 transition-all cursor-pointer relative overflow-hidden ${selectedPlan === 'animated_banner' ? 'border-primary shadow-[0_0_20px_rgba(0,255,192,0.2)]' : 'border-white/5 hover:border-white/20'}`} onClick={() => setSelectedPlan('animated_banner')}>
            <div className="absolute top-0 right-0 bg-primary text-background font-bold text-xs px-3 py-1 rounded-bl-lg z-10">MÁXIMA VISIBILIDAD</div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50">Premium</Badge>
                <Sparkles className="text-primary w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Banner Animado VIP</CardTitle>
              <CardDescription className="text-lg">Tu anuncio en el banner deslizante principal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-primary mb-6">19€ <span className="text-lg text-muted-foreground font-normal">/semana</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Inclusión en el carrusel superior animado</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Máxima tasa de conversión garantizada</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Diseño visual exclusivo</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Check className="text-primary w-5 h-5" /> Incluye todos los beneficios del Destacado Superior</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {selectedPlan && (
          <div className="bg-white/5 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20 animate-in slide-in-from-bottom-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Resumen de tu pedido</h3>
              <p className="text-muted-foreground">
                Estás seleccionando: <span className="font-bold text-primary">{selectedPlan === 'top_spot' ? 'Destacado Superior (9€)' : 'Banner Animado VIP (19€)'}</span>
              </p>
            </div>
            <Button size="lg" className="w-full md:w-auto bg-primary text-background font-bold text-lg hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,192,0.4)]" onClick={handlePayment}>
              Proceder al Pago Seguro
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

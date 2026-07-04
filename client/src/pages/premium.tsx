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
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 font-sans">
      <header className="bg-[#131921] text-white p-4 mb-8">
        <div className="container mx-auto flex items-center">
          <Link href="/">
            <a className="text-xl font-bold text-white hover:text-[#f3a847] transition-colors flex items-center gap-1">
              <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
              <span className="tracking-tight">RentHub</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium mb-4 text-gray-900">Impulsa tus Alquileres de Maquinaria</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Destaca tus anuncios como patrocinados para multiplicar tus reservas y rentabilidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plan 1 */}
          <Card className={`bg-white transition-all cursor-pointer border-2 ${selectedPlan === 'top_spot' ? 'border-[#f3a847] shadow-md' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`} onClick={() => setSelectedPlan('top_spot')}>
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-white text-gray-700 border-gray-300">Recomendado</Badge>
                <TrendingUp className="text-[#f3a847] w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-medium">Anuncio Patrocinado Básico</CardTitle>
              <CardDescription className="text-gray-500">Aparece en los primeros resultados de búsqueda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-3xl font-bold text-gray-900 mb-6">9€ <span className="text-base text-gray-500 font-normal">/semana</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Posición prioritaria en búsquedas</li>
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Etiqueta de "Patrocinado"</li>
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Hasta 3x más visualizaciones</li>
              </ul>
            </CardContent>
          </Card>

          {/* Plan 2 */}
          <Card className={`bg-white transition-all cursor-pointer border-2 relative overflow-hidden ${selectedPlan === 'animated_banner' ? 'border-[#f3a847] shadow-md' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`} onClick={() => setSelectedPlan('animated_banner')}>
            <div className="absolute top-0 right-0 bg-[#007185] text-white font-bold text-xs px-3 py-1 rounded-bl-lg z-10">MÁXIMA VISIBILIDAD</div>
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-[#f3a847]/20 text-[#c45500] border-[#f3a847]">Premium</Badge>
                <Sparkles className="text-[#f3a847] w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-medium">Banner Animado VIP</CardTitle>
              <CardDescription className="text-gray-500">Tu anuncio en el banner deslizante principal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-3xl font-bold text-gray-900 mb-6">19€ <span className="text-base text-gray-500 font-normal">/semana</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Inclusión en el carrusel superior animado</li>
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Máxima tasa de conversión garantizada</li>
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Diseño visual exclusivo</li>
                <li className="flex items-center gap-3 text-gray-700"><Check className="text-[#007600] w-5 h-5" /> Incluye todos los beneficios del Patrocinado Básico</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {selectedPlan && (
          <div className="bg-white rounded-lg p-6 border border-[#f3a847] shadow-sm animate-in slide-in-from-bottom-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Resumen de tu pedido</h3>
              <p className="text-gray-600">
                Selección: <span className="font-bold text-[#c45500]">{selectedPlan === 'top_spot' ? 'Patrocinado Básico (9€)' : 'Banner Animado VIP (19€)'}</span>
              </p>
            </div>
            <Button size="lg" className="w-full md:w-auto bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium border border-[#fcd200] shadow-sm rounded-full px-8" onClick={handlePayment}>
              Proceder al Pago
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { Check, Star, Zap, TrendingUp, Shield, HelpCircle, PhoneCall, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Premium() {
  const handleUpgrade = (plan: string) => {
    alert(`En un entorno real, aquí se abriría la pasarela de pago para el plan ${plan}.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-16">
      {/* Header */}
      <header className="bg-[#1B2A41] text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-bold text-white hover:text-[#E85A2A] transition-colors flex items-center gap-1">
              <span className="bg-[#E85A2A] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
              <span className="tracking-tight">RentHub <span className="text-xs font-normal align-top text-[#E85A2A] ml-1">PREMIUM</span></span>
            </a>
          </Link>
          <Link href="/seller-dashboard">
            <a className="text-sm text-gray-300 hover:text-white">Volver al Panel</a>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 max-w-5xl text-center">
          <Badge className="bg-[#E85A2A] text-black hover:bg-[#FF6B35] border-[#fcd200] mb-4 text-xs font-bold px-3 py-1">
            Impulsa tus ventas
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Llega a más clientes, alquila más rápido.</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Los anunciantes Premium reciben hasta <span className="font-bold text-[#EA580C]">3 veces más contactos</span> que los anunciantes gratuitos. Elige el plan que mejor se adapte a tu negocio.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 max-w-6xl -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Plan Básico/Gratis */}
          <Card className="border border-gray-200 shadow-sm relative opacity-80">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-700">Gratis</CardTitle>
              <div className="text-3xl font-bold mt-4 mb-1">0€ <span className="text-sm font-normal text-gray-500">/ mes</span></div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-6" disabled>
                Tu plan actual
              </Button>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>Máximo 3 anuncios activos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>Estadísticas básicas</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="w-4 h-4 shrink-0 flex items-center justify-center mt-0.5">-</span>
                  <span>Sin visibilidad destacada (Bajas vistas)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Plan Pro / Plata */}
          <Card className="border-2 border-[#2563EB] shadow-lg relative transform md:-translate-y-4 bg-white">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2563EB] text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              El más popular
            </div>
            <CardHeader className="text-center pb-2 pt-8">
              <CardTitle className="text-2xl font-bold text-[#2563EB]">Profesional</CardTitle>
              <div className="text-4xl font-bold mt-4 mb-1">29€ <span className="text-base font-normal text-gray-500">/ mes</span></div>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-6 bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200]" onClick={() => handleUpgrade('Profesional')}>
                Mejorar a Profesional
              </Button>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="font-medium">Hasta 100 anuncios activos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span><strong className="text-gray-900">Renovación cada 12h</strong> (Sube a primeros resultados)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Estadísticas avanzadas de WhatsApp y Llamadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Soporte prioritario por email</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Plan Empresa / Oro */}
          <Card className="border-2 border-[#E85A2A] shadow-lg relative bg-gradient-to-b from-[#fff8e1] to-white">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-[#EA580C]">Empresa</CardTitle>
              <div className="text-4xl font-bold mt-4 mb-1">59€ <span className="text-base font-normal text-gray-500">/ mes</span></div>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-6 bg-[#1B2A41] hover:bg-[#10192B] text-white" onClick={() => handleUpgrade('Empresa')}>
                Mejorar a Empresa
              </Button>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#EA580C] shrink-0" />
                  <span className="font-bold text-gray-900">Anuncios ILIMITADOS</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#EA580C] shrink-0" />
                  <span><strong className="text-gray-900">Anuncios Patrocinados</strong> (Siempre visibles en la página principal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#EA580C] shrink-0" />
                  <span><strong className="text-gray-900">Renovación continua (1h)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#EA580C] shrink-0" />
                  <span>Insignia de "Empresa Verificada"</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#EA580C] shrink-0" />
                  <span>Asesor personal asignado</span>
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Trust factors */}
      <div className="container mx-auto px-4 mt-20 max-w-5xl">
        <h3 className="text-2xl font-bold text-center mb-10">¿Por qué pasarse a Premium?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Eye className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg mb-2">Máxima Visibilidad</h4>
            <p className="text-gray-600 text-sm">Tus anuncios aparecerán en la banda superior de "Patrocinados" en la página principal.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
              <PhoneCall className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg mb-2">Más Contactos Reales</h4>
            <p className="text-gray-600 text-sm">Al estar siempre arriba, multiplicas las posibilidades de que te llamen o escriban por WhatsApp.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg mb-2">Genera Confianza</h4>
            <p className="text-gray-600 text-sm">Los usuarios confían más en las empresas destacadas y verificadas por la plataforma.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

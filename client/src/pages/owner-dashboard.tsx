import { useState, useEffect } from "react";
import { Link } from "wouter";
import { getAllItems, USERS, SUBSCRIPTION_PLANS, type Item } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Eye, MousePointerClick, MessageSquare, TrendingUp, ArrowLeft, Package, Star, Phone, MessageCircle, AlertTriangle, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OwnerDashboard() {
  const [items, setItems] = useState<any[]>([]);
  // Mock logged in owner - Let's use user 4 who is BRONZE, but let's treat them as FREE for the demo
  const currentOwnerId = 4;
  const owner = USERS.find(u => u.id === currentOwnerId) || USERS[0];
  const plan = SUBSCRIPTION_PLANS[owner.plan === 'BRONZE' ? 'FREE' : owner.plan] || SUBSCRIPTION_PLANS['FREE']; // Force to FREE for demo

  useEffect(() => {
    const allItems = getAllItems();
    setItems(allItems.filter((item: any) => item.ownerId === currentOwnerId));
  }, []);

  const totalViews = items.reduce((sum, item) => sum + (item.views || 0), 0);
  const totalClicks = items.reduce((sum, item) => sum + (item.clicks || 0), 0);
  const totalWhatsapp = items.reduce((sum, item) => sum + (item.whatsappClicks || Math.floor(Math.random() * 20)), 0);
  const totalPhone = items.reduce((sum, item) => sum + (item.phoneClicks || Math.floor(Math.random() * 15)), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-[#1B2A41] text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-xl font-bold text-white hover:text-[#E85A2A] transition-colors flex items-center gap-1">
                <span className="bg-[#E85A2A] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
                <span className="tracking-tight">RentHub <span className="text-xs font-normal align-top text-[#E85A2A] ml-1">SELLER CENTRAL</span></span>
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">Hola, {owner.nameEs}</div>
            <Link href="/">
              <a className="text-sm text-white hover:text-[#E85A2A]">Volver a la tienda</a>
            </Link>
          </div>
        </div>
      </header>

      {/* Upgrade Banner for Free Users */}
      <div className="bg-gradient-to-r from-[#10192B] to-[#1B2A41] text-white py-6 mb-6">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-gray-600 hover:bg-gray-600 border-none">Plan Actual: Básico (Gratis)</Badge>
              <span className="text-[#E85A2A] font-bold flex items-center text-sm"><AlertTriangle className="w-4 h-4 mr-1"/> Límite alcanzado</span>
            </div>
            <h2 className="text-xl font-bold">Aumenta tus alquileres hasta un 300%</h2>
            <p className="text-sm text-gray-300">Tus anuncios no se están mostrando en la primera página. Pásate a Premium.</p>
          </div>
          <Link href="/premium">
            <Button className="bg-[#E85A2A] hover:bg-[#FF6B35] text-black font-bold border border-[#fcd200] whitespace-nowrap h-11 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 mr-2" />
              Ver Planes Premium
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel del Vendedor</h1>
            <p className="text-gray-500">Gestión de inventario y estadísticas de rendimiento</p>
          </div>
          <Button className="bg-[#E85A2A] hover:bg-[#FF6B35] text-black border border-[#fcd200]" disabled={items.length >= 3}>
            + Nuevo Anuncio {items.length >= 3 && "(Límite Alcanzado)"}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Visualizaciones</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-red-500 flex items-center mt-4">
                <TrendingUp className="w-3 h-3 mr-1 rotate-180" /> -15% (Mejora con Premium)
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Clics a WhatsApp</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalWhatsapp.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Veces que abrieron chat
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Revelar Teléfono</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalPhone.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Veces que vieron tu número
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-sm bg-gradient-to-br from-white to-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-bold text-[#EA580C] mb-1">Oportunidad Perdida</p>
                  <h3 className="text-2xl font-bold text-gray-900">~{totalViews > 0 ? Math.floor(totalViews * 0.05) : 0} clientes</h3>
                </div>
                <div className="p-2 bg-orange-100 text-[#EA580C] rounded-full">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-gray-600">
                Estimación de clientes perdidos por no aparecer en primera página.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Listings Table */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Rendimiento por Anuncio</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="p-4 font-medium">Anuncio</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 font-medium">Visualizaciones</th>
                <th className="p-4 font-medium">WhatsApp</th>
                <th className="p-4 font-medium">Teléfono</th>
                <th className="p-4 font-medium">Posición Búsqueda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 border rounded flex items-center justify-center shrink-0">
                        <img src={item.images[0]} alt="" className="max-w-full max-h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <Link href={`/item/${item.id}`}>
                          <a className="font-medium text-[#2563EB] hover:underline hover:text-[#EA580C] line-clamp-1">
                            {item.titleEs}
                          </a>
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">Ref: #{item.id} • {item.pricePerDay}€/día</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none">Básico</Badge>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{(item.views || 0).toLocaleString()}</td>
                  <td className="p-4 font-medium text-green-600">{(item.whatsappClicks || Math.floor(Math.random()*10)).toLocaleString()}</td>
                  <td className="p-4 font-medium text-indigo-600">{(item.phoneClicks || Math.floor(Math.random()*10)).toLocaleString()}</td>
                  <td className="p-4 text-red-500 font-medium flex items-center">
                    Página {Math.floor(Math.random() * 5) + 3} <AlertTriangle className="w-3 h-3 ml-1" />
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    No tienes ningún anuncio activo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

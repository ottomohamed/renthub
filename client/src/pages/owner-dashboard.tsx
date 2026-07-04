import { useState, useEffect } from "react";
import { Link } from "wouter";
import { getAllItems, USERS, type Item } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Eye, MousePointerClick, MessageSquare, TrendingUp, ArrowLeft, Package, Star } from "lucide-react";

export default function OwnerDashboard() {
  const [items, setItems] = useState<any[]>([]);
  // Mock logged in owner (ownerId = 1: أحمد محمد / Constructora Iberia S.L.)
  const currentOwnerId = 1;
  const owner = USERS.find(u => u.id === currentOwnerId);

  useEffect(() => {
    const allItems = getAllItems();
    setItems(allItems.filter((item: any) => item.ownerId === currentOwnerId));
  }, []);

  const totalViews = items.reduce((sum, item) => sum + (item.views || 0), 0);
  const totalClicks = items.reduce((sum, item) => sum + (item.clicks || 0), 0);
  const totalInquiries = items.reduce((sum, item) => sum + (item.inquiries || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-[#131921] text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-xl font-bold text-white hover:text-[#f3a847] transition-colors flex items-center gap-1">
                <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
                <span className="tracking-tight">RentHub <span className="text-xs font-normal align-top text-[#f3a847] ml-1">SELLER CENTRAL</span></span>
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">Hola, {owner?.nameEs}</div>
            <Link href="/">
              <a className="text-sm text-white hover:text-[#f3a847]">Volver a la tienda</a>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel del Vendedor</h1>
            <p className="text-gray-500">Gestión de inventario y estadísticas de rendimiento</p>
          </div>
          <Button className="bg-[#f3a847] hover:bg-[#febd69] text-black border border-[#fcd200]">
            + Nuevo Anuncio
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
              <p className="text-xs text-green-600 flex items-center mt-4">
                <TrendingUp className="w-3 h-3 mr-1" /> +12% vs mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Clics en Anuncios</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalClicks.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                  <MousePointerClick className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-green-600 flex items-center mt-4">
                <TrendingUp className="w-3 h-3 mr-1" /> +8% vs mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Contactos/Leads</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalInquiries.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-green-600 flex items-center mt-4">
                <TrendingUp className="w-3 h-3 mr-1" /> +24% vs mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Tasa de Conversión</p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {totalViews > 0 ? ((totalInquiries / totalViews) * 100).toFixed(1) : "0"}%
                  </h3>
                </div>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Visitantes que contactan
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
                <th className="p-4 font-medium">Clics</th>
                <th className="p-4 font-medium">Mensajes</th>
                <th className="p-4 font-medium">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 border rounded flex items-center justify-center shrink-0">
                        <img src={item.images[0]} alt="" className="max-w-full max-h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <Link href={`/item/${item.id}`}>
                          <a className="font-medium text-[#007185] hover:underline hover:text-[#c45500] line-clamp-1">
                            {item.titleEs}
                          </a>
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">Ref: #{item.id} • {item.pricePerDay}€/día</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {item.isPromoted ? (
                      <Badge className="bg-[#fff8e1] text-[#c45500] hover:bg-[#fff8e1] border-[#fcd200]">Patrocinado</Badge>
                    ) : item.isActive ? (
                      <Badge className="bg-[#e6f4ea] text-[#007600] hover:bg-[#e6f4ea] border-none">Activo</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none">Inactivo</Badge>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900">{(item.views || 0).toLocaleString()}</td>
                  <td className="p-4 font-medium text-gray-900">{(item.clicks || 0).toLocaleString()}</td>
                  <td className="p-4 font-medium text-green-600">{(item.inquiries || 0).toLocaleString()}</td>
                  <td className="p-4 text-gray-500">
                    {item.views > 0 ? ((item.clicks / item.views) * 100).toFixed(1) : "0"}%
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

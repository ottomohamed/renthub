import { useState } from "react";
import { Link } from "wouter";
import { USERS, ITEMS } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, LayoutList, TrendingUp, Settings, ArrowLeft } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Amazon-style Admin Header */}
      <header className="bg-[#131921] text-white p-4 mb-8 sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-xl font-bold text-white hover:text-[#f3a847] transition-colors flex items-center gap-1">
                <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
                <span className="tracking-tight">RentHub <span className="text-xs font-normal align-top opacity-80">Admin</span></span>
              </a>
            </Link>
          </div>
          <div className="text-sm text-gray-300">Hola, SuperUser</div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 max-w-7xl">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <div className="font-bold text-gray-900 mb-4 px-4">Panel de Control</div>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-md ${activeTab === 'dashboard' ? 'bg-[#f3a847]/10 text-[#c45500] font-bold border-l-4 border-[#f3a847]' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp className="mr-2 h-4 w-4" /> Resumen
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-md ${activeTab === 'listings' ? 'bg-[#f3a847]/10 text-[#c45500] font-bold border-l-4 border-[#f3a847]' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('listings')}
          >
            <LayoutList className="mr-2 h-4 w-4" /> Anuncios
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-md ${activeTab === 'users' ? 'bg-[#f3a847]/10 text-[#c45500] font-bold border-l-4 border-[#f3a847]' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="mr-2 h-4 w-4" /> Usuarios
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-md ${activeTab === 'settings' ? 'bg-[#f3a847]/10 text-[#c45500] font-bold border-l-4 border-[#f3a847]' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-500 text-sm font-medium">Total Usuarios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-medium text-gray-900">{USERS.length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-500 text-sm font-medium">Anuncios Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-medium text-gray-900">{ITEMS.filter(i => i.isActive).length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm rounded-lg border-t-4 border-t-[#f3a847]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#c45500] text-sm font-medium">Anuncios Patrocinados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-medium text-[#c45500]">{ITEMS.filter(i => i.isPromoted).length}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium text-gray-900">Gestión de Anuncios</h2>
                <Button className="bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] shadow-sm rounded">Añadir Anuncio</Button>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-medium">ID</th>
                      <th className="p-3 font-medium">Título</th>
                      <th className="p-3 font-medium">Categoría</th>
                      <th className="p-3 font-medium">Precio/Día</th>
                      <th className="p-3 font-medium">Estado</th>
                      <th className="p-3 font-medium">Patrocinado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ITEMS.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-500">{item.id}</td>
                        <td className="p-3 font-medium text-[#007185] hover:underline cursor-pointer">{item.titleEs}</td>
                        <td className="p-3 text-gray-700 capitalize">{item.category}</td>
                        <td className="p-3 font-medium">{item.pricePerDay}€</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.isActive ? 'bg-[#e6f4ea] text-[#007600]' : 'bg-red-50 text-[#B12704]'}`}>
                            {item.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="p-3">
                          {item.isPromoted ? (
                            <span className="text-xs bg-[#f3a847] text-black px-2 py-0.5 rounded shadow-sm font-medium">Patrocinado</span>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Usuarios Registrados</h2>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-medium">ID</th>
                      <th className="p-3 font-medium">Nombre</th>
                      <th className="p-3 font-medium">Email</th>
                      <th className="p-3 font-medium">Plan</th>
                      <th className="p-3 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {USERS.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-500">{user.id}</td>
                        <td className="p-3 font-medium text-gray-900">{user.nameEs}</td>
                        <td className="p-3 text-gray-600">{user.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                            user.plan === 'GOLD' ? 'bg-[#fff9e6] text-[#c45500] border-[#f3a847]' : 
                            user.plan === 'SILVER' ? 'bg-gray-100 text-gray-700 border-gray-300' : 
                            'bg-orange-50 text-[#B12704] border-orange-200'
                          }`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="p-3 text-[#007185]">{user.ratingAvg} ★</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
              Configuración general del sistema (En desarrollo)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

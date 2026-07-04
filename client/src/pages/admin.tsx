import { useState, useEffect } from "react";
import { Link } from "wouter";
import { USERS, ITEMS, updateItemImages, getAllItems } from "@/lib/mock-db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, LayoutList, TrendingUp, Settings, ArrowLeft, Lock, Trash2, Ban, Image as ImageIcon, CheckCircle, ShieldAlert, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // State for mocked actions
  const [items, setItems] = useState<any[]>([]);
  
  // Load items on mount
  useEffect(() => {
    setItems(getAllItems());
  }, []);
  const [users, setUsers] = useState([...USERS]);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [newImageUrls, setNewImageUrls] = useState<string>("");
  const [localImages, setLocalImages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar a este usuario de forma permanente?")) {
      setUsers(users.filter(u => u.id !== userId));
      toast({ title: "Usuario eliminado", description: "El usuario ha sido eliminado correctamente", variant: "destructive" });
    }
  };

  const handleSuspendUser = (userId: number) => {
    if (confirm("¿Quieres suspender temporalmente a este usuario?")) {
      const updatedUsers = users.map(u => u.id === userId ? { ...u, verified: false } : u);
      setUsers(updatedUsers);
      toast({ title: "Usuario suspendido", description: "La cuenta del usuario ha sido suspendida." });
    }
  };

  const handleUpdateImage = (itemId: number) => {
    const urlsArray = newImageUrls.split(',').map(url => url.trim()).filter(url => url);
    const allImages = [...urlsArray, ...localImages];
    
    if (allImages.length === 0) {
      toast({ title: "Error", description: "Debes proporcionar al menos una imagen.", variant: "destructive" });
      return;
    }

    // Update global mock DB
    updateItemImages(itemId, allImages);

    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, images: allImages };
      }
      return item;
    });
    
    setItems(updatedItems);
    setEditingItem(null);
    setNewImageUrls("");
    setLocalImages([]);
    toast({ title: "Imágenes actualizadas", description: "Se han actualizado las fotos del anuncio con éxito." });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileReaders = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then(base64Images => {
        setLocalImages(prev => [...prev, ...base64Images]);
        toast({ title: "Imágenes cargadas", description: `${files.length} imagen(es) preparadas para subir.` });
      });
    }
  };

  const handleAddModerator = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Moderador invitado", description: "Se ha enviado una invitación por correo al nuevo moderador." });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <Card className="w-full max-w-md shadow-lg border-gray-200">
          <CardHeader className="text-center space-y-2 pt-8">
            <div className="mx-auto bg-[#f3a847] w-12 h-12 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-2xl font-medium text-gray-900">Acceso Restringido</CardTitle>
            <p className="text-gray-500 text-sm">Panel de Control RentHub</p>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Introduce la contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 text-center text-lg border-gray-300 focus-visible:ring-[#f3a847]"
                />
                {error && <p className="text-[#B12704] text-sm text-center">{error}</p>}
              </div>
              <Button type="submit" className="w-full h-12 bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium border border-[#fcd200] shadow-sm rounded-lg text-base">
                Iniciar Sesión Segura
              </Button>
            </form>
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <Link href="/">
                <a className="text-[#007185] hover:text-[#c45500] hover:underline text-sm flex items-center justify-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Volver a la tienda
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Amazon-style Admin Header */}
      <header className="bg-[#131921] text-white p-4 mb-8 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-xl font-bold text-white hover:text-[#f3a847] transition-colors flex items-center gap-1">
                <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
                <span className="tracking-tight">RentHub <span className="text-xs font-normal align-top opacity-80 text-[#f3a847] ml-1">ADMINISTRADOR</span></span>
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">Hola, Creador</div>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" onClick={() => setIsAuthenticated(false)}>
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 max-w-7xl">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <div className="font-bold text-gray-900 mb-4 px-4 uppercase text-xs tracking-wider">Panel Privado</div>
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
            <LayoutList className="mr-2 h-4 w-4" /> Gestión de Anuncios
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-md ${activeTab === 'users' ? 'bg-[#f3a847]/10 text-[#c45500] font-bold border-l-4 border-[#f3a847]' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="mr-2 h-4 w-4" /> Gestión de Usuarios
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-md ${activeTab === 'team' ? 'bg-[#f3a847]/10 text-[#c45500] font-bold border-l-4 border-[#f3a847]' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('team')}
          >
            <ShieldAlert className="mr-2 h-4 w-4" /> Moderadores / Equipo
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
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-500 text-sm font-medium">Total Usuarios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-medium text-gray-900">{users.length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-500 text-sm font-medium">Anuncios Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-medium text-gray-900">{items.filter(i => i.isActive).length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm rounded-lg border-t-4 border-t-[#f3a847] hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#c45500] text-sm font-medium">Anuncios Patrocinados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-medium text-[#c45500]">{items.filter(i => i.isPromoted).length}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium text-gray-900">Moderar Anuncios y Fotos</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-medium">Anuncio</th>
                      <th className="p-3 font-medium">Propietario</th>
                      <th className="p-3 font-medium">Estado</th>
                      <th className="p-3 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 group">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 border rounded flex items-center justify-center shrink-0">
                              <img src={item.images[0]} alt="" className="max-w-full max-h-full object-cover mix-blend-multiply" />
                            </div>
                            <div>
                              <div className="font-medium text-[#007185] hover:underline cursor-pointer line-clamp-1">{item.titleEs}</div>
                              <div className="text-xs text-gray-500">{item.images.length} imágenes registradas</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{users.find(u => u.id === item.ownerId)?.nameEs || 'N/A'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.isActive ? 'bg-[#e6f4ea] text-[#007600]' : 'bg-red-50 text-[#B12704]'}`}>
                            {item.isActive ? 'Visible' : 'Oculto'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white hover:bg-gray-50 text-xs shadow-sm h-8"
                            onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                          >
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Editar Fotos
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Image Editor Modal/Section */}
              {editingItem && (
                <div className="mt-6 bg-white p-6 rounded-lg border border-[#f3a847] shadow-lg animate-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Actualizar Imágenes del Anuncio #{editingItem}</h3>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingItem(null); setLocalImages([]); setNewImageUrls(""); }}>Cancelar</Button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Puedes subir imágenes desde tu ordenador o pegar URLs. Estas sustituirán a las fotos actuales.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300">
                      <Label className="text-sm font-medium mb-2 block cursor-pointer flex flex-col items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-blue-600 hover:underline">Haz clic para subir imágenes</span>
                        <span className="text-xs text-gray-500 font-normal mt-1">(PNG, JPG)</span>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                      </Label>
                    </div>

                    {localImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {localImages.map((img, i) => (
                          <div key={i} className="relative w-16 h-16 rounded border border-gray-200 overflow-hidden shrink-0">
                            <img src={img} className="w-full h-full object-cover" alt="Subida" />
                            <button 
                              className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center text-xs"
                              onClick={() => setLocalImages(localImages.filter((_, idx) => idx !== i))}
                            >×</button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="flex-1 border-t border-gray-200"></div>
                      <div className="text-xs text-gray-400 font-medium">O USA URLs</div>
                      <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <div>
                      <Label htmlFor="imageUrls" className="text-sm font-medium mb-1 block">URLs de Imágenes (Separadas por comas)</Label>
                      <textarea 
                        id="imageUrls"
                        className="w-full min-h-[80px] p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#f3a847] outline-none text-sm"
                        placeholder="https://ejemplo.com/foto1.jpg, https://ejemplo.com/foto2.jpg..."
                        value={newImageUrls}
                        onChange={(e) => setNewImageUrls(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline" onClick={() => { setEditingItem(null); setLocalImages([]); setNewImageUrls(""); }}>Cancelar</Button>
                      <Button className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium border border-[#fcd200]" onClick={() => handleUpdateImage(editingItem)}>
                        Guardar Imágenes
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Gestión y Castigo de Usuarios</h2>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-medium">Usuario</th>
                      <th className="p-3 font-medium">Estado</th>
                      <th className="p-3 font-medium">Plan</th>
                      <th className="p-3 font-medium text-right">Acciones de Castigo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium text-gray-900">{user.nameEs}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </td>
                        <td className="p-3">
                          {user.verified ? (
                            <span className="flex items-center gap-1 text-[#007600] text-xs font-medium"><CheckCircle className="w-3 h-3" /> Verificado</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[#B12704] text-xs font-medium"><Ban className="w-3 h-3" /> Suspendido</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-xs font-medium border bg-gray-50 border-gray-200">
                            {user.plan}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                              onClick={() => handleSuspendUser(user.id)}
                              disabled={!user.verified}
                              title="Suspender temporalmente"
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Eliminar usuario permanentemente"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Equipo de Moderación</h2>
              <p className="text-gray-500 mb-6">Añade moderadores para ayudarte a revisar anuncios y usuarios. Ellos tendrán acceso a este panel con permisos limitados.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg">Invitar Moderador</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddModerator} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mod-email">Correo Electrónico del Invitado</Label>
                        <Input id="mod-email" type="email" placeholder="ejemplo@renthub.com" required className="focus-visible:ring-[#f3a847]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mod-role">Nivel de Permisos</Label>
                        <select id="mod-role" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[#f3a847] focus:ring-1 focus:ring-[#f3a847] text-sm">
                          <option value="moderator">Moderador Básico (Solo revisar anuncios)</option>
                          <option value="manager">Gestor (Aprobar/Suspender usuarios)</option>
                        </select>
                      </div>
                      <Button type="submit" className="w-full bg-[#f3a847] hover:bg-[#febd69] text-black font-medium border border-[#fcd200]">
                        Enviar Invitación
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg">Equipo Actual</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">SU</div>
                          <div>
                            <div className="font-medium text-sm">SuperUser (Tú)</div>
                            <div className="text-xs text-gray-500">Propietario / Acceso Total</div>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Admin</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">M1</div>
                          <div>
                            <div className="font-medium text-sm">Moderador 1</div>
                            <div className="text-xs text-gray-500">mod1@renthub.com</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">Básico</Badge>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500"><Ban className="h-3 w-3" /></Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
              <Key className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Seguridad y Configuración</h3>
              <p>Opciones de seguridad avanzadas y cambio de contraseña (En desarrollo)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

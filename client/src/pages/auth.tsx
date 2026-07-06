import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Por favor, introduce tu correo y contraseña.", variant: "destructive" });
      return;
    }
    
    // Mock login success
    toast({ title: "Acceso correcto", description: "Has iniciado sesión correctamente." });
    setLocation("/");
  };

  const handleGoogleLogin = () => {
    toast({ title: "Google Login", description: "En un entorno real, esto abriría el inicio de sesión con Google." });
    setTimeout(() => setLocation("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Simple Header */}
      <header className="py-4 border-b border-gray-200 flex justify-center">
        <Link href="/">
          <a className="text-2xl font-bold text-black flex items-center gap-1">
            <span className="bg-[#f3a847] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
            <span className="tracking-tight">RentHub</span>
          </a>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center pt-6 px-4">
        <div className="w-full max-w-[350px]">
          <Card className="border border-gray-300 shadow-none rounded-lg">
            <CardContent className="p-6">
              <h1 className="text-[28px] font-normal text-gray-900 mb-4 leading-tight">
                {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-sm font-bold text-gray-900">Tu nombre</Label>
                    <Input 
                      id="name" 
                      placeholder="Nombre y apellidos" 
                      className="border-gray-400 focus-visible:ring-1 focus-visible:ring-[#e77600] focus-visible:border-[#e77600] rounded-[3px] h-8"
                    />
                  </div>
                )}
                
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-bold text-gray-900">Correo electrónico</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-400 focus-visible:ring-1 focus-visible:ring-[#e77600] focus-visible:border-[#e77600] rounded-[3px] h-8"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-bold text-gray-900">Contraseña</Label>
                    {isLogin && <a href="#" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">¿Has olvidado la contraseña?</a>}
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={!isLogin ? "Al menos 6 caracteres" : ""}
                    className="border-gray-400 focus-visible:ring-1 focus-visible:ring-[#e77600] focus-visible:border-[#e77600] rounded-[3px] h-8"
                  />
                  {!isLogin && <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">La contraseña debe tener al menos 6 caracteres.</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#f3a847] hover:bg-[#febd69] text-black border border-[#a88734] shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] rounded-[3px] font-normal h-8"
                >
                  {isLogin ? 'Continuar' : 'Crear tu cuenta de RentHub'}
                </Button>
              </form>

              <div className="mt-6 text-xs text-gray-600">
                Al continuar, aceptas las <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Condiciones de uso</a> y el <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Aviso de privacidad</a> de RentHub.
              </div>

              {/* Social Login Separator */}
              <div className="relative mt-6 mb-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">¿Tienes una cuenta vinculada?</span>
                </div>
              </div>

              {/* Google Login Button */}
              <Button 
                type="button" 
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm rounded-[3px] font-medium flex items-center justify-center gap-2 h-9"
                onClick={handleGoogleLogin}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Continuar con Google
              </Button>
            </CardContent>
          </Card>

          {/* Toggle Login/Register */}
          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-full mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">
                  {isLogin ? '¿Eres nuevo en RentHub?' : '¿Ya tienes una cuenta?'}
                </span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm rounded-[3px] font-normal h-8"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Crea tu cuenta de RentHub' : 'Iniciar sesión'}
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-8 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 flex flex-col items-center gap-4 text-xs text-[#007185]">
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#c45500] hover:underline">Condiciones de uso</a>
          <a href="#" className="hover:text-[#c45500] hover:underline">Aviso de privacidad</a>
          <a href="#" className="hover:text-[#c45500] hover:underline">Ayuda</a>
        </div>
        <p className="text-gray-500">© 2025 RentHub 2030</p>
      </footer>
    </div>
  );
}

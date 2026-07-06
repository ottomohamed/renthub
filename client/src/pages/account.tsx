import { Link } from "wouter";
import { Package, User, CreditCard, Shield, Settings, Store } from "lucide-react";

export default function Account() {
  return (
    <div className="min-h-screen bg-white font-sans pb-12">
      <header className="bg-[#1B2A41] text-white p-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold flex items-center gap-1 hover:text-[#E85A2A] transition-colors">
            <span className="bg-[#E85A2A] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
            RentHub
          </a>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-normal mb-6">Mi cuenta</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Panel de Ventas */}
          <Link href="/seller-dashboard">
            <a className="border border-gray-300 rounded-lg p-5 flex gap-4 hover:bg-gray-50 transition-colors">
              <div className="mt-1 shrink-0">
                <Store className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-[17px] font-normal text-gray-900 mb-1">Panel de Ventas</h2>
                <p className="text-sm text-gray-500 leading-snug">Gestiona tus anuncios, estadísticas de alquiler y mensajes</p>
              </div>
            </a>
          </Link>

          {/* Mis alquileres */}
          <a href="#" className="border border-gray-300 rounded-lg p-5 flex gap-4 hover:bg-gray-50 transition-colors">
            <div className="mt-1 shrink-0">
              <Package className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[17px] font-normal text-gray-900 mb-1">Mis alquileres</h2>
              <p className="text-sm text-gray-500 leading-snug">Rastrear, devolver o ver alquileres pasados</p>
            </div>
          </a>

          {/* Inicio de sesión y seguridad */}
          <a href="#" className="border border-gray-300 rounded-lg p-5 flex gap-4 hover:bg-gray-50 transition-colors">
            <div className="mt-1 shrink-0">
              <User className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[17px] font-normal text-gray-900 mb-1">Inicio de sesión y seguridad</h2>
              <p className="text-sm text-gray-500 leading-snug">Editar inicio de sesión, nombre y número de teléfono móvil</p>
            </div>
          </a>

          {/* Premium y Pagos */}
          <Link href="/premium">
            <a className="border border-gray-300 rounded-lg p-5 flex gap-4 hover:bg-gray-50 transition-colors">
              <div className="mt-1 shrink-0">
                <CreditCard className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-[17px] font-normal text-gray-900 mb-1">Premium y Pagos</h2>
                <p className="text-sm text-gray-500 leading-snug">Gestionar métodos de pago, facturas y suscripción Premium</p>
              </div>
            </a>
          </Link>

          {/* Protección al usuario */}
          <a href="#" className="border border-gray-300 rounded-lg p-5 flex gap-4 hover:bg-gray-50 transition-colors">
            <div className="mt-1 shrink-0">
              <Shield className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[17px] font-normal text-gray-900 mb-1">Protección y Seguros</h2>
              <p className="text-sm text-gray-500 leading-snug">Centro de reclamaciones, garantías y seguros en alquileres</p>
            </div>
          </a>

          {/* Configuración */}
          <a href="#" className="border border-gray-300 rounded-lg p-5 flex gap-4 hover:bg-gray-50 transition-colors">
            <div className="mt-1 shrink-0">
              <Settings className="w-10 h-10 text-[#2563EB]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-[17px] font-normal text-gray-900 mb-1">Configuración</h2>
              <p className="text-sm text-gray-500 leading-snug">Ajustes de notificaciones y preferencias de la cuenta</p>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ==============================================================================
// 🔴 RentHub 2030 - Mock Database & Logic (Adapted for Frontend)
// ==============================================================================

export interface SubscriptionPlan {
  name: string;
  price: number;
  bumpFrequencyHours: number;
  maxListings: number;
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  'GOLD': { name: 'Oro', price: 59, bumpFrequencyHours: 1, maxListings: Infinity },
  'SILVER': { name: 'Plata', price: 29, bumpFrequencyHours: 12, maxListings: 100 },
  'BRONZE': { name: 'Bronce', price: 9, bumpFrequencyHours: 24, maxListings: 50 }
};

export interface User {
  id: number;
  name: string;
  nameEs: string;
  email: string;
  phoneNumber: string;
  city: string;
  ratingAvg: number;
  totalRatings: number;
  verified: boolean;
  memberSince: string;
  type: 'Owner' | 'Renter'; 
  plan: keyof typeof SUBSCRIPTION_PLANS;
  hasUsedTrial: boolean;
}

export const USERS: User[] = [
  {
    id: 1, name: "أحمد محمد", nameEs: "Constructora Iberia S.L.", email: "info@constructoraiberia.es", phoneNumber: "+34 612 345 678", city: "Madrid", ratingAvg: 4.9, totalRatings: 138, verified: true, memberSince: "2020-01-15",
    type: 'Owner', plan: 'GOLD', hasUsedTrial: false
  },
  {
    id: 2, name: "كارلوس غارسيا", nameEs: "Maquinaria García", email: "alquiler@maquinariagarcia.com", phoneNumber: "+34 623 456 789", city: "Barcelona", ratingAvg: 4.8, totalRatings: 224, verified: true, memberSince: "2019-08-20",
    type: 'Owner', plan: 'SILVER', hasUsedTrial: false
  },
  {
    id: 3, name: "فاطمة العلي", nameEs: "EcoVehículos Levante", email: "contacto@ecovehiculos.es", phoneNumber: "+34 634 567 890", city: "Valencia", ratingAvg: 5.0, totalRatings: 89, verified: true, memberSince: "2023-03-10",
    type: 'Owner', plan: 'BRONZE', hasUsedTrial: true
  },
  {
    id: 4, name: "خوان رودريغيز", nameEs: "Alquileres Sur", email: "juan@alquileressur.es", phoneNumber: "+34 645 678 901", city: "Sevilla", ratingAvg: 4.7, totalRatings: 156, verified: true, memberSince: "2021-11-05",
    type: 'Owner', plan: 'BRONZE', hasUsedTrial: false
  }
];

export interface Item {
  id: number;
  ownerId: number;
  title: string;
  titleEs: string;
  description: string;
  features: string[];
  category: string;
  pricePerDay: number;
  currency: string;
  city: string;
  country: string;
  available: boolean;
  images: string[];
  rating: number;
  totalReviews: number;
  badge?: { es: string };
  isPromoted?: boolean;
  specifications?: Record<string, string>;
  lastBumpTime: Date;
  isActive: boolean;
  trialEndsOn: Date | null;
}

export const ITEMS: Item[] = [
  {
    id: 1, ownerId: 1, title: "جرار زراعي John Deere 5075E", titleEs: "Tractor Agrícola John Deere 5075E con Cabina Climatizada y Pala Cargadora", 
    description: "Tractor agrícola de alto rendimiento John Deere 5075E del año 2023. Equipado con motor diésel PowerTech de 3 cilindros y 75 CV, ofrece una potencia fiable y una eficiencia de combustible excepcional para todo tipo de labores agrícolas.\n\nEste modelo incluye una cabina premium totalmente climatizada con visión panorámica 360º, asiento neumático ajustable y controles ergonómicos que reducen la fatiga del operador durante largas jornadas de trabajo.\n\nEl alquiler incluye pala cargadora frontal original John Deere con capacidad de elevación de 1.200 kg y enganche rápido para implementos. El tractor se entrega con el depósito lleno, revisión completa de mantenimiento preventivo al día y seguro a todo riesgo con franquicia de 500€.", 
    features: [
      "Motor PowerTech 3 cilindros turboalimentado de 75 CV",
      "Transmisión SyncReverser 9F/3R para cambios suaves",
      "Toma de fuerza (TDF) independiente de 540 rpm",
      "Capacidad de elevación hidráulica trasera de 1.800 kg",
      "Cabina insonorizada con aire acondicionado y calefacción",
      "Luces de trabajo LED perimetrales para trabajo nocturno"
    ],
    category: "heavy", pricePerDay: 250, currency: "€", city: "Madrid", country: "España", available: true, 
    images: [
      "https://images.unsplash.com/photo-1592652431671-faebef7eece1?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592652433022-774f76269966?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530267981375-27347747084d?q=80&w=2960&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625244588975-f938d2ef79a6?q=80&w=2940&auto=format&fit=crop"
    ], 
    rating: 4.9, totalReviews: 38, badge: { es: "Más solicitado" }, isPromoted: true, 
    specifications: { "Potencia": "75 CV", "Tracción": "4x4 (Doble Tracción)", "Peso operativo": "3.200 kg", "Capacidad Combustible": "82 Litros", "Año de fabricación": "2023" },
    lastBumpTime: new Date(Date.now() - 3600000 * 2), isActive: true, trialEndsOn: null
  },
  {
    id: 5, ownerId: 1, title: "حفارة كاتربيلر", titleEs: "Excavadora de Orugas Caterpillar 320 Next Gen - 22 Toneladas", 
    description: "Excavadora de orugas Caterpillar 320 de nueva generación, ideal para proyectos exigentes de movimiento de tierras, zanjeo y demolición ligera. Este equipo ofrece el mayor nivel de tecnología integrada de fábrica en la industria.\n\nGracias a su sistema electrohidráulico avanzado, la Cat 320 consume hasta un 25% menos de combustible que los modelos anteriores, manteniendo la misma potencia de excavación. Incluye sistemas Cat Grade con 2D, Grade Assist y Payload, mejorando la eficiencia del operador hasta en un 45%.\n\nEl precio de alquiler incluye cazo de excavación estándar de 1,19 m³. Disponibilidad de accesorios adicionales (martillo hidráulico, cazo de limpieza) bajo presupuesto. Requiere fianza de 1.500€ y certificación de operador de maquinaria pesada.", 
    features: [
      "Motor Cat C4.4 ACERT con sistema de gestión de potencia",
      "Profundidad máxima de excavación de 6.720 mm",
      "Alcance máximo a nivel del suelo de 9.860 mm",
      "Tecnología Cat Payload para pesaje preciso sobre la marcha",
      "Cámaras de visión trasera y lateral derecha integradas",
      "Mantenimiento simplificado y seguro a nivel del suelo"
    ],
    category: "heavy", pricePerDay: 450, currency: "€", city: "Madrid", country: "España", available: true, 
    images: [
      "https://images.unsplash.com/photo-1579625345717-380d19973809?q=80&w=2960&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587843181822-79374092b7de?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541604558229-450f38b29239?q=80&w=2938&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503389025983-6f4520efdb34?q=80&w=2960&auto=format&fit=crop"
    ], 
    rating: 5.0, totalReviews: 52, badge: { es: "Anuncio Patrocinado" }, isPromoted: true, 
    specifications: { "Peso Operativo": "22.500 kg", "Potencia Neta": "159 CV", "Prof. Excavación": "6.72 m", "Capacidad Cazo": "1.19 m³", "Ancho de Orugas": "600 mm" },
    lastBumpTime: new Date(Date.now() - 3600000 * 0.5), isActive: true, trialEndsOn: null
  },
  {
    id: 6, ownerId: 2, title: "شاحنة مرسيدس", titleEs: "Camión Volquete Mercedes-Benz Arocs 3343 K 6x4 para Construcción", 
    description: "Impresionante camión volquete Mercedes-Benz Arocs 3343 K con tracción 6x4, diseñado específicamente para soportar las condiciones más duras en obras y canteras. Vehículo robusto, fiable y con una excelente capacidad de carga.\n\nEquipado con caja basculante Meiller-Kipper de acero de alta resistencia (Hardox), ideal para el transporte de áridos, escombros, asfalto y tierra. Cuenta con suspensión reforzada para terrenos irregulares y sistema de frenado avanzado con freno motor de alto rendimiento.\n\nLa cabina ClassicSpace ofrece confort durante todo el día, aire acondicionado y asiento con suspensión neumática. El alquiler requiere carnet C+E y tarjeta CAP en vigor. Límite de kilometraje: 200 km/día (0,35€/km adicional).", 
    features: [
      "Motor OM 470 de 10,7 litros con 428 CV de potencia",
      "Caja de cambios automatizada PowerShift 3 con modo off-road",
      "Tracción 6x4 con bloqueos de diferencial transversal y longitudinal",
      "Caja basculante Meiller de 14 metros cúbicos de capacidad",
      "Sistema de frenado electrónico EBS con ABS y ASR",
      "Ejes de reducción de cubos para máxima distancia al suelo"
    ],
    category: "heavy", pricePerDay: 350, currency: "€", city: "Valencia", country: "España", available: true, 
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2970&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555626343-42e72449195b?q=80&w=2942&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601002245229-3738e4a9058b?q=80&w=2970&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596773335503-4903cbaf99d4?q=80&w=2940&auto=format&fit=crop"
    ], 
    rating: 4.6, totalReviews: 24, badge: { es: "Alta Capacidad" }, isPromoted: true, 
    specifications: { "Carga Útil": "18.000 kg", "P.M.A.": "33.000 kg", "Tracción": "6x4", "Caja": "Volquete Basculante", "Combustible": "Diésel Euro VI" },
    lastBumpTime: new Date(Date.now() - 3600000 * 5), isActive: true, trialEndsOn: null
  },
  {
    id: 8, ownerId: 4, title: "جرافة لودر", titleEs: "Pala Cargadora Articulada Volvo 944K - 15 Toneladas", 
    description: "Pala cargadora de ruedas Volvo 944K, la máquina perfecta para operaciones de carga rápida, movimiento de materiales en plantas de áridos y trabajos pesados en obras de infraestructura. Combina potencia bruta con control de precisión.\n\nSu diseño de chasis articulado y dirección sensible a la carga proporcionan una excelente maniobrabilidad en espacios reducidos. Incorpora un sistema cinemático en Z que ofrece una enorme fuerza de arranque constante en todo el recorrido de elevación.\n\nIncluye cuchara estándar con cuchilla empernable. Alquiler mínimo de 3 días. Incluye mantenimiento preventivo y servicio de asistencia en obra 24/7 en un radio de 100km desde Sevilla.", 
    features: [
      "Motor Volvo de bajas emisiones con alto par a bajas revoluciones",
      "Transmisión Power Shift con cambios suaves bajo carga",
      "Cinemática TP (Torque Parallel) exclusiva de Volvo",
      "Cabina Care Cab con filtración de aire y excelente visibilidad",
      "Sistema hidráulico sensible a la carga para mayor precisión",
      "Ejes de servicio pesado con refrigeración por circulación de aceite"
    ],
    category: "heavy", pricePerDay: 320, currency: "€", city: "Sevilla", country: "España", available: true, 
    images: [
      "https://images.unsplash.com/photo-1582213768783-6c7104b281f6?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533083652877-3e81cb89ff1c?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588610543666-57da16d97157?q=80&w=2940&auto=format&fit=crop"
    ], 
    rating: 4.8, totalReviews: 18, badge: { es: "Novedad" }, isPromoted: false, 
    specifications: { "Peso Operativo": "15.500 kg", "Carga Estática": "10.200 kg", "Capacidad Cuchara": "2.6 m³ - 8 m³", "Potencia": "165 CV", "Fuerza de Arranque": "119 kN" },
    lastBumpTime: new Date(Date.now() - 3600000 * 12), isActive: true, trialEndsOn: null
  }
];

// 4. منطق الـ BUMP SYSTEM والإيقاف التلقائي
export function runScheduledBumps() {
  const currentTime = Date.now();
  ITEMS.forEach(item => {
    if (!item.isActive) return;

    if (item.trialEndsOn && currentTime >= item.trialEndsOn.getTime()) {
      item.isActive = false;
      item.trialEndsOn = null;
      return;
    }

    const user = USERS.find(u => u.id === item.ownerId);
    if (!user || user.type !== 'Owner' || !user.plan) return;
    const plan = SUBSCRIPTION_PLANS[user.plan];
    if (!plan) return;
    
    const bumpIntervalMs = plan.bumpFrequencyHours * 60 * 60 * 1000;

    if (currentTime >= item.lastBumpTime.getTime() + bumpIntervalMs) {
      item.lastBumpTime = new Date(currentTime);
    }
  });
}

// 6. دوال البحث والفلترة
export function searchItems(query: string = "", city: string = "") {
  query = query.toLowerCase().trim();
  city = city.toLowerCase().trim();

  let results = ITEMS.filter(item => {
    const titleMatch = (item.title && item.title.toLowerCase().includes(query)) ||
      (item.titleEs && item.titleEs.toLowerCase().includes(query));

    const matchesQuery = query === "" || titleMatch || (item.category && item.category.toLowerCase().includes(query));
    const matchesCity = city === "" || (item.city && item.city.toLowerCase().includes(city));

    return matchesQuery && matchesCity && item.available && item.isActive;
  });

  results.sort((a, b) => b.lastBumpTime.getTime() - a.lastBumpTime.getTime());

  return results;
}

// 7. دوال جلب البيانات المفردة
export function getItemById(itemId: number | string) {
  return ITEMS.find(item => item.id === parseInt(itemId.toString())) || null;
}

export function getUserById(userId: number | string) {
  return USERS.find(user => user.id === parseInt(userId.toString())) || null;
}

// Run scheduled bumps immediately on load (simulating backend process)
runScheduledBumps();

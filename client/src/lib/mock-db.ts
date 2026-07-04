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
    id: 1, name: "أحمد محمد", nameEs: "Ahmed Mohamed", email: "ahmed@rh.com", phoneNumber: "+34 612 345 678", city: "Madrid", ratingAvg: 4.9, totalRatings: 38, verified: true, memberSince: "2023-01-15",
    type: 'Owner', plan: 'GOLD', hasUsedTrial: false
  },
  {
    id: 2, name: "كارلوس غارسيا", nameEs: "Carlos García", email: "carlos@rh.com", phoneNumber: "+34 623 456 789", city: "Barcelona", ratingAvg: 4.8, totalRatings: 124, verified: true, memberSince: "2022-08-20",
    type: 'Owner', plan: 'SILVER', hasUsedTrial: false
  },
  {
    id: 3, name: "فاطمة العلي", nameEs: "Fatima Al-Ali", email: "fatima@rh.com", phoneNumber: "+34 634 567 890", city: "Valencia", ratingAvg: 5.0, totalRatings: 89, verified: true, memberSince: "2023-03-10",
    type: 'Owner', plan: 'BRONZE', hasUsedTrial: true
  },
  {
    id: 4, name: "خوان رودريغيز", nameEs: "Juan Rodríguez", email: "juan@rh.com", phoneNumber: "+34 645 678 901", city: "Sevilla", ratingAvg: 4.7, totalRatings: 56, verified: true, memberSince: "2022-11-05",
    type: 'Owner', plan: 'BRONZE', hasUsedTrial: false
  }
];

export interface Item {
  id: number;
  ownerId: number;
  title: string;
  titleEs: string;
  description: string;
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
  specifications?: Record<string, string>;
  lastBumpTime: Date;
  isActive: boolean;
  trialEndsOn: Date | null;
}

export const ITEMS: Item[] = [
  {
    id: 1, ownerId: 1, title: "جرار زراعي John Deere 5075E", titleEs: "Tractor Agrícola John Deere 5075E", description: "Potente tractor agrícola de John Deere, ideal para terrenos extensos...", category: "heavy", pricePerDay: 250, currency: "€", city: "Madrid", country: "España", available: true, images: ["https://images.unsplash.com/photo-1530267981375-27347747084d?q=80&w=2960&auto=format&fit=crop"], rating: 4.9, totalReviews: 38, badge: { es: "Más solicitado" }, specifications: { power: "75 HP" },
    lastBumpTime: new Date(Date.now() - 3600000 * 2), isActive: true, trialEndsOn: null
  },
  {
    id: 2, ownerId: 2, title: "مثقاب كهربائي Bosch Professional GSB 18V", titleEs: "Taladro Eléctrico Bosch Professional GSB 18V", description: "Taladro profesional Bosch 18V, ideal para todo tipo de perforaciones...", category: "tools", pricePerDay: 15, currency: "€", city: "Barcelona", country: "España", available: true, images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2978&auto=format&fit=crop"], rating: 4.8, totalReviews: 124, badge: { es: "Recomendado" },
    lastBumpTime: new Date(Date.now() - 3600000 * 25), isActive: true, trialEndsOn: null
  },
  {
    id: 3, ownerId: 3, title: "Tesla Model 3 Long Range 2023", titleEs: "Tesla Model 3 Long Range 2023", description: "Vehículo eléctrico premium Tesla Model 3 (2023). Hasta 580 km de autonomía, conducción autónoma...", category: "car", pricePerDay: 80, currency: "€", city: "Valencia", country: "España", available: true, images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2971&auto=format&fit=crop"], rating: 5.0, totalReviews: 89, badge: { es: "Nuevo" }, specifications: { range: "580km" },
    lastBumpTime: new Date(Date.now() - 3600000 * 1), isActive: true, trialEndsOn: null
  },
  {
    id: 4, ownerId: 4, title: "خيمة احترافية للمناسبات 10x10 متر", titleEs: "Carpa Profesional para Eventos 10x10 metros", description: "Carpa profesional grande, perfecta para bodas y eventos especiales...", category: "events", pricePerDay: 120, currency: "€", city: "Sevilla", country: "España", available: true, images: ["https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2970&auto=format&fit=crop"], rating: 4.7, totalReviews: 56, badge: { es: "Oferta especial" }, specifications: { size: "10x10m" },
    lastBumpTime: new Date(Date.now() - 3600000 * 10), isActive: true, trialEndsOn: null
  },
  // إعلان تجريبي
  {
    id: 5, ownerId: 4, title: "رافع كهربائي صغير (تجريبي)", titleEs: "Mini Elevador Eléctrico (Prueba)", description: "Elevador eléctrico ideal para mantenimiento del hogar...", category: "tools", pricePerDay: 40, currency: "€", city: "Sevilla", country: "España", available: true, images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2970&auto=format&fit=crop"], rating: 4.5, totalReviews: 0, badge: { es: "Prueba" }, specifications: { power: "2KW", height: "3m" },
    lastBumpTime: new Date(), isActive: true,
    trialEndsOn: new Date(Date.now() + 3600000 * 0.5)
  }
];

// 4. منطق الـ BUMP SYSTEM والإيقاف التلقائي
export function runScheduledBumps() {
  const currentTime = Date.now();
  ITEMS.forEach(item => {
    if (!item.isActive) return;

    // 1. التحقق من انتهاء الفترة التجريبية
    if (item.trialEndsOn && currentTime >= item.trialEndsOn.getTime()) {
      item.isActive = false;
      item.trialEndsOn = null;
      return;
    }

    // 2. تطبيق Bump
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
    // نستخدم العنوان العربي والإنجليزي للبحث
    const titleMatch = (item.title && item.title.toLowerCase().includes(query)) ||
      (item.titleEs && item.titleEs.toLowerCase().includes(query));

    const matchesQuery = query === "" || titleMatch || (item.category && item.category.toLowerCase().includes(query));
    const matchesCity = city === "" || (item.city && item.city.toLowerCase().includes(city));

    return matchesQuery && matchesCity && item.available && item.isActive;
  });

  // الفرز حسب أولوية الـ Bump (الأحدث رفعاً يظهر أولاً)
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

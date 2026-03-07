import  type{ Order, ServedOrder } from "./types";

export const initialOrders: Order[] = [
  {
    id: 1, table: 4, pax: 2, waiter: "Marco L.", time: 5, status: "pending", notes: null, delayed: false,
    items: [
      { name: "Bruschetta de Tomate",    qty: 2, emoji: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80", status: "pending",  price: 5  },
      { name: "Filete de Res",           qty: 2, emoji: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80",    status: "pending",  price: 45 },
      { name: "Tiramisú Clásico",        qty: 2, emoji: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80", status: "pending" ,  price: 6},
      { name: "Vino Tinto Chianti",      qty: 2, emoji: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80", status: "pending" ,  price: 8 },
    ],
  },
  {
    id: 2, table: 2, pax: 3, waiter: "Sofía M.", time: 22, status: "preparing",
    notes: "Sin gluten en la pasta, por favor.", delayed: false,
    items: [
      { name: "Risotto de Champiñones",  qty: 2, emoji: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", status: "ready",  price: 56  },
      { name: "Burrata con Tomates",     qty: 1, emoji: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80", status: "served",  price: 6 },
      { name: "Vino Tinto Chianti",      qty: 3, emoji: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80", status: "served",  price: 9 },
    ],
  },
  {
    id: 3, table: 11, pax: 2, waiter: "Marco L.", time: 15, status: "preparing", notes: null, delayed: false,
    items: [
      { name: "Bruschetta de Tomate",    qty: 1, emoji: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80", status: "served",  price: 43  },
      { name: "Lubina al Horno",         qty: 1, emoji: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80", status: "preparing",  price: 52  },
      { name: "Risotto de Champiñones",  qty: 1, emoji: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", status: "preparing" ,  price: 43 },
      { name: "Agua Mineral",            qty: 2, emoji: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",    status: "served",  price: 23 },
    ],
  },
  {
    id: 4, table: 6, pax: 5, waiter: "Elena R.", time: 45, status: "ready", delayed: true,
    notes: "Alergia a los frutos secos. Mesa de cumpleaños.",
    items: [
      { name: "Pappardelle con Jabalí",      qty: 2, emoji: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80", status: "ready",  price: 42   },
      { name: "Lubina al Horno",             qty: 2, emoji: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80", status: "ready", price: 48   },
      { name: "Agua Mineral",                qty: 5, emoji: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",    status: "served", price: 15  },
    ],
  },
];
export const servedOrdersData: ServedOrder[] = [
  { id: 5, table: 8, waiter: "Sofía M.", status: "served" },
];

export const statusConfig: Record<string, { label: string; color: string; bg: string; text: string }> = {
  pending:   { label: "Pendiente",  color: "#f59e0b", bg: "#fef3c7", text: "#92400e" },
  preparing: { label: "Preparando", color: "#3b82f6", bg: "#dbeafe", text: "#1e40af" },
  ready:     { label: "Listo",      color: "#10b981", bg: "#d1fae5", text: "#065f46" },
  served:    { label: "Servido",    color: "#6b7280", bg: "#f3f4f6", text: "#374151" },
};

export const columnConfig: Record<string, { label: string; bg: string; border: string; headerColor: string }> = {
  pending:   { label: "Pendientes",         bg: "#fffbeb", border: "#f59e0b", headerColor: "#92400e" },
  preparing: { label: "En preparación",     bg: "#fff7ed", border: "#f97316", headerColor: "#9a3412" },
  ready:     { label: "Listos para servir", bg: "#f0fdf4", border: "#10b981", headerColor: "#065f46" },
};

// data.ts

export interface MenuItem {
  id: number;
  name: string;
  emoji: string;
  category: "entrada" | "principal" | "postre" | "bebida";
  price: number;
}

export const menu: MenuItem[] = [
  // Entradas
  { id: 1,  name: "Bruschetta de Tomate",        emoji: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80", category: "entrada",   price: 8.50  },
  
  { id: 3,  name: "Carpaccio de Res",            emoji: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80", category: "entrada",   price: 13.50 },
  { id: 4,  name: "Ensalada Caprese",            emoji: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80", category: "entrada",   price: 9.50  },
  { id: 5,  name: "Pan de Ajo",                  emoji: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600&q=80", category: "entrada",   price: 6.00  },
  { id: 6,  name: "Sopa Minestrone",             emoji: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", category: "entrada",   price: 7.50  },

  // Principales
  { id: 7,  name: "Filete de Res",               emoji: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", category: "principal", price: 28.00 },
  { id: 8,  name: "Risotto de Champiñones",      emoji: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", category: "principal", price: 18.00 },
  { id: 9,  name: "Lubina al Horno",             emoji: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80", category: "principal", price: 24.00 },
  { id: 10, name: "Pappardelle con Jabalí",      emoji: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80", category: "principal", price: 21.00 },
  
  { id: 12, name: "Lasagna Tradicional",         emoji: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80", category: "principal", price: 19.00 },
  { id: 13, name: "Pizza Margarita",             emoji: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80", category: "principal", price: 16.00 },
  { id: 14, name: "Pizza Cuatro Quesos",         emoji: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", category: "principal", price: 18.50 },
  { id: 15, name: "Pasta Carbonara",             emoji: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80", category: "principal", price: 17.50 },
  { id: 16, name: "Risotto de Mariscos",         emoji: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80", category: "principal", price: 23.00 },

  // Postres
  { id: 17, name: "Tiramisú Clásico",            emoji: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80", category: "postre",    price: 7.50  },
  { id: 18, name: "Panna Cotta de Frutos Rojos", emoji: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", category: "postre",    price: 8.50  },
  { id: 19, name: "Gelato de Vainilla",          emoji: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80", category: "postre",    price: 6.50  },
  { id: 20, name: "Tarta de Chocolate",          emoji: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", category: "postre",    price: 7.00  },

  // Bebidas
  { id: 21, name: "Vino Tinto Chianti (copa)",   emoji: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80", category: "bebida",    price: 6.00  },
  { id: 22, name: "Vino Blanco (copa)",          emoji: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", category: "bebida",    price: 6.50  },
  { id: 23, name: "Agua Mineral",                emoji: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80", category: "bebida",    price: 3.00  },
  { id: 24, name: "Agua con Gas",                emoji: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=600&q=80", category: "bebida",    price: 3.50  },
  { id: 25, name: "Coca Cola",                   emoji: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80", category: "bebida",    price: 3.00  },
  { id: 26, name: "Cerveza Artesanal",           emoji: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80", category: "bebida",    price: 5.50  },
];
import  type{ Order, ServedOrder } from "./types";

export const initialOrders: Order[] = [
  {
    id: 1, table: 4, pax: 2, waiter: "Marco L.", time: 5, status: "pending", notes: null, delayed: false,
    items: [
      { name: "Bruschetta de Tomate", qty: 2, emoji: "🥖", status: "pending" },
      { name: "Filete de Res", qty: 2, emoji: "🥩", status: "pending" },
      { name: "Tiramisú Clásico", qty: 2, emoji: "☕", status: "pending" },
      { name: "Vino Tinto Chianti (copa)", qty: 2, emoji: "🍷", status: "pending" },
    ],
  },
  {
    id: 2, table: 2, pax: 3, waiter: "Sofía M.", time: 22, status: "preparing",
    notes: "Sin gluten en la pasta, por favor.", delayed: false,
    items: [
      { name: "Risotto de Champiñones", qty: 2, emoji: "🍄", status: "ready" },
      { name: "Burrata con Tomates", qty: 1, emoji: "🧀", status: "served" },
      { name: "Vino Tinto Chianti (copa)", qty: 3, emoji: "🍷", status: "served" },
    ],
  },
  {
    id: 3, table: 11, pax: 2, waiter: "Marco L.", time: 15, status: "preparing", notes: null, delayed: false,
    items: [
      { name: "Bruschetta de Tomate", qty: 1, emoji: "🥖", status: "served" },
      { name: "Lubina al Horno", qty: 1, emoji: "🐟", status: "preparing" },
      { name: "Risotto de Champiñones", qty: 1, emoji: "🍄", status: "preparing" },
      { name: "Agua Mineral", qty: 2, emoji: "💧", status: "served" },
    ],
  },
  {
    id: 4, table: 6, pax: 5, waiter: "Elena R.", time: 45, status: "ready", delayed: true,
    notes: "Alergia a los frutos secos. Mesa de cumpleaños.",
    items: [
      { name: "Pappardelle con Jabalí", qty: 2, emoji: "🍝", status: "ready", price: 42 },
      { name: "Lubina al Horno", qty: 2, emoji: "🐟", status: "ready", price: 48 },
      { name: "Pollo a la Cazadora", qty: 1, emoji: "🍗", status: "ready", price: 22 },
      { name: "Panna Cotta de Frutos Rojos", qty: 3, emoji: "🍮", status: "ready", price: 25.5 },
      { name: "Agua Mineral", qty: 5, emoji: "💧", status: "served", price: 15 },
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
  { id: 1,  name: "Bruschetta de Tomate",        emoji: "🥖", category: "entrada",   price: 8.50  },
  { id: 2,  name: "Burrata con Tomates",         emoji: "🧀", category: "entrada",   price: 12.00 },
  { id: 3,  name: "Carpaccio de Res",            emoji: "🥩", category: "entrada",   price: 13.50 },
  { id: 4,  name: "Ensalada Caprese",            emoji: "🥗", category: "entrada",   price: 9.50  },
  { id: 5,  name: "Pan de Ajo",                  emoji: "🥖", category: "entrada",   price: 6.00  },
  { id: 6,  name: "Sopa Minestrone",             emoji: "🍲", category: "entrada",   price: 7.50  },

  // Principales
  { id: 7,  name: "Filete de Res",                emoji: "🥩", category: "principal", price: 28.00 },
  { id: 8,  name: "Risotto de Champiñones",      emoji: "🍄", category: "principal", price: 18.00 },
  { id: 9,  name: "Lubina al Horno",             emoji: "🐟", category: "principal", price: 24.00 },
  { id: 10, name: "Pappardelle con Jabalí",      emoji: "🍝", category: "principal", price: 21.00 },
  { id: 11, name: "Pollo a la Cazadora",         emoji: "🍗", category: "principal", price: 22.00 },
  { id: 12, name: "Lasagna Tradicional",         emoji: "🍝", category: "principal", price: 19.00 },
  { id: 13, name: "Pizza Margarita",             emoji: "🍕", category: "principal", price: 16.00 },
  { id: 14, name: "Pizza Cuatro Quesos",         emoji: "🍕", category: "principal", price: 18.50 },
  { id: 15, name: "Pasta Carbonara",             emoji: "🍝", category: "principal", price: 17.50 },
  { id: 16, name: "Risotto de Mariscos",         emoji: "🍤", category: "principal", price: 23.00 },

  // Postres
  { id: 17, name: "Tiramisú Clásico",            emoji: "☕", category: "postre",    price: 7.50  },
  { id: 18, name: "Panna Cotta de Frutos Rojos", emoji: "🍮", category: "postre",    price: 8.50  },
  { id: 19, name: "Gelato de Vainilla",          emoji: "🍨", category: "postre",    price: 6.50  },
  { id: 20, name: "Tarta de Chocolate",          emoji: "🍰", category: "postre",    price: 7.00  },

  // Bebidas
  { id: 21, name: "Vino Tinto Chianti (copa)",   emoji: "🍷", category: "bebida",    price: 6.00  },
  { id: 22, name: "Vino Blanco (copa)",          emoji: "🥂", category: "bebida",    price: 6.50  },
  { id: 23, name: "Agua Mineral",                emoji: "💧", category: "bebida",    price: 3.00  },
  { id: 24, name: "Agua con Gas",                emoji: "💧", category: "bebida",    price: 3.50  },
  { id: 25, name: "Coca Cola",                   emoji: "🥤", category: "bebida",    price: 3.00  },
  { id: 26, name: "Cerveza Artesanal",           emoji: "🍺", category: "bebida",    price: 5.50  },
];
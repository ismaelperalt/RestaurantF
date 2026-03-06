export interface OrderItem {
  name: string;
  qty: number;
  emoji: string;
  status: "pending" | "preparing" | "ready" | "served";
  price?: number;
  allergyNote?: string; // ← comentario por plato, ej: "sin nueces"
}

export interface Order {
  id: number;
  table: number;
  pax: number;
  waiter: string;
  time: number;
  status: "pending" | "preparing" | "ready" | "served";
  delayed?: boolean;
  notes: string | null;
  items: OrderItem[];
}

export interface ServedOrder {
  id: number;
  table: number;
  waiter: string;
  status: string;
}

export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  text: string;
}

export interface ColumnConfig {
  label: string;
  bg: string;
  border: string;
  headerColor: string;
}




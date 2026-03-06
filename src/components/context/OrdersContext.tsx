import  { createContext, useContext, useState } from "react";
import type {ReactNode} from 'react';
import type{ Order, ServedOrder, OrderItem } from "../../types/types";
import { initialOrders, servedOrdersData } from "../../types/data";

interface OrdersContextType {
  orders: Order[];
  served: ServedOrder[];
  addOrder: (data: {
    table: string; pax: string; waiter: string;
    notes: string; items: OrderItem[];
  }) => void;
  advanceOrder: (id: number) => void;
  changeItemStatus: (orderId: number, itemIndex: number, newStatus: OrderItem["status"]) => void;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

const nextStatus: Record<string, string> = {
  pending: "preparing", preparing: "ready", ready: "served",
};

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [served, setServed] = useState<ServedOrder[]>(servedOrdersData);

  const addOrder = (data: {
    table: string; pax: string; waiter: string; notes: string; items: OrderItem[];
  }) => {
    const order: Order = {
      id: Date.now(),
      table: parseInt(data.table),
      pax: parseInt(data.pax),
      waiter: data.waiter,
      time: 0,
      status: "pending",
      notes: data.notes || null,
      delayed: false,
      items: data.items,
    };
    setOrders((prev) => [...prev, order]);
  };

 const advanceOrder = (id: number) => {
  setOrders((prev) => {
    const order = prev.find((o) => o.id === id);
    if (!order) return prev;

    const ns = nextStatus[order.status] as Order["status"]; // ← cast aquí

    if (ns === "served") {
      setServed((s) => {
        const alreadyExists = s.some((o) => o.id === id);
        if (alreadyExists) return s;
        return [...s, {
          id: order.id,
          table: order.table,
          waiter: order.waiter,
          status: "served" as const, // ← cast aquí también
        }];
      });
      return prev.filter((o) => o.id !== id);
    }

    return prev.map((o) =>
      o.id === id ? { ...o, status: ns } : o
    );
  });
};
  const changeItemStatus = (
    orderId: number, itemIndex: number, newStatus: OrderItem["status"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updatedItems = o.items.map((item, i) =>
          i === itemIndex ? { ...item, status: newStatus } : item
        );
        return { ...o, items: updatedItems };
      })
    );
  };

  return (
    <OrdersContext.Provider value={{
      orders, served, addOrder, advanceOrder, changeItemStatus,
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de OrdersProvider");
  return ctx;
}
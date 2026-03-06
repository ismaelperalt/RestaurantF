import { useState } from "react";
import { initialOrders, servedOrdersData } from "../../types/data";
import type{ Order, ServedOrder,OrderItem } from "../../types/types";
import Header from "../../components/pedido/Header";
import Column from "../../components/pedido/Column";
import ServedToday from "../../components/pedido/ServedToday";
import NewOrderModal from "../../components/pedido/NewOrderModel";

const nextStatus: Record<string, string> = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
};


export default function Principal() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [served, setServed] = useState<ServedOrder[]>(servedOrdersData);
  const [showModal, setShowModal] = useState(false);

  const handleAction = (id: number) => {
    setOrders((prev) => {
      const updated = prev.map((o) => {
        if (o.id !== id) return o;
        const ns = nextStatus[o.status];
        if (ns === "served") return null;
        return { ...o, status: ns };
      });
      const removed = prev.find((o) => o.id === id);
      if (removed && nextStatus[removed.status] === "served") {
        setServed((s) => [
          ...s,
          { id: removed.id, table: removed.table, waiter: removed.waiter, status: "served" },
        ]);
      }
      return updated.filter(Boolean) as Order[];
    });
  };

// Agrega esta función junto a handleAction
const handleItemStatusChange = (
  orderId: number,
  itemIndex: number,
  newStatus: OrderItem["status"]
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
  const handleAddOrder = (newOrder: { table: string; pax: string; waiter: string; notes: string,items: OrderItem[] }) => {
    const order: Order = {
      id: Date.now(),
      table: parseInt(newOrder.table),
      pax: parseInt(newOrder.pax),
      waiter: newOrder.waiter,
      time: 0,
      status: "pending",
      notes: newOrder.notes || null,
      delayed: false,
      items: newOrder.items,
    };
    setOrders((prev) => [...prev, order]);
    setShowModal(false);
  };

  const columns: Array<"pending" | "preparing" | "ready"> = ["pending", "preparing", "ready"];

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      <Header activeCount={orders.length} onNewOrder={() => setShowModal(true)} />
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {columns.map((status) => (
            <Column
              key={status}
              status={status}
              orders={orders.filter((o) => o.status === status)}
              onAction={handleAction}
              onItemStatusChange={handleItemStatusChange}
              
            />
          ))}
        </div>
        <ServedToday served={served} />
      </div>
      {showModal && (
        <NewOrderModal onClose={() => setShowModal(false)} onSubmit={handleAddOrder} />
      )}
    </div>
  );
}

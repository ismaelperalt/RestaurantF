import { useState } from "react";
import { useOrders } from "../../components/context/OrdersContext";
import type { Order, OrderItem } from "../../types/types";
import Header from "../../components/pedido/Header";
import Column from "../../components/pedido/Column";
import ServedToday from "../../components/pedido/ServedToday";
import NewOrderModal from "../../components/pedido/NewOrderModel";
import OrderDetailModal from "../../components/pedido/OrderDetailModal";

export default function Principal() {
  const { orders, served, addOrder, advanceOrder, changeItemStatus, addItemsToOrder } = useOrders();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleAddItems = (orderId: number, newItems: OrderItem[]) => {
    addItemsToOrder(orderId, newItems);
  };

  const columns: Array<"pending" | "preparing" | "ready"> = ["pending", "preparing", "ready"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      overflowX: "hidden", // evita scroll horizontal
      boxSizing: "border-box",
    }}>
      <Header activeCount={orders.length} onNewOrder={() => setShowModal(true)} />

      <div style={{ padding: "24px 16px", boxSizing: "border-box" }}>
        <div className="columns-grid">
          {columns.map((status) => (
            <Column
              key={status}
              status={status}
              orders={orders.filter((o) => o.status === status)}
              onAction={advanceOrder}
              onItemStatusChange={changeItemStatus}
              onCardClick={(order) => setSelectedOrder(order)}
            />
          ))}
        </div>
        <ServedToday served={served} />
      </div>

      {showModal && (
        <NewOrderModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => { addOrder(data); setShowModal(false); }}
        />
      )}

      {selectedOrder && (() => {
        const liveOrder = orders.find((o) => o.id === selectedOrder.id);
        if (!liveOrder) return null;
        return (
          <OrderDetailModal
            order={liveOrder}
            onClose={() => setSelectedOrder(null)}
            onItemStatusChange={changeItemStatus}
            onAddItems={handleAddItems}
          />
        );
      })()}

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .columns-grid {
          display: grid;
          gap: 16px;
          align-items: flex-start;
          width: 100%;
          /* Desktop: 3 columnas iguales */
          grid-template-columns: repeat(3, 1fr);
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .columns-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .columns-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
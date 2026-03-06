import { useState } from "react";
import { useOrders } from "../../components/context/OrdersContext";
import Header from "../../components/pedido/Header";
import Column from "../../components/pedido/Column";
import ServedToday from "../../components/pedido/ServedToday";
import NewOrderModal from "../../components/pedido/NewOrderModel";

export default function Principal() {
  // ← REEMPLAZA los 3 useState por esto
  const { orders, served, addOrder, advanceOrder, changeItemStatus } = useOrders();
  const [showModal, setShowModal] = useState(false);

  const columns: Array<"pending" | "preparing" | "ready"> = ["pending", "preparing", "ready"];

  return (
    <div style={{
      minHeight: "100vh", background: "#f1f5f9",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>
      <Header activeCount={orders.length} onNewOrder={() => setShowModal(true)} />

      <div style={{ padding: "24px 20px" }}>
        <div className="columns-grid">
          {columns.map((status) => (
            <Column
              key={status}
              status={status}
              orders={orders.filter((o) => o.status === status)}
              onAction={advanceOrder}                  // ← antes: handleAction
              onItemStatusChange={changeItemStatus}    // ← antes: handleItemStatusChange
            />
          ))}
        </div>
        <ServedToday served={served} />
      </div>

      {showModal && (
        <NewOrderModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => { addOrder(data); setShowModal(false); }} // ← antes: handleAddOrder
        />
      )}

      <style>{`
        .columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: flex-start;
        }
        @media (max-width: 1024px) {
          .columns-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .columns-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

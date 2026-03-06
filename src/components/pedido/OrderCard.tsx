import type { Order } from "../../types/types";
import StatusBadge from "./StatusBadge";

interface Props {
  order: Order;
  onAction: (id: number) => void;
}

export default function OrderCard({ order, onAction }: Props) {
  const actionLabel =
    order.status === "pending" ? "→ Iniciar preparación" :
    order.status === "preparing" ? "→ Marcar como listo" :
    "→ Marcar como servido";

  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: 18,
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 14,
      border: order.delayed ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>Mesa #{order.table}</span>
          {order.delayed && (
            <span style={{
              fontSize: 10, fontWeight: 800, background: "#fee2e2", color: "#b91c1c",
              padding: "2px 8px", borderRadius: 6,
            }}>DEMORADO</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: order.delayed ? "#ef4444" : "#6b7280", display: "flex", gap: 4 }}>
          <span>⏱</span>
          <span style={{ fontWeight: order.delayed ? 700 : 400 }}>{order.time}m</span>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
        👤 {order.pax} pax &nbsp;·&nbsp; {order.waiter}
      </div>

      {order.notes && (
        <div style={{
          background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8,
          padding: "7px 12px", fontSize: 12, color: "#92400e", marginBottom: 12, display: "flex", gap: 6,
        }}>
          💬 {order.notes}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
            <span>{item.emoji} {item.qty}x {item.name}</span>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>

      {order.status !== "served" && (
        <button
          onClick={() => onAction(order.id)}
          style={{
            width: "100%", padding: "10px 0", borderRadius: 8, border: "1px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontSize: 13, color: "#374151", fontWeight: 600,
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
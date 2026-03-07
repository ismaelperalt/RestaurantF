import type{ Order, OrderItem } from "../../types/types";

// Estados en orden de rotación
const statusCycle: Record<string, OrderItem["status"]> = {
  pending:   "preparing",
  preparing: "ready",
  ready:     "served",
  served:    "served", // ya no avanza más
};

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  pending:   { label: "Pendiente",  bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  preparing: { label: "Preparando", bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  ready:     { label: "Listo",      bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  served:    { label: "Servido",    bg: "#f3f4f6", text: "#6b7280", border: "#d1d5db" },
};

interface Props {
  order: Order;
  onAction: (id: number) => void;
  onItemStatusChange: (orderId: number, itemIndex: number, newStatus: OrderItem["status"]) => void;
  onCardClick: (order: Order) => void; // 
}

export default function OrderCard({ order, onAction, onItemStatusChange,onCardClick }: Props) {
  const actionLabel =
    order.status === "pending"   ? "→ Iniciar preparación" :
    order.status === "preparing" ? "→ Marcar como listo"   :
                                   "→ Marcar como servido";

  return (



    
    <div style={{
      background: "#fff", borderRadius: 14, padding: 18,
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 14,
      border: order.delayed ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
    }}>


     
<div
  onClick={() => onCardClick(order)}
  style={{
    background: "#fff", borderRadius: 14, padding: 18,
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 14,
    border: order.delayed ? "1.5px solid #ef4444" : "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "box-shadow 0.15s, transform 0.15s",
  }}
  onMouseEnter={e => {
    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
  }}
  onMouseLeave={e => {
    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.07)";
    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
  }}
>
  {/* Cabecera */}
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

</div>

         {/* Subtítulo */}
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
        👤 {order.pax} pax &nbsp;·&nbsp; {order.waiter}
      </div>

      {/* Nota */}
      {order.notes && (
        <div style={{
          background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8,
          padding: "7px 12px", fontSize: 12, color: "#92400e", marginBottom: 12, display: "flex", gap: 6,
        }}>
          💬 {order.notes}
        </div>
      )}

      {/* Ítems con badge clickeable */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {order.items.map((item, i) => {
          const cfg = statusConfig[item.status];
          const isServed = item.status === "served";

          return (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13,
            }}>
              {/* Nombre del plato */}
              <div>
                <span style={{ color: isServed ? "#9ca3af" : "#374151" }}>
                  {item.emoji} {item.qty}x {item.name}
                </span>
                {/* Nota de alergia del ítem */}
                {item.allergyNote && (
                  <div style={{ fontSize: 11, color: "#b45309", marginTop: 1 }}>
                    ⚠️ {item.allergyNote}
                  </div>
                )}
              </div>

              {/* Badge clickeable — rota el estado al hacer clic */}
              <button
                onClick={() => !isServed && onItemStatusChange(order.id, i, statusCycle[item.status])}
                title={isServed ? "Ya servido" : "Clic para avanzar estado"}
                style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                  background: cfg.bg, color: cfg.text,
                  border: `1px solid ${cfg.border}`,
                  cursor: isServed ? "default" : "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {cfg.label} {!isServed && "›"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Botón acción general */}
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
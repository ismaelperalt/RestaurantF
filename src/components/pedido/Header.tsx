interface Props {
  activeCount: number;
  onNewOrder: () => void;
}

export default function Header({ activeCount, onNewOrder }: Props) {
  return (
    <div style={{
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>📊</span>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#f59e0b" }}>Seguimiento Pedido</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>{activeCount} pedido(s) activo(s)</span>
        <button
          onClick={onNewOrder}
          style={{
            background: "#f59e0b", color: "#fff", border: "none", borderRadius: 10,
            padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}
        >
          + Nuevo Pedido
        </button>
      </div>
    </div>
  );
}
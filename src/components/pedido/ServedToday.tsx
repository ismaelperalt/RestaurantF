import type { ServedOrder } from "../../types/types";

interface Props {
  served: ServedOrder[];
}

export default function ServedToday({ served }: Props) {
  if (served.length === 0) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 1, marginBottom: 10 }}>
        SERVIDOS HOY ({served.length})
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {served.map((o) => (
          <div key={o.id} style={{
            background: "#fff", borderRadius: 10, padding: "10px 18px",
            display: "flex", alignItems: "center", gap: 12,
            fontSize: 13, color: "#374151", border: "1px solid #e5e7eb",
          }}>
            <span style={{ fontWeight: 700 }}>Mesa #{o.table}</span>
            <span style={{ color: "#9ca3af" }}>{o.waiter}</span>
            <span style={{
              background: "#f3f4f6", color: "#6b7280", borderRadius: 20,
              padding: "2px 10px", fontSize: 11, fontWeight: 700,
            }}>● Servido</span>
          </div>
        ))}
      </div>
    </div>
  );
}
import type { Order} from "../../types/types";
import { columnConfig } from "../../types/data";

import OrderCard from "./OrderCard";

interface Props {
  status: "pending" | "preparing" | "ready";
  orders: Order[];
  onAction: (id: number) => void;

}

export default function Column({ status, orders, onAction}: Props) {
  const cfg = columnConfig[status];
  return (
    <div style={{ flex: 1, minWidth: 280 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: cfg.bg, border: `1.5px solid ${cfg.border}`,
        borderRadius: 10, padding: "10px 16px", marginBottom: 14,
      }}>
        <span style={{ fontWeight: 700, color: cfg.headerColor, fontSize: 14 }}>{cfg.label}</span>
        <span style={{
          background: cfg.border, color: "#fff", borderRadius: 20,
          padding: "1px 10px", fontSize: 13, fontWeight: 700,
        }}>{orders.length}</span>
      </div>
      {orders.map((o) => <OrderCard key={o.id} order={o} onAction={onAction}  />)}
    </div>
  );
}
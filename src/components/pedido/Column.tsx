import { useState, useRef, useEffect } from "react";
import type { Order } from "../../types/types";
import { columnConfig } from "../../types/data";
import OrderCard from "./OrderCard";
import type { OrderItem } from "../../types/types";

interface Props {
  status: "pending" | "preparing" | "ready";
  orders: Order[];
  onAction: (id: number) => void;
  onItemStatusChange: (orderId: number, itemIndex: number, newStatus: OrderItem["status"]) => void;
  onCardClick: (order: Order) => void;
}

export default function Column({ status, orders, onAction, onItemStatusChange, onCardClick }: Props) {
  const cfg = columnConfig[status];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hiddenBelow, setHiddenBelow] = useState(0);
  const [hiddenAbove, setHiddenAbove] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const visibleHeight = el.clientHeight;
    const totalHeight = el.scrollHeight;

    const atBottom = scrollTop + visibleHeight >= totalHeight - 10;
    const cardHeight = 190;
    const scrolledPast = Math.floor(scrollTop / cardHeight);
    const visibleCards = Math.floor(visibleHeight / cardHeight);
    const below = Math.max(0, orders.length - scrolledPast - visibleCards);

    setHiddenBelow(atBottom ? 0 : below);
    setHiddenAbove(scrollTop > 40);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => { if (el) el.removeEventListener("scroll", checkScroll); };
  }, [orders.length]);

  const scrollDown = () => scrollRef.current?.scrollBy({ top: 220, behavior: "smooth" });
  const scrollUp = () => scrollRef.current?.scrollBy({ top: -220, behavior: "smooth" });

  return (
    <div style={{
      width: "100%",
      minWidth: 0, // clave para que no desborde el grid
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    }}>
      {/* ── Header columna ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: cfg.bg, border: `1.5px solid ${cfg.border}`,
        borderRadius: 10, padding: "10px 16px", marginBottom: 12,
        boxSizing: "border-box",
      }}>
        <span style={{ fontWeight: 700, color: cfg.headerColor, fontSize: 14 }}>{cfg.label}</span>
        <span style={{
          background: cfg.border, color: "#fff", borderRadius: 20,
          padding: "1px 10px", fontSize: 13, fontWeight: 700,
        }}>{orders.length}</span>
      </div>

      {/* ── Indicador "hay pedidos arriba" ── */}
      {hiddenAbove && (
        <button
          onClick={scrollUp}
          style={{
            width: "100%", marginBottom: 6,
            background: `linear-gradient(135deg, ${cfg.bg}, white)`,
            border: `1.5px solid ${cfg.border}`,
            borderRadius: 8, padding: "7px 12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 14, animation: "bounceUp 1s ease-in-out infinite" }}>↑</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: cfg.headerColor }}>Subir</span>
        </button>
      )}

      {/* ── Área scrolleable ── */}
      <div
        ref={scrollRef}
        style={{
          maxHeight: "calc(100vh - 280px)",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: 2,
          boxSizing: "border-box",
          scrollbarWidth: "thin",
          scrollbarColor: `${cfg.border} transparent`,
        }}
      >
        {orders.length === 0 && (
          <div style={{
            textAlign: "center", padding: "40px 20px",
            color: "#9ca3af", fontSize: 13,
            border: "1.5px dashed #e2e8f0",
            borderRadius: 10,
          }}>
            Sin pedidos
          </div>
        )}

        {orders.map((o) => (
          <OrderCard
            key={o.id}
            order={o}
            onAction={onAction}
            onItemStatusChange={onItemStatusChange}
            onCardClick={onCardClick}
          />
        ))}
      </div>

      {/* ── Indicador "hay pedidos abajo" ── */}
      {hiddenBelow > 0 && (
        <button
          onClick={scrollDown}
          style={{
            width: "100%", marginTop: 8,
            background: `linear-gradient(135deg, ${cfg.bg}, #fff)`,
            border: `1.5px solid ${cfg.border}`,
            borderRadius: 10, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer",
            boxShadow: `0 4px 14px ${cfg.border}44`,
            boxSizing: "border-box",
            animation: "pulseDown 1.8s ease-in-out infinite",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>👇</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: cfg.headerColor }}>
                {hiddenBelow} pedido{hiddenBelow > 1 ? "s" : ""} más abajo
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>
                Toca para ver
              </div>
            </div>
          </div>
          <span style={{
            fontSize: 20, color: cfg.headerColor,
            display: "inline-block",
            animation: "bounceDown 1s ease-in-out infinite",
          }}>↓</span>
        </button>
      )}

      <style>{`
        @keyframes pulseDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes bounceUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
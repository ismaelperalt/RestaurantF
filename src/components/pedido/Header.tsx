import { useState, useEffect } from "react";

interface Props {
  activeCount: number;
  onNewOrder: () => void;
}

export default function Header({ activeCount, onNewOrder }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fecha = now.toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long",
  });

  const hora = now.toLocaleTimeString("es-ES", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  return (
    <>
      <div style={{
        background: "#fff",
        padding: "28px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
        borderBottom: "1px solid #f3f4f6",
        flexWrap: "wrap",
      }}>
        {/* Izquierda — título */}
        <div style={{ flex: "1 1 200px" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: "#111" }}>
            📋 Seguimiento Pedido
          </h1>
          <p className="header-fecha" style={{
            margin: 0, fontSize: 14, color: "#9ca3af",
            fontWeight: 500, textTransform: "capitalize",
          }}>
            {fecha}
          </p>
        </div>

        {/* Derecha */}
        <div className="header-right" style={{
          flex: "0 0 auto", display: "flex",
          alignItems: "center", gap: 12,
        }}>

          {/* Reloj */}
          <div className="header-clock" style={{
            background: "#f9fafb", border: "1px solid #e5e7eb",
            borderRadius: 10, padding: "8px 16px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>🕐</span>
            <span style={{
              fontSize: 14, fontWeight: 700, color: "#111",
              fontVariantNumeric: "tabular-nums",
            }}>
              {hora}
            </span>
          </div>

          {/* Pedidos activos */}
          <div className="header-activos" style={{
            background: "#fff7ed", border: "1px solid #fed7aa",
            borderRadius: 10, padding: "8px 16px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>🍽️</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>
                {activeCount}
              </div>
              <div style={{ fontSize: 10, color: "#92400e", fontWeight: 700 }}>
                ACTIVOS
              </div>
            </div>
          </div>

          {/* Botón nuevo pedido */}
          <button
            className="header-btn"
            onClick={onNewOrder}
            style={{
              background: "#f59e0b", color: "#fff", border: "none",
              borderRadius: 10, padding: "10px 20px",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#d97706";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(245,158,11,0.4)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#f59e0b";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(245,158,11,0.3)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            + Nuevo Pedido
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .header-right { gap: 8px !important; }
          .header-clock { display: none !important; }
          .header-fecha { display: none !important; }
          .header-activos { padding: 6px 10px !important; }
          .header-btn { padding: 8px 12px !important; font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .header-activos { display: none !important; }
        }
      `}</style>
    </>
  );
}
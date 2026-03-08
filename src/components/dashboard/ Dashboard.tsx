import { useMemo, useState } from "react";
import { useOrders } from "../../components/context/OrdersContext";

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Hoy"];
const mockWeeklySales = [1240, 980, 1560, 2100, 1890, 2340, 0];

export default function Dashboard() {
  const { orders, served } = useOrders();
  const [period, setPeriod] = useState<"dia" | "semana" | "mes">("dia");

  const ingresosTotales = useMemo(() =>
    orders.reduce((acc, o) => acc + o.items.reduce((a, i) => a + (i.price || 0), 0), 0)
  , [orders]);

  const pedidosPorEstado = useMemo(() => ({
    pending:   orders.filter(o => o.status === "pending").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready:     orders.filter(o => o.status === "ready").length,
    served:    served.length,
  }), [orders, served]);

  const tiempoPromedio = useMemo(() => {
    if (orders.length === 0) return 0;
    return Math.round(orders.reduce((acc, o) => acc + o.time, 0) / orders.length);
  }, [orders]);

  const platosVendidos = useMemo(() => {
    const count: Record<string, { name: string; qty: number; emoji: string }> = {};
    orders.forEach(o => o.items.forEach(item => {
      if (!count[item.name]) count[item.name] = { name: item.name, qty: 0, emoji: item.emoji };
      count[item.name].qty += item.qty;
    }));
    return Object.values(count).sort((a, b) => b.qty - a.qty).slice(0, 5);
  }, [orders]);

  const mesasActivas = useMemo(() =>
    orders.map(o => ({
      table: o.table, waiter: o.waiter,
      items: o.items.length,
      total: o.items.reduce((a, i) => a + (i.price || 0), 0),
      status: o.status, delayed: o.delayed,
    })).sort((a, b) => b.total - a.total)
  , [orders]);

  const maxSale = Math.max(...mockWeeklySales, 1);
  const totalEstados = Object.values(pedidosPorEstado).reduce((a, b) => a + b, 0) || 1;

  const statusColors: Record<string, { label: string; color: string; light: string; text: string }> = {
    pending:   { label: "Pendientes", color: "#f59e0b", light: "#fef3c7", text: "#92400e" },
    preparing: { label: "Preparando", color: "#3b82f6", light: "#dbeafe", text: "#1e40af" },
    ready:     { label: "Listos",     color: "#10b981", light: "#d1fae5", text: "#065f46" },
    served:    { label: "Servidos",   color: "#9ca3af", light: "#f3f4f6", text: "#6b7280" },
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    }}>

      {/* ── Header estilo PlatosPage ── */}
      <div style={{
        background: "#fff",
        padding: "28px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 24, borderBottom: "1px solid #f3f4f6", flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 200px" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: "#111" }}>
            📊 Panel de Control
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>
            Resumen operacional del restaurante
          </p>
        </div>
        <div style={{ flex: "0 0 auto" }}>
          <div style={{ display: "flex", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            {(["dia", "semana", "mes"] as const).map((p, i) => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: "10px 20px", border: "none",
                borderLeft: i > 0 ? "1px solid #e5e7eb" : "none",
                fontWeight: period === p ? 700 : 500,
                fontSize: 13, cursor: "pointer",
                background: period === p ? "#f59e0b" : "#fff",
                color: period === p ? "#fff" : "#6b7280",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (period !== p) (e.currentTarget as HTMLButtonElement).style.background = "#fafafa"; }}
                onMouseLeave={e => { if (period !== p) (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
              >
                {p === "dia" ? "Hoy" : p === "semana" ? "Semana" : "Mes"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* ── KPI Cards ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16, marginBottom: 20,
        }} className="kpi-grid">
          {[
            { label: "Total Ventas",    value: `${ingresosTotales.toFixed(2)}€`, sub: "Ingresos activos",  icon: "💰", trend: "+12%", up: true  },
            { label: "Pedidos Activos", value: orders.length,                    sub: "En este momento",  icon: "🍽️", trend: "+5%",  up: true  },
            { label: "Tiempo Promedio", value: `${tiempoPromedio}min`,           sub: "Por pedido",       icon: "⏱",  trend: "-8%",  up: false },
            { label: "Servidos Hoy",    value: served.length,                    sub: "Pedidos cerrados", icon: "✅", trend: "+18%", up: true  },
          ].map((kpi) => (
            <div key={kpi.label} style={{
              background: "#fff", borderRadius: 14, padding: "20px 22px",
              border: "1px solid #eaecf0",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{kpi.label}</div>
                <div style={{ fontSize: 18 }}>{kpi.icon}</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#111", letterSpacing: -1, marginBottom: 8 }}>
                {kpi.value}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: kpi.up ? "#10b981" : "#ef4444" }}>
                  {kpi.up ? "▲" : "▼"} {kpi.trend}
                </span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>{kpi.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Fila 2: Gráfica + Estado ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr",
          gap: 16, marginBottom: 20,
        }} className="row2-grid">

          {/* Gráfica */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "22px 24px",
            border: "1px solid #eaecf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>Tendencia de Ventas</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Ingresos por día esta semana</div>
              </div>
              <div style={{
                background: "#fff7ed", border: "1px solid #fed7aa",
                borderRadius: 8, padding: "5px 12px",
                fontSize: 13, fontWeight: 700, color: "#f59e0b",
              }}>
                {mockWeeklySales.slice(0, 6).reduce((a, b) => a + b, 0).toLocaleString()}€
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 130 }}>
              {mockWeeklySales.map((val, i) => {
                const h = val === 0 ? 4 : Math.max(16, (val / maxSale) * 118);
                const isToday = i === 6;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    {val > 0 && (
                      <div style={{ fontSize: 9, fontWeight: 500, color: isToday ? "#f59e0b" : "#9ca3af" }}>
                        {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                      </div>
                    )}
                    <div style={{
                      width: "70%", height: h, borderRadius: "4px 4px 0 0",
                      background: isToday ? "#f59e0b" : "#e0e7ff",
                      transition: "all 0.2s", cursor: "pointer",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "0.75"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"}
                    />
                    <div style={{ fontSize: 10, color: isToday ? "#f59e0b" : "#9ca3af", fontWeight: isToday ? 700 : 400 }}>
                      {WEEK_DAYS[i]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estado pedidos */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "22px 24px",
            border: "1px solid #eaecf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 4 }}>Estado de pedidos</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 18 }}>Distribución en tiempo real</div>

            {/* Barra multicolor */}
            <div style={{ display: "flex", gap: 3, height: 8, borderRadius: 99, overflow: "hidden", marginBottom: 20 }}>
              {Object.entries(pedidosPorEstado).map(([status, count]) => {
                const pct = (count / totalEstados) * 100;
                const cfg = statusColors[status];
                return pct > 0 ? (
                  <div key={status} style={{
                    height: "100%", width: `${pct}%`,
                    background: cfg.color, transition: "width 0.6s ease",
                  }} />
                ) : null;
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(pedidosPorEstado).map(([status, count]) => {
                const cfg = statusColors[status];
                const pct = Math.round((count / totalEstados) * 100);
                return (
                  <div key={status} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#374151", flex: 1 }}>{cfg.label}</span>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{pct}%</span>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      background: cfg.light, color: cfg.text,
                      padding: "2px 10px", borderRadius: 20,
                    }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Fila 3: Platos + Mesas ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }} className="row3-grid">

          {/* Platos más vendidos */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "22px 24px",
            border: "1px solid #eaecf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 4 }}>Ranking de platos</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 18 }}>Los más solicitados hoy</div>

            {platosVendidos.length === 0 ? (
              <div style={{ textAlign: "center", color: "#d1d5db", fontSize: 13, padding: "20px 0" }}>Sin datos</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {platosVendidos.map((plato, i) => (
                  <div key={plato.name} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 0",
                    borderBottom: i < platosVendidos.length - 1 ? "1px solid #f3f4f6" : "none",
                    transition: "background 0.15s", cursor: "default",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#fafafa"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      background: i === 0 ? "#f59e0b" : "#f3f4f6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700,
                      color: i === 0 ? "#fff" : "#9ca3af",
                    }}>{i + 1}</div>
                    {plato.emoji.startsWith("http") ? (
                      <img src={plato.emoji} alt={plato.name} style={{
                        width: 36, height: 36, borderRadius: 8,
                        objectFit: "cover", flexShrink: 0,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      }} />
                    ) : (
                      <span style={{ fontSize: 22, flexShrink: 0 }}>{plato.emoji}</span>
                    )}
                    <span style={{ fontSize: 13, color: "#374151", flex: 1, fontWeight: 500 }}>{plato.name}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: i === 0 ? "#f59e0b" : "#9ca3af",
                    }}>{plato.qty} pedidos</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mesas activas */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "22px 24px",
            border: "1px solid #eaecf0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 4 }}>Mesas activas</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 18 }}>Ordenadas por consumo</div>

            {mesasActivas.length === 0 ? (
              <div style={{ textAlign: "center", color: "#d1d5db", fontSize: 13, padding: "20px 0" }}>Sin mesas</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {mesasActivas.map((mesa, i) => {
                  const scfg = statusColors[mesa.status];
                  return (
                    <div key={mesa.table} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 0",
                      borderBottom: i < mesasActivas.length - 1 ? "1px solid #f3f4f6" : "none",
                      cursor: "default", transition: "background 0.15s",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#fafafa"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        background: mesa.delayed ? "#fee2e2" : "#f3f4f6",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700,
                        color: mesa.delayed ? "#ef4444" : "#374151",
                      }}>#{mesa.table}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
                          {mesa.waiter}
                          {mesa.delayed && (
                            <span style={{ marginLeft: 6, fontSize: 9, color: "#ef4444", fontWeight: 700 }}>● DEMORADO</span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>{mesa.items} ítems</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                          {mesa.total > 0 ? `${mesa.total.toFixed(2)}€` : "—"}
                        </div>
                        <div style={{ fontSize: 10, color: scfg.color, fontWeight: 600 }}>
                          ● {scfg.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpi-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .row2-grid { grid-template-columns: 1fr !important; }
          .row3-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .kpi-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
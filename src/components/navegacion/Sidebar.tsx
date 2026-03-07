import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/", label: "Inicio", icon: "🏠", end: true },
  { to: "/platos", label: "Platos", icon: "🍽️", end: false },
  { to: "/nosotros", label: "Nosotros", icon: "👥", end: false },
  { to: "/pedido", label: "Seguimiento Pedido", icon: "⚙️", end: false },

];

export default function Sidebar({ collapsed, onToggle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMobile = () => {
    setMobileOpen(true);
    document.body.classList.add("sidebar-open");
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  return (
    <>
      <button
        onClick={openMobile}
        className="mobile-menu-btn"
        style={{
          position: "fixed", top: 14, left: 14,
          zIndex: mobileOpen ? 0 : 300,
          opacity: mobileOpen ? 0 : 1,
          pointerEvents: mobileOpen ? "none" : "auto",
          background: "#1e1e2e", border: "1px solid #2e2e42",
          borderRadius: 10, width: 42, height: 42,
          fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#f59e0b", boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          transition: "opacity 0.2s ease",
        }}
      >☰</button>

      {/* ── Overlay mobile ── */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 250, width: "100vw", height: "100vh",
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          position: "fixed", top: 0, left: 0,
          height: "100vh", zIndex: 260,
          width: collapsed ? 68 : 240,
          background: "linear-gradient(180deg, #1f2235, #151728)",
          display: "flex", flexDirection: "column",
          transition: "width 0.25s ease, transform 0.25s ease",
          boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
          overflow: "hidden",
          borderRight: "1px solid #2e2e42",
        }}
        className={`sidebar ${mobileOpen ? "mobile-open" : ""} ${collapsed ? "collapsed" : ""}`}
      >
        {/* ── Logo ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "18px 0" : "18px 16px",
          borderBottom: "1px solid #2e2e42",
          minHeight: 64,
        }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                background: "#d6ab61", borderRadius: 10,
                width: 34, height: 34, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
              }}>🍳</div>
              <span style={{
                fontWeight: 900, fontSize: 16, color: "#fff",
                whiteSpace: "nowrap", letterSpacing: 0.3,
              }}>
                RestaurantF
              </span>
            </div>
          )}

          {/* Botón colapsar — solo desktop */}
          <button
            onClick={() => { onToggle(); closeMobile(); }}
            className="collapse-btn"
            style={{
              background: "#2a2a3e", border: "1px solid #3a3a52",
              borderRadius: 8, width: 30, height: 30,
              cursor: "pointer", fontSize: 30, color: "#9ca3af",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "all 0.15s",
            }}
            title={collapsed ? "Expandir" : "Colapsar"}
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>

        {/* Etiqueta sección */}
        {!collapsed && (
          <div style={{
            padding: "18px 16px 8px",
            fontSize: 12, fontWeight: 800,
            color: "#4b5563", letterSpacing: 1.5,
            textTransform: "uppercase",
          }}>
            Menú principal
          </div>
        )}

        {/* ── Nav links ── */}
        <nav style={{
          flex: 1, padding: "4px 10px",
          display: "flex", flexDirection: "column", gap: 2,
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMobile}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center",
                gap: collapsed ? 0 : 12,
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "12px 0" : "10px 12px",
                borderRadius: 10, textDecoration: "none",
                fontWeight: 700, fontSize: 14,
                color: isActive ? "#f59e0b" : "#9ca3af",
                background: isActive ? "rgba(245,158,11,0.1)" : "transparent",
                borderLeft: isActive && !collapsed ? "3px solid #f59e0b" : "3px solid transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap", overflow: "hidden",
              })}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ fontSize: 17, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* ── Footer ── */}
        <div style={{
          padding: collapsed ? "16px 0" : "16px",
          borderTop: "1px solid #2e2e42",
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#2a2a3e", border: "1px solid #3a3a52",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, flexShrink: 0,
          }}>👤</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>Admin</div>
              <div style={{ fontSize: 10, color: "#4b5563" }}>RestaurantF</div>
            </div>
          )}
        </div>
      </aside>

      <style>{`
        .mobile-menu-btn {
          display: none !important;
        }
        .collapse-btn {
          display: flex;
        }
        @media (max-width: 768px) {
          .sidebar,
          .sidebar.collapsed {
            transform: translateX(-100%) !important;
            width: 240px !important;
          }
          .sidebar.mobile-open {
            transform: translateX(0) !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .collapse-btn {
            display: none !important;
          }
          body.sidebar-open {
            overflow: hidden;
          }
        }
      `}</style>
    </>
  );
}
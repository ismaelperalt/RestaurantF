import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/",          label: "Inicio",           icon: "🏠", end: true  },
  { to: "/platos",    label: "Platos",            icon: "🍽️", end: false },
  { to: "/nosotros",  label: "Nosotros",          icon: "👥", end: false },
  { to: "/pedido",    label: "Pedido",            icon: "📋", end: false },
  { to: "/dashboard", label: "Gestionar Pedidos", icon: "⚙️", end: false },
];

export default function Sidebar({ collapsed, onToggle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa — solo mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="mobile-menu-btn"
        style={{
          position: "fixed", top: 16, left: 16, zIndex: 300,
          background: "#f59e0b", border: "none", borderRadius: 10,
          width: 42, height: 42, fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px rgba(245,158,11,0.4)",
        }}
      >☰</button>

      {/* Overlay oscuro — solo mobile cuando está abierto */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)", zIndex: 250,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed", top: 0, left: 0,
          height: "100vh", zIndex: 260,
          width: collapsed ? 72 : 240,
          background: "linear-gradient(180deg, #f59e0b 0%, #d97706 100%)",
          display: "flex", flexDirection: "column",
          transition: "width 0.25s ease, transform 0.25s ease",
          boxShadow: "4px 0 20px rgba(245,158,11,0.25)",
          overflow: "hidden",
        }}
        className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}
      >
        {/* Logo + botón colapsar */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "20px 0" : "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          minHeight: 64,
        }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>🍳</span>
              <span style={{ fontWeight: 900, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>
                RestaurantF
              </span>
            </div>
          )}
          {/* En mobile este botón cierra el sidebar en vez de colapsar */}
          <button
            onClick={() => { onToggle(); setMobileOpen(false); }}
            style={{
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8,
              width: 32, height: 32, cursor: "pointer", fontSize: 14,
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
            title={collapsed ? "Expandir" : "Colapsar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center",
                gap: collapsed ? 0 : 12,
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "12px 0" : "11px 14px",
                borderRadius: 10, textDecoration: "none",
                fontWeight: 700, fontSize: 14,
                color: isActive ? "#f59e0b" : "#fff",
                background: isActive ? "#fff" : "transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap", overflow: "hidden",
              })}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div style={{
            padding: "16px", borderTop: "1px solid rgba(255,255,255,0.2)",
            fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center",
          }}>
            © 2026 RestaurantF
          </div>
        )}
      </aside>

      <style>{`
        /* DESKTOP: sidebar visible normal */
        .mobile-menu-btn {
          display: none !important;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%) !important;
            width: 240px !important;
          }
          .sidebar.mobile-open {
            transform: translateX(0) !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
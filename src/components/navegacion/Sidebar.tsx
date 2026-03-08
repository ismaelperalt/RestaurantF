import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊", end: false },
  { to: "/menu", label: "Menu", icon: "🍽️", end: false },
  { to: "/platos", label: "Seguimiento Pedido", icon: "📋", end: false },
];

export default function Sidebar({ collapsed, onToggle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openMobile = () => {
    setMobileOpen(true);
    document.body.classList.add("sidebar-open");
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  // En mobile: siempre 248px, oculto con transform hasta que se abra
  // En desktop: 72px colapsado, 248px expandido
  const sidebarWidth = isMobile ? 248 : collapsed ? 72 : 248;
  const isCollapsedView = !isMobile && collapsed;

  return (
    <>
      {/* ── Botón hamburguesa (solo mobile) ── */}
      <button
        onClick={openMobile}
        className="mobile-menu-btn"
        style={{
          position: "fixed", top: 16, left: 16,
          zIndex: mobileOpen ? 0 : 300,
          opacity: mobileOpen ? 0 : 1,
          pointerEvents: mobileOpen ? "none" : "auto",
          background: "linear-gradient(135deg, #1a1c2e, #0f1020)",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 12, width: 44, height: 44,
          fontSize: 20, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#f59e0b",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.1)",
          transition: "opacity 0.2s ease",
        }}
      >☰</button>

      {/* ── Overlay mobile ── */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 250,
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`sidebar ${mobileOpen ? "mobile-open" : ""} ${isCollapsedView ? "collapsed" : ""}`}
        style={{
          position: "fixed", top: 0, left: 0,
          height: "100vh", zIndex: 260,
          width: sidebarWidth,
          background: "linear-gradient(180deg, #13152a 0%, #0c0e1e 60%, #0a0c1a 100%)",
          display: "flex", flexDirection: "column",
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "4px 0 32px rgba(0,0,0,0.5), 1px 0 0 rgba(255,255,255,0.04)",
          overflow: "hidden",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          // Mobile: oculto por defecto con transform
          transform: isMobile ? (mobileOpen ? "translateX(0)" : "translateX(-100%)") : "none",
        }}
      >
        {/* Glow top */}
        <div style={{
          position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
          width: 160, height: 80,
          background: "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Header / Logo ── */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex",
          flexDirection: isCollapsedView ? "column" : "row",
          alignItems: "center",
          justifyContent: isCollapsedView ? "center" : "space-between",
          gap: isCollapsedView ? 8 : 0,
          padding: isCollapsedView ? "16px 0" : "20px 16px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* Logo icon + texto */}
          {!isCollapsedView && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
                boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
              }}>🍴</div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span style={{
                  fontSize: "20px", fontWeight: 800, color: "#ffffff",
                  fontFamily: "'Georgia', serif", letterSpacing: "0.5px",
                }}>RestaurantF</span>
                <span style={{
                  fontSize: "11px", color: "#f59e0b", fontWeight: 600,
                  letterSpacing: "2px", textTransform: "uppercase",
                }}>Sistema</span>
              </div>
            </div>
          )}

          {/* Solo icono cuando colapsado en desktop */}
          {isCollapsedView && (
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: "0 4px 12px rgba(245,158,11,0.35)",
            }}>🍴</div>
          )}

          {/* Botón ✕ cerrar en mobile */}
          {isMobile && (
            <button
              onClick={closeMobile}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, width: 30, height: 30,
                cursor: "pointer", fontSize: 16, color: "#9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >✕</button>
          )}

          {/* Botón colapsar ‹ en desktop expandido */}
          {!isMobile && !isCollapsedView && (
            <button
              onClick={onToggle}
              className="collapse-btn"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, width: 28, height: 28,
                cursor: "pointer", fontSize: 16, color: "#6b7280",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}
              title="Colapsar"
            >‹</button>
          )}

          {/* Botón expandir › en desktop colapsado */}
          {!isMobile && isCollapsedView && (
            <button
              onClick={onToggle}
              className="collapse-btn"
              style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: 8, width: 32, height: 32,
                cursor: "pointer", fontSize: 18, color: "#f59e0b",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}
              title="Expandir"
            >›</button>
          )}
        </div>

        {/* Etiqueta sección */}
        {!isCollapsedView && (
          <div style={{
            position: "relative", zIndex: 1,
            padding: "20px 20px 8px",
            fontSize: 10, fontWeight: 700,
            color: "rgba(255,255,255,0.2)", letterSpacing: 2.5,
            textTransform: "uppercase",
          }}>
            Navegación
          </div>
        )}

        {/* ── Nav links ── */}
        <nav style={{
          flex: 1, position: "relative", zIndex: 1,
          padding: isCollapsedView ? "12px 10px" : "4px 12px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMobile}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center",
                gap: isCollapsedView ? 0 : 12,
                justifyContent: isCollapsedView ? "center" : "flex-start",
                padding: isCollapsedView ? "13px 0" : "11px 14px",
                borderRadius: 12, textDecoration: "none",
                fontWeight: 600, fontSize: 13.5,
                color: isActive ? "#f59e0b" : "rgba(255,255,255,0.45)",
                background: isActive
                  ? "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(245,158,11,0.2)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 4px 16px rgba(245,158,11,0.1)" : "none",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap", overflow: "hidden",
              })}
              title={isCollapsedView ? item.label : undefined}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {!isCollapsedView && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div style={{
          position: "relative", zIndex: 1,
          margin: "0 16px", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)",
        }} />

        {/* ── Footer ── */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: isCollapsedView ? "16px 0" : "16px",
          display: "flex", alignItems: "center",
          justifyContent: isCollapsedView ? "center" : "flex-start",
          gap: 10,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #2a2c42, #1e2035)",
            border: "1.5px solid rgba(245,158,11,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, flexShrink: 0,
          }}>👤</div>
          {!isCollapsedView && (
            <>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>Admin</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>RestaurantF</div>
              </div>
              <div style={{
                marginLeft: "auto",
                width: 7, height: 7, borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
              }} />
            </>
          )}
        </div>
      </aside>

      <style>{`
        .mobile-menu-btn { display: none !important; }

        .sidebar nav a:hover {
          color: rgba(255,255,255,0.8) !important;
          background: rgba(255,255,255,0.04) !important;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          body.sidebar-open { overflow: hidden; }
        }
      `}</style>
    </>
  );
}
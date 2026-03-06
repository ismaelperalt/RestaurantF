import React, { useState, useEffect } from "react";
import Sidebar from "./navegacion/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detecta si es mobile en tiempo real
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // En mobile el margen siempre es 0
  const marginLeft = isMobile ? 0 : collapsed ? 68 : 240;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main style={{
        marginLeft,
        flex: 1,
        minHeight: "100vh",
        transition: "margin-left 0.25s ease",
        width: `calc(100% - ${marginLeft}px)`, // ← ocupa el resto exacto
      }}>
        {children}
      </main>
    </div>
  );
}
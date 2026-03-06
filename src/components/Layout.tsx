import React, { useState, useEffect } from "react";
import Sidebar from "./navegacion/Sidebar";
import { OrdersProvider } from "./context/OrdersContext";
import { CartProvider } from "./context/CartContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const marginLeft = isMobile ? 0 : collapsed ? 68 : 240;

  return (
    <OrdersProvider>   {/* ← pedidos disponibles en toda la app */}
      <CartProvider>   {/* ← carrito disponible en toda la app */}
        <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          <main style={{
            marginLeft,
            flex: 1,
            minHeight: "100vh",
            transition: "margin-left 0.25s ease",
            width: `calc(100% - ${marginLeft}px)`,
          }}>
            {children}
          </main>
        </div>
      </CartProvider>
    </OrdersProvider>
  );
}
import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        style={{
          marginLeft: collapsed ? 72 : 240,
          flex: 1,
          minHeight: "100vh",
          transition: "margin-left 0.25s ease",
        }}
      >
        {children}
      </main>

    <style>{`
  @media (max-width: 768px) {
    main {
      margin-left: 0 !important;
      padding-top: 0 !important; /* ← sin padding extra */
    }
  }
`}</style>
    </div>
  );
}

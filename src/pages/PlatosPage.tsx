import { useState } from "react";
import type{ MenuItem } from "../types/data"
import {menu} from "../types/data"

const categoryConfig = {
  entrada:   { label: "Entradas",    emoji: "🥗", color: "#f59e0b", bg: "#fef3c7" },
  principal: { label: "Principales", emoji: "🍽️", color: "#ef4444", bg: "#fee2e2" },
  postre:    { label: "Postres",     emoji: "🍮", color: "#8b5cf6", bg: "#ede9fe" },
  bebida:    { label: "Bebidas",     emoji: "🥤", color: "#3b82f6", bg: "#dbeafe" },
};

const categories = ["entrada", "principal", "postre", "bebida"] as const;

export default function PlatosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = menu.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAgregar = (plato: MenuItem) => {
    console.log(`Agregado al pedido: ${plato.name}`);
    // aquí conectarás con tu lógica de pedido
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f8fafc",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        padding: "40px 32px 32px", color: "#fff",
      }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900 }}>🍴 Nuestra Carta</h1>
        <p style={{ margin: "0 0 24px", opacity: 0.9, fontSize: 15 }}>
          Explora nuestro menú y encuentra tu favorito
        </p>

        {/* Buscador */}
        <div style={{ position: "relative", maxWidth: 400 }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 16,
          }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar plato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "12px 12px 12px 42px",
              borderRadius: 12, border: "none", fontSize: 14,
              background: "rgba(255,255,255,0.25)", color: "#fff",
              outline: "none", boxSizing: "border-box",
              backdropFilter: "blur(4px)",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* ── Filtros de categoría ── */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: 13,
              background: activeCategory === "all" ? "#111" : "#f3f4f6",
              color: activeCategory === "all" ? "#fff" : "#6b7280",
              transition: "all 0.15s",
            }}
          >
            🍴 Todos
          </button>
          {categories.map((cat) => {
            const cfg = categoryConfig[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer",
                  fontWeight: 700, fontSize: 13,
                  background: isActive ? cfg.color : "#f3f4f6",
                  color: isActive ? "#fff" : "#6b7280",
                  transition: "all 0.15s",
                }}
              >
                {cfg.emoji} {cfg.label}
              </button>
            );
          })}
        </div>

        {/* ── Contador de resultados ── */}
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20, marginTop: 0 }}>
          {filtered.length} plato{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* ── Grid de platos ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
            <p style={{ fontSize: 16, fontWeight: 700 }}>No se encontraron platos</p>
            <p style={{ fontSize: 13 }}>Intenta con otro nombre o categoría</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}>
            {filtered.map((plato) => {
              const cfg = categoryConfig[plato.category];
              return (
                <div
                  key={plato.id}
                  style={{
                    background: "#fff", borderRadius: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    border: "1px solid #f1f5f9",
                    overflow: "hidden",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
                  }}
                >
                  {/* Área del emoji / imagen */}
                  <div style={{
                    background: cfg.bg, height: 110,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 52, position: "relative",
                  }}>
                    {plato.emoji}
                    {/* Badge de categoría */}
                    <span style={{
                      position: "absolute", top: 10, right: 10,
                      background: cfg.color, color: "#fff",
                      fontSize: 10, fontWeight: 800, padding: "2px 8px",
                      borderRadius: 20, letterSpacing: 0.3,
                    }}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "14px 16px 16px" }}>
                    <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: "#111" }}>
                      {plato.name}
                    </h3>
                    <p style={{ margin: "0 0 14px", fontSize: 12, color: "#9ca3af", lineHeight: 1.4 }}>
                      {cfg.emoji} {cfg.label}
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: "#111" }}>
                        {plato.price.toFixed(2)}€
                      </span>
                      <button
                        onClick={() => handleAgregar(plato)}
                        style={{
                          background: cfg.color, color: "#fff", border: "none",
                          borderRadius: 10, padding: "8px 14px",
                          cursor: "pointer", fontSize: 13, fontWeight: 700,
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      >
                        + Agregar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
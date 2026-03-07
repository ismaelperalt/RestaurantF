import { useState } from "react";
import { menu } from "../../types/data";
import { useCart } from "../../components/context/CartContext";
import { useOrders } from "../../components/context/OrdersContext";

const categoryConfig = {
  entrada: { label: "Entradas", emoji: "🥗", color: "#f59e0b", bg: "#fef3c7" },
  principal: { label: "Principales", emoji: "🍽️", color: "#ef4444", bg: "#fee2e2" },
  postre: { label: "Postres", emoji: "🍮", color: "#8b5cf6", bg: "#ede9fe" },
  bebida: { label: "Bebidas", emoji: "🥤", color: "#3b82f6", bg: "#dbeafe" },
};

const categories = ["entrada", "principal", "postre", "bebida"] as const;

// ── Modal confirmar pedido ────────────────────────────────────────────────────
function ConfirmModal({ onClose, onConfirm }: {
  onClose: () => void;
  onConfirm: (table: string, pax: string, waiter: string, notes: string) => void;
}) {
  const { cart, totalPrice, updateQty, removeFromCart, updateAllergyNote } = useCart();
  const [table, setTable] = useState("");
  const [pax, setPax] = useState("");
  const [waiter, setWaiter] = useState("");
  const [notes, setNotes] = useState("");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const isValid = table !== "" && pax !== "" && waiter !== "";

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, width: 440, maxWidth: "95vw",
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 12px 50px rgba(0,0,0,0.2)",
      }}>
        {/* Cabecera */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>🧾 Confirmar Pedido</h2>
            <button onClick={onClose} style={{
              background: "none", border: "none", fontSize: 18,
              cursor: "pointer", color: "#9ca3af",
            }}>✕</button>
          </div>
        </div>

        <div style={{ overflowY: "auto", padding: "16px 24px", flex: 1 }}>
          {/* Datos mesa */}
          <p style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", marginBottom: 10, marginTop: 0, letterSpacing: 1 }}>
            DATOS DE LA MESA
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[
              { label: "Mesa", value: table, set: setTable, type: "number", placeholder: "Ej: 5" },
              { label: "Comensales", value: pax, set: setPax, type: "number", placeholder: "Ej: 3" },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 4 }}>
                  {f.label}
                </label>
                <input
                  type={f.type} placeholder={f.placeholder} value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 10px", borderRadius: 8,
                    border: "1px solid #d1d5db", fontSize: 13,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>
          {[
            { label: "Camarero", value: waiter, set: setWaiter, placeholder: "Nombre del camarero" },
            { label: "Notas generales", value: notes, set: setNotes, placeholder: "Alergias, ocasión especial..." },
          ].map((f) => (
            <div key={f.label} style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 4 }}>
                {f.label}
              </label>
              <input
                type="text" placeholder={f.placeholder} value={f.value}
                onChange={(e) => f.set(e.target.value)}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: 8,
                  border: "1px solid #d1d5db", fontSize: 13,
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          {/* Platos */}
          <p style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", margin: "16px 0 10px", letterSpacing: 1 }}>
            PLATOS ({cart.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cart.map((c) => (
              <div key={c.menuItem.id} style={{
                border: "1px solid #e5e7eb", borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>
                    {c.menuItem.emoji} {c.menuItem.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => setExpandedItem(expandedItem === c.menuItem.id ? null : c.menuItem.id)}
                      style={{ background: c.allergyNote ? "#fef3c7" : "#f3f4f6", border: "none", borderRadius: 6, padding: "3px 7px", cursor: "pointer" }}
                      title="Nota alergia"
                    >⚠️</button>
                    <button onClick={() => updateQty(c.menuItem.id, c.qty - 1)}
                      style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: 700 }}>−</button>
                    <span style={{ fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{c.qty}</span>
                    <button onClick={() => updateQty(c.menuItem.id, c.qty + 1)}
                      style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: 700 }}>+</button>
                    <button onClick={() => removeFromCart(c.menuItem.id)}
                      style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "3px 7px", cursor: "pointer", color: "#ef4444" }}>✕</button>
                  </div>
                </div>
                {expandedItem === c.menuItem.id && (
                  <input type="text" placeholder="Ej: sin nueces..."
                    value={c.allergyNote}
                    onChange={(e) => updateAllergyNote(c.menuItem.id, e.target.value)}
                    style={{
                      width: "100%", marginTop: 8, padding: "6px 10px", borderRadius: 7,
                      border: "1px solid #fcd34d", fontSize: 12,
                      background: "#fffbeb", outline: "none", boxSizing: "border-box",
                    }}
                  />
                )}
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                  {c.menuItem.price.toFixed(2)}€ × {c.qty} = {(c.menuItem.price * c.qty).toFixed(2)}€
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            borderTop: "1px solid #e5e7eb", marginTop: 16, paddingTop: 14,
          }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Total estimado</span>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{totalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Botones */}
        <div style={{ padding: "16px 24px", display: "flex", gap: 10, borderTop: "1px solid #f1f5f9" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px 0", borderRadius: 8, border: "1px solid #d1d5db",
            background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14, color: "#374151",
          }}>Cancelar</button>
          <button
            onClick={() => isValid && onConfirm(table, pax, waiter, notes)}
            disabled={!isValid}
            style={{
              flex: 2, padding: "10px 0", borderRadius: 8, border: "none",
              background: isValid ? "#f59e0b" : "#fde68a",
              cursor: isValid ? "pointer" : "not-allowed",
              fontWeight: 700, fontSize: 14, color: "#fff",
            }}
          >✓ Enviar a cocina</button>
        </div>
      </div>
    </div>
  );
}

// ── PlatosPage ────────────────────────────────────────────────────────────────
export default function PlatosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { cart, addToCart, totalItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();

  const filtered = menu.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleConfirm = (table: string, pax: string, waiter: string, notes: string) => {
    const items = cart.map((c) => ({
      name: c.menuItem.name,
      qty: c.qty,
      emoji: c.menuItem.emoji,
      price: c.menuItem.price * c.qty,
      status: "pending" as const,
      allergyNote: c.allergyNote || undefined,
    }));
    addOrder({ table, pax, waiter, notes, items });
    clearCart();
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>

      {/* Toast éxito */}
      {showSuccess && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 200,
          background: "#10b981", color: "#fff", borderRadius: 12,
          padding: "14px 20px", fontWeight: 700, fontSize: 14,
          boxShadow: "0 4px 20px rgba(16,185,129,0.4)",
          display: "flex", alignItems: "center", gap: 8,
          animation: "slideIn 0.3s ease",
        }}>
          ✅ Pedido enviado a cocina — revisa en Gestionar Pedidos
        </div>
      )}

      {/* Header */}
      <div style={{
        background: "#fff",
        padding: "40px 32px 32px", color: "#774848",


      }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900 }}>🍴 Nuestra Carta</h1>

        <div style={{ position: "relative", maxWidth: 400 }}>
          <p style={{ margin: "0 0 24px", opacity: 0.9, fontSize: 15 }}>
            Selecciona tus platos y envíalos directo a cocina
          </p>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}></span>
          <input
            type="text" placeholder="Buscar tu favorito plato..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "12px 12px 12px 42px", borderRadius: 12,
              border: "none", fontSize: 14, background: "rgba(245,158,11,0.1)",
              color: "#010101", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "24px 32px 120px" }}>
        {/* Filtros */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <button onClick={() => setActiveCategory("all")} style={{
            padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 13,
            background: activeCategory === "all" ? "#111" : "#f3f4f6",
            color: activeCategory === "all" ? "#fff" : "#6b7280",
          }}>🍴 Todos</button>
          {categories.map((cat) => {
            const cfg = categoryConfig[cat];
            const isActive = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: 13,
                background: isActive ? cfg.color : "#f3f4f6",
                color: isActive ? "#fff" : "#6b7280",
              }}>{cfg.emoji} {cfg.label}</button>
            );
          })}
        </div>

        {/* Grid platos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 20,
        }}>
          {filtered.map((plato) => {
            const cfg = categoryConfig[plato.category];
            const inCart = cart.find((c) => c.menuItem.id === plato.id);
            return (
              <div key={plato.id} style={{
                background: "#fff", borderRadius: 16, overflow: "hidden",
                boxShadow: inCart ? "0 0 0 2px #f59e0b" : "0 2px 8px rgba(0,0,0,0.07)",
                border: inCart ? "1.5px solid #f59e0b" : "1px solid #f1f5f9",
                transition: "all 0.15s",
              }}>
                <div style={{
                  background: cfg.bg, height: 100,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 48, position: "relative",
                }}>

                  <img
                    src={plato.emoji}
                    alt={plato.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span style={{
                    position: "absolute", top: 8, right: 8,
                    background: cfg.color, color: "#fff",
                    fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 20,
                  }}>{cfg.label}</span>

                  {inCart && (
                    <span style={{
                      position: "absolute", top: 8, left: 8,
                      background: "#111", color: "#fff",
                      fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 20,
                    }}>×{inCart.qty}</span>
                  )}
                </div>
                <div style={{ padding: "12px 14px 14px" }}>
                  <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 800, color: "#111" }}>
                    {plato.name}
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 18, fontWeight: 900 }}>{plato.price.toFixed(2)}€</span>
                    <button
                      onClick={() => addToCart(plato)}
                      style={{
                        background: inCart ? "#111" : cfg.color,
                        color: "#fff", border: "none", borderRadius: 8,
                        padding: "7px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700,
                      }}
                    >
                      {inCart ? `+1 (${inCart.qty})` : "+ Agregar"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carrito flotante */}
      {totalItems > 0 && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#111", color: "#fff", borderRadius: 16,
          padding: "14px 24px", display: "flex", alignItems: "center", gap: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)", zIndex: 50, minWidth: 300,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>
              🛒 {totalItems} ítem{totalItems !== 1 ? "s" : ""}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>
              {totalPrice.toFixed(2)}€ estimado
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              marginLeft: "auto", background: "#f59e0b", color: "#fff",
              border: "none", borderRadius: 10, padding: "10px 20px",
              cursor: "pointer", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap",
            }}
          >
            Enviar a cocina →
          </button>
        </div>
      )}

      {showModal && (
        <ConfirmModal onClose={() => setShowModal(false)} onConfirm={handleConfirm} />
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
      `}</style>
    </div>
  );
}

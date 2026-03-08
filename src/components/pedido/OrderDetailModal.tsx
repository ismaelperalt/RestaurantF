import { useState } from "react";
import type { Order, OrderItem } from "../../types/types";
import type { MenuItem } from "../../types/data";
import { menu } from "../../types/data";

interface Props {
  order: Order;
  onClose: () => void;
  onItemStatusChange: (orderId: number, itemIndex: number, newStatus: OrderItem["status"]) => void;
  onAddItems: (orderId: number, newItems: OrderItem[]) => void;
}

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  pending:   { label: "Pendiente",  bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  preparing: { label: "Preparando", bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  ready:     { label: "Listo",      bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  served:    { label: "Servido",    bg: "#f3f4f6", text: "#6b7280", border: "#d1d5db" },
};

const statusCycle: Record<string, OrderItem["status"]> = {
  pending: "preparing", preparing: "ready", ready: "served", served: "served",
};

const categoryConfig = {
  entrada:   { label: "Entradas",    emoji: "🥗", color: "#f59e0b", bg: "#fef3c7" },
  principal: { label: "Principales", emoji: "🍽️", color: "#ef4444", bg: "#fee2e2" },
  postre:    { label: "Postres",     emoji: "🍮", color: "#8b5cf6", bg: "#ede9fe" },
  bebida:    { label: "Bebidas",     emoji: "🥤", color: "#3b82f6", bg: "#dbeafe" },
};

const categoryOrder = ["entrada", "principal", "postre", "bebida"] as const;

export default function OrderDetailModal({ order, onClose, onItemStatusChange, onAddItems }: Props) {
  const [tab, setTab] = useState<"detail" | "add">("detail");
  const [activeCategory, setActiveCategory] = useState<string>("entrada");
  const [selectedItems, setSelectedItems] = useState<{ menuItem: MenuItem; qty: number; allergyNote: string }[]>([]);

  const total = order.items.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleAddToSelection = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((s) => s.menuItem.id === item.id);
      if (exists) return prev.map((s) => s.menuItem.id === item.id ? { ...s, qty: s.qty + 1 } : s);
      return [...prev, { menuItem: item, qty: 1, allergyNote: "" }];
    });
  };

  const handleQtyChange = (id: number, qty: number) => {
    if (qty <= 0) setSelectedItems((prev) => prev.filter((s) => s.menuItem.id !== id));
    else setSelectedItems((prev) => prev.map((s) => s.menuItem.id === id ? { ...s, qty } : s));
  };

  const handleConfirmAdd = () => {
    if (selectedItems.length === 0) return;
    const newItems: OrderItem[] = [];
    selectedItems.forEach((s) => {
      for (let i = 0; i < s.qty; i++) {
        newItems.push({
          name: s.menuItem.name,
          qty: 1,
          emoji: s.menuItem.emoji,
          price: s.menuItem.price,
          status: "pending",
          allergyNote: s.allergyNote || undefined,
          category: s.menuItem.category, // ← fix
        });
      }
    });
    onAddItems(order.id, newItems);
    setSelectedItems([]);
    setTab("detail");
  };

  const filteredMenu = menu.filter((m) => m.category === activeCategory);
  const hasCategories = order.items.some((i) => i.category);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, width: 500, maxWidth: "95vw",
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 12px 50px rgba(0,0,0,0.2)", overflow: "hidden",
      }}>

        {/* Cabecera */}
        <div style={{
          background: order.delayed
            ? "linear-gradient(135deg, #ef4444, #dc2626)"
            : "linear-gradient(135deg, #1e1e2e, #2a2a3e)",
          padding: "20px 24px", color: "#fff",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>Mesa #{order.table}</h2>
                {order.delayed && (
                  <span style={{ background: "#fff", color: "#ef4444", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 6 }}>
                    DEMORADO
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 20, fontSize: 13, opacity: 0.85 }}>
                <span>👤 {order.pax} pax</span>
                <span>🧑‍🍳 {order.waiter}</span>
                <span style={{ color: order.delayed ? "#fca5a5" : "#f59e0b", fontWeight: 700 }}>⏱ {order.time}m</span>
              </div>
            </div>
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
              width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
          {order.notes && (
            <div style={{
              marginTop: 12, background: "rgba(255,255,255,0.1)",
              borderRadius: 8, padding: "8px 12px", fontSize: 12,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              💬 {order.notes}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
          {[
            { key: "detail", label: "📋 Detalle del pedido" },
            { key: "add",    label: "➕ Agregar platos" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as "detail" | "add")} style={{
              flex: 1, padding: "12px 0", border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: 13, background: "transparent",
              color: tab === t.key ? "#f59e0b" : "#6b7280",
              borderBottom: tab === t.key ? "2px solid #f59e0b" : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px" }}>

          {/* TAB: Detalle */}
          {tab === "detail" && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", marginBottom: 12, marginTop: 0, letterSpacing: 1 }}>
                PLATOS ({order.items.length})
              </p>

              {/* CON categorías */}
              {hasCategories && categoryOrder.map((cat) => {
                const catItems = order.items.filter((item) => item.category === cat);
                if (catItems.length === 0) return null;
                const cfg = categoryConfig[cat];
                return (
                  <div key={cat} style={{ marginBottom: 16 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      marginBottom: 8, paddingBottom: 4,
                      borderBottom: `1.5px solid ${cfg.color}40`,
                    }}>
                      <span>{cfg.emoji}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: cfg.color, letterSpacing: 0.5 }}>
                        {cfg.label.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {catItems.map((item) => {
                        const realIndex = order.items.findIndex((o) => o === item);
                        const icfg = statusConfig[item.status];
                        const isServed = item.status === "served";
                        return (
                          <div key={realIndex} style={{
                            border: "1px solid #e5e7eb", borderRadius: 12,
                            padding: "12px 14px", background: "#fafafa",
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                <span style={{ fontSize: 14, fontWeight: 700, color: isServed ? "#9ca3af" : "#111", display: "flex", alignItems: "center", gap: 6 }}>
                                  {item.emoji.startsWith("http") ? (
                                    <img src={item.emoji} alt={item.name} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 6 }} />
                                  ) : (
                                    <span style={{ fontSize: 20 }}>{item.emoji}</span>
                                  )}
                                  {item.qty}x {item.name}
                                </span>
                                {item.allergyNote && (
                                  <div style={{ fontSize: 11, color: "#b45309", marginTop: 2 }}>⚠️ {item.allergyNote}</div>
                                )}
                                {item.price && (
                                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{item.price.toFixed(2)}€</div>
                                )}
                              </div>
                              <button
                                onClick={() => !isServed && onItemStatusChange(order.id, realIndex, statusCycle[item.status])}
                                style={{
                                  fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
                                  cursor: isServed ? "default" : "pointer",
                                  background: icfg.bg, color: icfg.text, border: `1px solid ${icfg.border}`,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {icfg.label} {!isServed && "›"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* SIN categorías */}
              {!hasCategories && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {order.items.map((item, i) => {
                    const cfg = statusConfig[item.status];
                    const isServed = item.status === "served";
                    return (
                      <div key={i} style={{
                        border: "1px solid #e5e7eb", borderRadius: 12,
                        padding: "12px 14px", background: "#fafafa",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: isServed ? "#9ca3af" : "#111", display: "flex", alignItems: "center", gap: 6 }}>
                              {item.emoji.startsWith("http") ? (
                                <img src={item.emoji} alt={item.name} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 6 }} />
                              ) : (
                                <span style={{ fontSize: 20 }}>{item.emoji}</span>
                              )}
                              {item.qty}x {item.name}
                            </span>
                            {item.allergyNote && (
                              <div style={{ fontSize: 11, color: "#b45309", marginTop: 2 }}>⚠️ {item.allergyNote}</div>
                            )}
                          </div>
                          <button
                            onClick={() => !isServed && onItemStatusChange(order.id, i, statusCycle[item.status])}
                            style={{
                              fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
                              cursor: isServed ? "default" : "pointer",
                              background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {cfg.label} {!isServed && "›"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Total */}
              {total > 0 && (
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  borderTop: "1px solid #e5e7eb", marginTop: 16, paddingTop: 14,
                }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#374151" }}>Total estimado</span>
                  <span style={{ fontWeight: 900, fontSize: 20, color: "#111" }}>{total.toFixed(2)}€</span>
                </div>
              )}
            </div>
          )}

          {/* TAB: Agregar platos */}
          {tab === "add" && (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {categoryOrder.map((cat) => {
                  const cfg = categoryConfig[cat];
                  const isActive = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                      padding: "6px 14px", borderRadius: 20, border: "none",
                      cursor: "pointer", fontWeight: 700, fontSize: 12,
                      background: isActive ? cfg.color : "#f3f4f6",
                      color: isActive ? "#fff" : "#6b7280",
                    }}>
                      {cfg.emoji} {cfg.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {filteredMenu.map((item) => {
                  const sel = selectedItems.find((s) => s.menuItem.id === item.id);
                  return (
                    <div key={item.id} style={{
                      border: sel ? "1.5px solid #f59e0b" : "1px solid #e5e7eb",
                      borderRadius: 10, padding: "10px 12px",
                      background: sel ? "#fffbeb" : "#fff",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                          {item.emoji.startsWith("http") ? (
                            <img src={item.emoji} alt={item.name} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 6 }} />
                          ) : (
                            <span style={{ fontSize: 18 }}>{item.emoji}</span>
                          )}
                          {item.name}
                        </span>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>{item.price?.toFixed(2)}€</div>
                      </div>
                      {!sel ? (
                        <button onClick={() => handleAddToSelection(item)} style={{
                          background: "#f59e0b", color: "#fff", border: "none",
                          borderRadius: 8, padding: "5px 12px",
                          cursor: "pointer", fontSize: 12, fontWeight: 700,
                        }}>+ Agregar</button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => handleQtyChange(item.id, sel.qty - 1)} style={{
                            width: 26, height: 26, borderRadius: 6, border: "1px solid #d1d5db",
                            background: "#fff", cursor: "pointer", fontWeight: 700,
                          }}>−</button>
                          <span style={{ fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{sel.qty}</span>
                          <button onClick={() => handleQtyChange(item.id, sel.qty + 1)} style={{
                            width: 26, height: 26, borderRadius: 6, border: "1px solid #d1d5db",
                            background: "#fff", cursor: "pointer", fontWeight: 700,
                          }}>+</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedItems.length > 0 && (
                <div style={{
                  background: "#f9fafb", borderRadius: 10,
                  padding: "12px 14px", border: "1px solid #e5e7eb",
                }}>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
                    {selectedItems.reduce((a, s) => a + s.qty, 0)} ítem(s) seleccionados
                  </div>
                  <button onClick={handleConfirmAdd} style={{
                    width: "100%", padding: "10px 0", borderRadius: 8, border: "none",
                    background: "#f59e0b", cursor: "pointer", fontWeight: 800, fontSize: 14, color: "#fff",
                  }}>
                    ✓ Agregar al pedido
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
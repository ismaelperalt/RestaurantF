import { useState } from "react";
import type { MenuItem } from "../../types/data";
import { menu } from "../../types/data";
import type { OrderItem } from "../../types/types";

// ─── Tipos internos del formulario ───────────────────────────────────────────

interface FormData {
  table: string;
  pax: string;
  waiter: string;
  notes: string;
}

interface SelectedItem {
  menuItem: MenuItem;
  qty: number;
  allergyNote: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (data: {
    table: string;
    pax: string;
    waiter: string;
    notes: string;
    items: OrderItem[];
  }) => void;
}

// ─── Configuración visual por categoría ──────────────────────────────────────

const categoryConfig: Record<string, { label: string; emoji: string }> = {
  entrada: { label: "Entradas", emoji: "🥗" },
  principal: { label: "Principales", emoji: "🍽️" },
  postre: { label: "Postres", emoji: "🍮" },
  bebida: { label: "Bebidas", emoji: "🥤" },
};

const categories = ["entrada", "principal", "postre", "bebida"];

// ─── Subcomponente: Paso 1 ────────────────────────────────────────────────────

function Step1({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  const fields: { label: string; key: keyof FormData; type: string; placeholder: string }[] = [
    { label: "Número de Mesa", key: "table", type: "number", placeholder: "Ej: 5" },
    { label: "Comensales", key: "pax", type: "number", placeholder: "Ej: 3" },
    { label: "Camarero", key: "waiter", type: "text", placeholder: "Nombre del camarero" },
    { label: "Notas generales", key: "notes", type: "text", placeholder: "Alergias generales, ocasión especial..." },
  ];

  return (
    <div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, marginTop: 0 }}>
        Información básica de la mesa
      </p>
      {fields.map((f) => (
        <div key={f.key} style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 4 }}>
            {f.label}
          </label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            value={form[f.key]}
            onChange={(e) => onChange(f.key, e.target.value)}
            style={{
              width: "100%", padding: "9px 12px", borderRadius: 8,
              border: "1px solid #d1d5db", fontSize: 14,
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Subcomponente: Paso 2 ────────────────────────────────────────────────────

function Step2({
  selected,
  onAdd,
  onRemove,
  onQtyChange,
  onAllergyChange,
}: {
  selected: SelectedItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
  onAllergyChange: (id: number, note: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("entrada");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Filtra los platos del menú según la categoría activa
  const filtered = menu.filter((m) => m.category === activeCategory);

  

  return (
    <div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, marginTop: 0 }}>
        Selecciona los platos del pedido
      </p>

      {/* Tabs de categoría */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {categories.map((cat) => {
          const cfg = categoryConfig[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 700,
                background: isActive ? "#f59e0b" : "#f3f4f6",
                color: isActive ? "#fff" : "#6b7280",
                transition: "all 0.15s",
              }}
            >
              {cfg.emoji} {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Lista de platos de la categoría */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 260, overflowY: "auto" }}>
        {filtered.map((item) => {
          const sel = selected.find((s) => s.menuItem.id === item.id);
          const isExp = expandedItem === item.id;

          return (
            <div
              key={item.id}
              style={{
                border: sel ? "1.5px solid #f59e0b" : "1px solid #e5e7eb",
                borderRadius: 10, padding: "10px 12px",
                background: sel ? "#fffbeb" : "#fff",
                transition: "all 0.15s",
              }}
            >
              {/* Fila principal del plato */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {item.emoji.startsWith("http") ? (
                    <img src={item.emoji} alt={item.name} style={{
                      width: 48, height: 48, objectFit: "cover", borderRadius: 8,
                    }} />
                  ) : (
                    <span style={{ fontSize: 20 }}>{item.emoji}</span>
                  )}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{item.price.toFixed(2)} €</div>
                  </div>
                </div>

                {/* Botón agregar o control de cantidad */}
                {!sel ? (
                  <button
                    onClick={() => onAdd(item)}
                    style={{
                      background: "#f59e0b", color: "#fff", border: "none",
                      borderRadius: 8, padding: "5px 12px", cursor: "pointer",
                      fontSize: 13, fontWeight: 700,
                    }}
                  >
                    + Agregar
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {/* Botón nota de alergia */}
                    <button
                      onClick={() => setExpandedItem(isExp ? null : item.id)}
                      title="Agregar nota de alergia"
                      style={{
                        background: sel.allergyNote ? "#fef3c7" : "#f3f4f6",
                        border: "none", borderRadius: 6, padding: "4px 8px",
                        cursor: "pointer", fontSize: 13,
                      }}
                    >
                      ⚠️
                    </button>

                    {/* Control de cantidad */}
                    <button
                      onClick={() => sel.qty === 1 ? onRemove(item.id) : onQtyChange(item.id, sel.qty - 1)}
                      style={{
                        width: 26, height: 26, borderRadius: 6, border: "1px solid #d1d5db",
                        background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14,
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 700, minWidth: 16, textAlign: "center" }}>
                      {sel.qty}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, sel.qty + 1)}
                      style={{
                        width: 26, height: 26, borderRadius: 6, border: "1px solid #d1d5db",
                        background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14,
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              {/* Campo de alergia expandible */}
              {sel && isExp && (
                <div style={{ marginTop: 10 }}>
                  <input
                    type="text"
                    placeholder="Ej: sin nueces, sin gluten..."
                    value={sel.allergyNote}
                    onChange={(e) => onAllergyChange(item.id, e.target.value)}
                    style={{
                      width: "100%", padding: "7px 10px", borderRadius: 7,
                      border: "1px solid #fcd34d", fontSize: 12,
                      background: "#fffbeb", outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contador de platos seleccionados */}
      {selected.length > 0 && (
        <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280", textAlign: "right" }}>
          {selected.length} tipo(s) de plato · {selected.reduce((acc, s) => acc + s.qty, 0)} ítems en total
        </div>
      )}
    </div>
  );
}

// ─── Subcomponente: Paso 3 ────────────────────────────────────────────────────

function Step3({ form, selected }: { form: FormData; selected: SelectedItem[] }) {
  const total = selected.reduce((acc, s) => acc + s.menuItem.price * s.qty, 0);

  return (
    <div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, marginTop: 0 }}>
        Revisa el pedido antes de confirmar
      </p>

      {/* Info de la mesa */}
      <div style={{
        background: "#f9fafb", borderRadius: 10, padding: "12px 14px", marginBottom: 14,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
      }}>
        <div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>MESA</div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>#{form.table}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>COMENSALES</div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>{form.pax} pax</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>CAMARERO</div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>{form.waiter}</div>
        </div>
        {form.notes && (
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>NOTA</div>
            <div style={{ fontSize: 13, color: "#92400e" }}>💬 {form.notes}</div>
          </div>
        )}
      </div>

      {/* Lista de platos */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
        {selected.map((s) => (
          <div key={s.menuItem.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "8px 10px", borderRadius: 8, background: "#f9fafb",
          }}>
            <div>
              <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                {s.menuItem.emoji.startsWith("http") ? (
                  <img src={s.menuItem.emoji} alt={s.menuItem.name} style={{
                    width: 32, height: 32, objectFit: "cover", borderRadius: 6,
                  }} />
                ) : (
                  <span style={{ fontSize: 20 }}>{s.menuItem.emoji}</span>
                )}
                {s.qty}x {s.menuItem.name}
              </span>
              {s.allergyNote && (
                <div style={{ fontSize: 11, color: "#b45309", marginTop: 2 }}>
                  ⚠️ {s.allergyNote}
                </div>
              )}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
              {(s.menuItem.price * s.qty).toFixed(2)} €
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 12,
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Total estimado</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{total.toFixed(2)} €</span>
      </div>
    </div>
  );
}

// ─── Componente principal: NewOrderModal ─────────────────────────────────────

export default function NewOrderModal({ onClose, onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({ table: "", pax: "", waiter: "", notes: "" });
  const [selected, setSelected] = useState<SelectedItem[]>([]);

  // Actualiza un campo del formulario
  const handleFormChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Valida que el paso 1 esté completo
  const step1Valid = form.table !== "" && form.pax !== "" && form.waiter !== "";

  // Valida que el paso 2 tenga al menos un plato
  const step2Valid = selected.length > 0;

  // Agrega un plato al pedido con cantidad 1
  const handleAdd = (item: MenuItem) => {
    setSelected((prev) => [...prev, { menuItem: item, qty: 1, allergyNote: "" }]);
  };

  // Elimina un plato del pedido
  const handleRemove = (id: number) => {
    setSelected((prev) => prev.filter((s) => s.menuItem.id !== id));
  };

  // Cambia la cantidad de un plato
  const handleQtyChange = (id: number, qty: number) => {
    setSelected((prev) => prev.map((s) => s.menuItem.id === id ? { ...s, qty } : s));
  };

  // Actualiza la nota de alergia de un plato
  const handleAllergyChange = (id: number, note: string) => {
    setSelected((prev) => prev.map((s) => s.menuItem.id === id ? { ...s, allergyNote: note } : s));
  };

  // Convierte los SelectedItem al formato OrderItem que espera App/KitchenView
  const handleSubmit = () => {
  const items: OrderItem[] = [];
  selected.forEach((s) => {
    for (let i = 0; i < s.qty; i++) {
      items.push({
        name: s.menuItem.name,
        qty: 1,
        emoji: s.menuItem.emoji,
        price: s.menuItem.price,
        status: "pending" as const,
        allergyNote: s.allergyNote || undefined,
         category: s.menuItem.category, // ← ¿lo tienes?
        
      });
    }
  });
  onSubmit({ table: form.table, pax: form.pax, waiter: form.waiter, notes: form.notes, items });
  onClose();
};

  const stepTitles = ["Info de mesa", "Platos", "Resumen"];

  return (
    // Fondo oscuro
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, width: 440, maxWidth: "95vw",
        boxShadow: "0 12px 50px rgba(0,0,0,0.2)", overflow: "hidden",
      }}>

        {/* ── Cabecera del modal ── */}
        <div style={{ padding: "20px 24px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Nuevo Pedido</h2>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#9ca3af" }}
            >
              ✕
            </button>
          </div>

          {/* ── Indicador de pasos ── */}
          <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>
            {stepTitles.map((title, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isDone = step > num;
              return (
                <div key={num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {/* Línea conectora */}
                  {i < stepTitles.length - 1 && (
                    <div style={{
                      position: "absolute", top: 14, left: "50%", width: "100%", height: 2,
                      background: isDone ? "#f59e0b" : "#e5e7eb", zIndex: 0,
                    }} />
                  )}
                  {/* Círculo del paso */}
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", zIndex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800,
                    background: isActive ? "#f59e0b" : isDone ? "#f59e0b" : "#f3f4f6",
                    color: isActive || isDone ? "#fff" : "#9ca3af",
                    border: isActive ? "2px solid #d97706" : "2px solid transparent",
                  }}>
                    {isDone ? "✓" : num}
                  </div>
                  <span style={{ fontSize: 10, color: isActive ? "#f59e0b" : "#9ca3af", marginTop: 4, fontWeight: 700 }}>
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Contenido del paso actual ── */}
        <div style={{ padding: "0 24px", maxHeight: 380, overflowY: "auto" }}>
          {step === 1 && <Step1 form={form} onChange={handleFormChange} />}
          {step === 2 && (
            <Step2
              selected={selected}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onQtyChange={handleQtyChange}
              onAllergyChange={handleAllergyChange}
            />
          )}
          {step === 3 && <Step3 form={form} selected={selected} />}
        </div>

        {/* ── Botones de navegación ── */}
        <div style={{ padding: "16px 24px 24px", display: "flex", gap: 10 }}>
          {/* Botón izquierdo: cancelar en paso 1, atrás en el resto */}
          <button
            onClick={step === 1 ? onClose : () => setStep((s) => s - 1)}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8,
              border: "1px solid #d1d5db", background: "#fff",
              cursor: "pointer", fontWeight: 700, fontSize: 14, color: "#374151",
            }}
          >
            {step === 1 ? "Cancelar" : "← Atrás"}
          </button>

          {/* Botón derecho: siguiente o confirmar */}
          <button
            onClick={step === 3 ? handleSubmit : () => setStep((s) => s + 1)}
            disabled={step === 1 ? !step1Valid : step === 2 ? !step2Valid : false}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8, border: "none",
              background: (step === 1 && !step1Valid) || (step === 2 && !step2Valid) ? "#fde68a" : "#f59e0b",
              cursor: (step === 1 && !step1Valid) || (step === 2 && !step2Valid) ? "not-allowed" : "pointer",
              fontWeight: 700, fontSize: 14, color: "#fff",
            }}
          >
            {step === 3 ? "✓ Confirmar pedido" : "Siguiente →"}
          </button>
        </div>

      </div>
    </div>
  );
}
import Reviews from "./Reviews";

const valores = [
  { icon: "❤️", label: "Pasión por la comida"           },
  { icon: "🏆", label: "Compromiso con la calidad"       },
  { icon: "🤝", label: "Trabajo en equipo"               },
  { icon: "💡", label: "Innovación constante"            },
  { icon: "⭐", label: "Atención al cliente excepcional" },
];

export default function Nosotros() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>

      {/* ── Header simple ── */}
      <div style={{
        padding: "52px 40px 40px",
        textAlign: "center",
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
      }}>
        <span style={{
          fontSize: 18, fontWeight: 800, letterSpacing: 2,
          color: "#f59e0b", textTransform: "uppercase",
        }}>
          🍴 Nuestra Historia
        </span>
        <h1 style={{
          margin: "10px 0 14px",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 900, color: "#111",
        }}>
          Sobre Nosotros
        </h1>
        <p style={{
          margin: "0 auto", maxWidth: 520,
          fontSize: 15, color: "#6b7280", lineHeight: 1.8,
        }}>
          Donde la pasión por la buena comida se une con un servicio excepcional.
          Cada día trabajamos para crear experiencias memorables.
        </p>

        {/* Línea decorativa */}
        <div style={{
          width: 48, height: 3, background: "#f59e0b",
          borderRadius: 2, margin: "24px auto 0",
        }} />
      </div>

      {/* ── Grid principal ── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "48px 32px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
      }}
        className="nosotros-grid"
      >

        {/* ── Columna izquierda ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Misión */}
          <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                background: "#fef3c7", borderRadius: 10,
                padding: "6px 10px", fontSize: 18,
              }}>🎯</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#111" }}>
                Nuestra Misión
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>
              Brindar una experiencia gastronómica única, combinando calidad,
              sabor y atención personalizada en cada visita.
            </p>
          </div>

          {/* Visión */}
          <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                background: "#fef3c7", borderRadius: 10,
                padding: "6px 10px", fontSize: 18,
              }}>🚀</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#111" }}>
                Nuestra Visión
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>
              Ser reconocidos como el restaurante líder en innovación culinaria
              y servicio al cliente en nuestra región.
            </p>
          </div>

          {/* Valores */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{
                background: "#fef3c7", borderRadius: 10,
                padding: "6px 10px", fontSize: 18,
              }}>💎</span>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#111" }}>
                Nuestros Valores
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {valores.map((v) => (
                <div key={v.label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", borderRadius: 10,
                  background: "#fff", border: "1px solid #e5e7eb",
                }}>
                  <span style={{ fontSize: 16 }}>{v.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Columna derecha — Reviews ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{
              background: "#fef3c7", borderRadius: 10,
              padding: "6px 10px", fontSize: 18,
            }}>💬</span>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#111" }}>
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <Reviews />
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .nosotros-grid {
            grid-template-columns: 1fr !important;
            padding: 24px 16px !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("/src/assets/background1.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Partículas decorativas */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 200, height: 200, borderRadius: "50%",
        background: "rgba(245,158,11,0.08)",
        filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "8%",
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(245,158,11,0.06)",
        filter: "blur(80px)",
      }} />

      {/* Badge superior */}
      <div style={{
        background: "rgba(245,158,11,0.15)",
        border: "1px solid rgba(245,158,11,0.4)",
        borderRadius: 30, padding: "6px 18px",
        color: "#f59e0b", fontSize: 12, fontWeight: 800,
        letterSpacing: 2, textTransform: "uppercase",
        marginBottom: 24, backdropFilter: "blur(8px)",
      }}>
        🍴 Bienvenido a RestaurantF
      </div>

      {/* Título principal */}
      <h1 style={{
        fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
        fontWeight: 900, color: "#fff",
        margin: "0 0 8px",
        textAlign: "center",
        lineHeight: 1.1,
        textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        padding: "0 20px",
      }}>
        Cocina
        <span style={{
          color: "#f59e0b",
          display: "block",
        }}>
          Tradicional
        </span>
      </h1>

      {/* Línea decorativa */}
      <div style={{
        width: 60, height: 3, background: "#f59e0b",
        borderRadius: 2, margin: "20px auto",
      }} />

      {/* Subtítulo */}
      <p style={{
        fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
        color: "rgba(255,255,255,0.85)",
        textAlign: "center", maxWidth: 480,
        lineHeight: 1.7, margin: "0 0 40px",
        padding: "0 24px",
        textShadow: "0 2px 10px rgba(0,0,0,0.4)",
      }}>
        Con ese toque de sabor que te hace volver cada día
      </p>

      {/* Botones */}
      <div style={{
        display: "flex", gap: 14, flexWrap: "wrap",
        justifyContent: "center", padding: "0 20px",
      }}>
        <Link to="/platos" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              border: "none", borderRadius: 14,
              padding: "14px 32px", fontSize: 15,
              color: "#fff", cursor: "pointer",
              fontWeight: 800, letterSpacing: 0.5,
              boxShadow: "0 4px 20px rgba(245,158,11,0.5)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(245,158,11,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(245,158,11,0.5)";
            }}
          >
            🍽️ Ver Carta
          </button>
        </Link>

        <Link to="/pedido" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 14, padding: "14px 32px",
              fontSize: 15, color: "#fff", cursor: "pointer",
              fontWeight: 800, letterSpacing: 0.5,
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            📋 Hacer Pedido
          </button>
        </Link>
      </div>

      {/* Stats decorativos */}
      <div style={{
        position: "absolute", bottom: 40,
        display: "flex", gap: 40, flexWrap: "wrap",
        justifyContent: "center", padding: "0 20px",
      }}>
        {[
          { value: "15+", label: "Años de experiencia" },
          { value: "50+", label: "Platos únicos"       },
          { value: "98%", label: "Clientes satisfechos" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "1.6rem", fontWeight: 900, color: "#f59e0b",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.7)",
              fontWeight: 600, letterSpacing: 0.5,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
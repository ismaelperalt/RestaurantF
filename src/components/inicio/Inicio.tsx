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
        background: "rgba(192, 149, 76, 0.15)",
        border: "1px solid rgba(245,158,11,0.4)",
        borderRadius: 30, padding: "6px 18px",
        color: "#ccbb9e", fontSize: 14, fontWeight: 900,
        letterSpacing: 2, textTransform: "uppercase",
        marginBottom: 24, backdropFilter: "blur(8px)",
      }}>
        🍴 Bienvenido a RestaurantF
      </div>

      {/* Título principal */}
      <div style={{ position: "relative", display: "inline-block", padding: "16px 32px" }}
        className="titulo-animado"
      >
        <h1 style={{
          fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
          fontWeight: 900, color: "#fff",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.1,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          position: "relative", zIndex: 1,
        }}>
          Cocina
          <span style={{
            color: "#f59e0b",
            display: "block",
          }}>
            Tradicional
          </span>
        </h1>
      </div>

      {/* CSS de la animación */}
      <style>{`
  .titulo-animado::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(
      90deg,
      #f59e0b,
      #fff,
      #f59e0b,
      #d97706,
      #f59e0b
    );
    background-size: 300% 300%;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: borderMove 3s linear infinite;
  }

  @keyframes borderMove {
    0%   { background-position: 0% 50%;   }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%;   }
  }
`}</style>

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
        display: "flex", gap: 16, flexWrap: "wrap",
        justifyContent: "center", padding: "0 20px",
      }}>

        <Link to="/platos" style={{ textDecoration: "none" }}>
          <button className="btn-primary">
            <span className="btn-icon">🍽️</span>
            <span>Ver Carta</span>
            <span className="btn-arrow">→</span>
          </button>
        </Link>

        <Link to="/pedido" style={{ textDecoration: "none" }}>
          <button className="btn-secondary">
            <span className="btn-icon">📋</span>
            <span>Hacer Pedido</span>
          </button>
        </Link>

      </div>

      <style>{`
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border: none;
    border-radius: 14px;
    padding: 15px 28px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    font-weight: 800;
    letter-spacing: 0.4px;
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease;
    box-shadow: 0 4px 15px rgba(245,158,11,0.4),
                0 1px 0 rgba(255,255,255,0.2) inset;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(
      90deg, transparent,
      rgba(255,255,255,0.25),
      transparent
    );
    transition: left 0.4s ease;
  }
  .btn-primary:hover::before { left: 100%; }
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(245,158,11,0.55),
                0 1px 0 rgba(255,255,255,0.2) inset;
  }
  .btn-primary:active { transform: translateY(-1px); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.08);
    border: 1.5px solid rgba(255,255,255,0.3);
    border-radius: 14px;
    padding: 15px 28px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    font-weight: 800;
    letter-spacing: 0.4px;
    backdrop-filter: blur(10px);
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }
  .btn-secondary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(
      90deg, transparent,
      rgba(255,255,255,0.12),
      transparent
    );
    transition: left 0.4s ease;
  }
  .btn-secondary:hover::before { left: 100%; }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.16);
    border-color: rgba(255,255,255,0.6);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  .btn-secondary:active { transform: translateY(-1px); }

  .btn-arrow {
    display: inline-block;
    transition: transform 0.2s ease;
  }
  .btn-primary:hover .btn-arrow {
    transform: translateX(5px);
  }

  .btn-icon {
    display: inline-block;
    transition: transform 0.2s ease;
  }
  .btn-primary:hover .btn-icon,
  .btn-secondary:hover .btn-icon {
    transform: scale(1.2) rotate(-5deg);
  }

  @media (max-width: 480px) {
    .btn-primary, .btn-secondary {
      padding: 13px 22px;
      font-size: 14px;
      width: 100%;
      justify-content: center;
    }
  }
`}</style>

      {/* Stats decorativos */}
      <div style={{
        position: "absolute", bottom: 40,
        display: "flex", gap: 40, flexWrap: "wrap",
        justifyContent: "center", padding: "0 20px",
      }}>
        {[
          { value: "15+", label: "Años de experiencia" },
          { value: "50+", label: "Platos únicos" },
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
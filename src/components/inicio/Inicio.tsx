import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("/src/assets/background1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Partículas decorativas */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(245,158,11,0.08)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(245,158,11,0.06)",
          filter: "blur(80px)",
          pointerEvents: "none"
        }}
      />

      {/* Badge */}
      <div
        style={{
          background: "rgba(192, 149, 76, 0.15)",
          border: "1px solid rgba(245,158,11,0.4)",
          borderRadius: 30,
          padding: "6px 18px",
          color: "#ccbb9e",
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 24,
          backdropFilter: "blur(8px)",
        }}
      >
        🍴 Bienvenido a RestaurantF
      </div>

      {/* Título */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          padding: "16px 32px",
        }}
        className="titulo-animado"
      >
        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            fontWeight: 900,
            color: "#fff",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.1,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Cocina
          <span
            style={{
              color: "#f59e0b",
              display: "block",
            }}
          >
            Tradicional
          </span>
        </h1>
      </div>

      {/* Animación */}
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

      {/* Línea */}
      <div
        style={{
          width: 60,
          height: 3,
          background: "#f59e0b",
          borderRadius: 2,
          margin: "20px auto",
        }}
      />

      {/* Subtítulo */}
      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "rgba(255,255,255,0.85)",
          textAlign: "center",
          maxWidth: 480,
          lineHeight: 1.7,
          margin: "0 0 40px",
          padding: "0 24px",
          textShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        Con ese toque de sabor que te hace volver cada día
      </p>

      {/* Botones */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <Link to="/platos" style={{ textDecoration: "none" }}>
          <button className="btn-primary">
            🍽️ Ver Carta →
          </button>
        </Link>

        <Link to="/pedido" style={{ textDecoration: "none" }}>
          <button className="btn-secondary">
            📋 Hacer Pedido
          </button>
        </Link>
      </div>

      {/* Botones CSS */}
      <style>{`
.btn-primary {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border: none;
  border-radius: 14px;
  padding: 15px 28px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  font-weight: 800;
  transition: 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
}

.btn-secondary {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 14px;
  padding: 15px 28px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  font-weight: 800;
  transition: 0.3s;
}

.btn-secondary:hover {
  transform: translateY(-3px);
}

@media (max-width: 768px) {

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

}
`}</style>

      {/* Stats */}
      <div
        style={{
          marginTop: 60,
          display: "flex",
          gap: 50,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        {[
          { value: "15+", label: "Años de experiencia" },
          { value: "50+", label: "Platos únicos" },
          { value: "98%", label: "Clientes satisfechos" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "3rem",
                fontWeight: 900,
                color: "#f59e0b",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
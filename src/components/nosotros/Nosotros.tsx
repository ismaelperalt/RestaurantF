import Reviews from "./Reviews";
import { Link } from "react-router-dom";

const valores = [
  { icon: "❤️", label: "Pasión por la comida" },
  { icon: "🏆", label: "Compromiso con la calidad" },
  { icon: "🤝", label: "Trabajo en equipo" },
  { icon: "💡", label: "Innovación constante" },
  { icon: "⭐", label: "Atención al cliente excepcional" },
];

export default function Nosotros() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          padding: "60px 40px 50px",
          textAlign: "center",
          borderBottom: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >

        <span className="titulo-icono">
          🍴 Nuestra Historia
        </span>

        <h1 className="titulo-principal">
          Sobre Nosotros
        </h1>

        <p className="descripcion">
          Donde la pasión por la buena comida se une con un servicio excepcional.
          Cada día trabajamos para crear experiencias memorables.
        </p>

        <div className="linea-decorativa" />

        <p className="cta-text">
          Descubre nuestros platos o realiza tu pedido en segundos
        </p>

        {/* BOTONES */}
        <div className="header-buttons">

          <Link to="/platos" className="btn-link">
            <button className="btn-primary">
              <span>🍽️</span>
              Ver Carta
            </button>
          </Link>

          <Link to="/pedido" className="btn-link">
            <button className="btn-outline">
              <span>📋</span>
              Hacer Pedido
            </button>
          </Link>

        </div>

      </div>

      {/* GRID */}
      <div
        className="nosotros-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >

        {/* IZQUIERDA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* MISION */}
          <div className="card">
            <div className="card-title">
              <span className="icon-box">🎯</span>
              <h2>Nuestra Misión</h2>
            </div>

            <p>
              Brindar una experiencia gastronómica única, combinando calidad,
              sabor y atención personalizada en cada visita.
            </p>
          </div>

          {/* VISION */}
          <div className="card">
            <div className="card-title">
              <span className="icon-box">🚀</span>
              <h2>Nuestra Visión</h2>
            </div>

            <p>
              Ser reconocidos como el restaurante líder en innovación culinaria
              y servicio al cliente en nuestra región.
            </p>
          </div>

          {/* VALORES */}
          <div>
            <div className="card-title" style={{ marginBottom: 16 }}>
              <span className="icon-box">💎</span>
              <h2>Nuestros Valores</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {valores.map((v) => (
                <div key={v.label} className="valor-item">
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* DERECHA */}
        <div>
          <div className="card-title" style={{ marginBottom: 20 }}>
            <span className="icon-box">💬</span>
            <h2>Lo que dicen nuestros clientes</h2>
          </div>

          <Reviews />
        </div>

      </div>

      {/* ESTILOS */}
      <style>{`

        .titulo-principal{
          margin:10px 0 14px;
          font-size:clamp(2rem,4vw,3rem);
          font-weight:900;
          color:#111;
          animation:fadeUp 1s ease;
        }

        .titulo-icono{
          font-size:40px;
          font-weight:800;
          letter-spacing:2px;
          color:#f59e0b;
          text-transform:uppercase;
          display:inline-block;
          animation:floatIcon 3s ease-in-out infinite;
        }

        .descripcion{
          margin:0 auto;
          max-width:520px;
          font-size:15px;
          color:#6b7280;
          line-height:1.8;
        }

        .cta-text{
          margin-top:20px;
          font-size:14px;
          color:#6b7280;
        }

        .linea-decorativa{
          width:100px;
          height:4px;
          background:#f59e0b;
          border-radius:3px;
          margin:26px auto 0;
          animation:growLine 1s ease;
        }

        /* BOTONES */

        .header-buttons{
          display:flex;
          justify-content:center;
          gap:18px;
          margin-top:25px;
          flex-wrap:wrap;
        }

        .btn-link{
          text-decoration:none;
        }

        .btn-primary{
          display:flex;
          align-items:center;
          gap:8px;

          background:linear-gradient(135deg,#f59e0b,#d97706);
          border:none;
          border-radius:14px;

          padding:14px 28px;
          font-size:15px;
          font-weight:800;
          color:white;

          cursor:pointer;
          transition:all .25s ease;

          box-shadow:0 6px 14px rgba(0,0,0,0.15);
        }

        .btn-primary:hover{
          transform:translateY(-3px);
          box-shadow:0 10px 22px rgba(0,0,0,0.18);
        }

        .btn-outline{
          display:flex;
          align-items:center;
          gap:8px;

          background:white;
          border:2px solid #f59e0b;

          border-radius:14px;
          padding:14px 28px;

          font-size:15px;
          font-weight:800;
          color:#d97706;

          cursor:pointer;
          transition:all .25s ease;
        }

        .btn-outline:hover{
          background:#f59e0b;
          color:white;
          transform:translateY(-3px);
          box-shadow:0 10px 22px rgba(0,0,0,0.15);
        }

        /* CARDS */

        .card{
          border-bottom:1px solid #f1f5f9;
          padding-bottom:24px;
          animation:fadeUp .8s ease;
        }

        .card-title{
          display:flex;
          align-items:center;
          gap:10px;
        }

        .card-title h2{
          margin:0;
          font-size:18px;
          font-weight:900;
          color:#111;
        }

        .card p{
          margin:10px 0 0;
          font-size:14px;
          color:#6b7280;
          line-height:1.8;
        }

        .icon-box{
          background:#fef3c7;
          border-radius:10px;
          padding:6px 10px;
          font-size:18px;
        }

        /* VALORES */

        .valor-item{
          display:flex;
          align-items:center;
          gap:12px;
          padding:10px 14px;
          border-radius:10px;
          background:#fff;
          border:1px solid #e5e7eb;
          font-size:13px;
          font-weight:700;
          color:#374151;
          transition:all .25s ease;
        }

        .valor-item:hover{
          transform:translateY(-3px);
          box-shadow:0 8px 18px rgba(0,0,0,0.08);
          border-color:#f59e0b;
        }

        /* ANIMACIONES */

        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(20px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes floatIcon{
          0%{ transform:translateY(0) }
          50%{ transform:translateY(-6px) }
          100%{ transform:translateY(0) }
        }

        @keyframes growLine{
          from{ width:0 }
          to{ width:100px }
        }

        /* RESPONSIVE */

        @media (max-width:768px){

          .nosotros-grid{
            grid-template-columns:1fr !important;
            padding:28px 16px !important;
            gap:28px !important;
          }

          .header-buttons{
            flex-direction:column;
            align-items:center;
          }

          .btn-primary,
          .btn-outline{
            width:100%;
            max-width:280px;
            justify-content:center;
          }

        }

      `}</style>

    </div>
  );
}
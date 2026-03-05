import { Link } from "react-router-dom";
import "../styles/Inicio.css";

export default function Inicio() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Cocina Tradicional</h1>
        <p>Con ese toque de sabor que te hace volver cada día</p>
        <Link to="/dashboard">
          <button className="hero-button">Gestionar Pedido</button>
        </Link>
      </div>
    </section>
  );
}
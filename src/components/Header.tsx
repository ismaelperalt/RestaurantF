import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // cierra el menú al hacer clic
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo" onClick={handleLinkClick}>
        RestaurantF
      </NavLink>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>
          Inicio
        </NavLink>
         <NavLink to="/platos" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>
          Platos
        </NavLink>
        <NavLink to="/nosotros" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>
          Nosotros
        </NavLink>
        <NavLink to="/pedido" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>
          Pedido
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""} onClick={handleLinkClick}>
          Gestionar Pedido
        </NavLink>
      </nav>
    </header>
  );
}
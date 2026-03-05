
import "../styles/Nosotros.css"; // CSS separado

export default function Nosotros() {
  return (
    <section className="nosotros">
      {/* Sección principal */}
      <div className="nosotros-content">
        <h1>Sobre Nosotros</h1>
        <p>
          Bienvenido a <strong>RestaurantF</strong>, donde la pasión por la buena comida
          se une con un servicio excepcional. Nuestro equipo trabaja cada día para ofrecer
          experiencias memorables a nuestros clientes.
        </p>
        <p>
          Creemos en ingredientes frescos, recetas auténticas y un ambiente acogedor
          para que cada visita sea especial.
        </p>

        {/* Sección misión */}
        <h2>Nuestra Misión</h2>
        <p>
          Brindar a nuestros clientes una experiencia gastronómica única,
          combinando calidad, sabor y atención personalizada.
        </p>

        {/* Sección visión */}
        <h2>Nuestra Visión</h2>
        <p>
          Ser reconocidos como el restaurante líder en innovación culinaria
          y servicio al cliente en nuestra región.
        </p>

        {/* Sección valores */}
        <h2>Valores</h2>
        <ul>
          <li>Pasión por la comida</li>
          <li>Compromiso con la calidad</li>
          <li>Trabajo en equipo</li>
          <li>Innovación constante</li>
          <li>Atención al cliente excepcional</li>
        </ul>
      </div>

      {/* Imagen del equipo */}
      <div className="nosotros-image">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
          alt="Nuestro equipo en acción"
        />
      </div>
    </section>
  );
}
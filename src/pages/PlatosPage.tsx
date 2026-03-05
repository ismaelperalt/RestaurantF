
import "../styles/PlatosPage.css";

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export default function PlatosPage() {
  const platos: Plato[] = [
    { id: 1, nombre: "Ceviche", descripcion: "Fresco y delicioso", precio: 8, imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80" },
    { id: 2, nombre: "Seco de Pollo", descripcion: "Auténtico sabor casero", precio: 12, imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80"  },
    { id: 3, nombre: "Encebollado", descripcion: "Tradición del mar", precio: 10, imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80" },
  ];

  const handleAgregar = (plato: Plato) => {
    console.log(`Agregado al pedido: ${plato.nombre}`);
  };

  return (
    <section className="platos-page">
      <div className="platos-header">
        <h1>Nuestros Platos</h1>
        <p>Explora nuestra deliciosa carta y encuentra tu favorito</p>
      </div>

      <div className="platos-container">
        {platos.map((plato) => (
          <div key={plato.id} className="plato-card">
            <img src={plato.imagen} alt={plato.nombre} />
            <h3>{plato.nombre}</h3>
            <p>{plato.descripcion}</p>
            <p>${plato.precio}</p>
            <button onClick={() => handleAgregar(plato)}>Agregar al pedido</button>
          </div>
        ))}
      </div>
    </section>
  );
}
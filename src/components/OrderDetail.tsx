import StatusBadge from "./StatusBadge";
import type{ Order } from "../types/order"; // centralizar tipos
import "../styles/carddetalle.css";

interface OrderDetailProps {
  order: Order;
}

export default function OrderDetail({ order }: OrderDetailProps) {
  // calcular total
  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  // formatear moneda
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD"
    }).format(value);

  return (
    <section className="order-container">
      <article className="order-card">

        {/* HEADER */}
        <header className="order-header">
          <h2>Mesa {order.table}</h2>
          <StatusBadge status={order.status} />
        </header>

        {/* PRODUCTOS */}
        <div className="order-body">
          <h3 className="section-title">Productos</h3>

          {order.items.length === 0 ? (
            <p className="empty">No hay productos</p>
          ) : (
            <ul className="items-list">
              {order.items.map((item) => (
                <li key={item.id ?? item.name} className="item">
                  <span>{item.name}</span>
                  <span className="price">
                    {formatCurrency(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TOTAL */}
        <footer className="order-total">
          <h3>Total: {formatCurrency(total)}</h3>
        </footer>

      </article>
    </section>
  );
}
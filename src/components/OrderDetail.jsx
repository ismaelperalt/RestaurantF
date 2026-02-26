import StatusBadge from "./StatusBadge";

import '../styles/carddetalle.css';

export default function OrderDetail({ order }) {
  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="order-container">
      <div className="order-card">

        <div className="order-header">
          <h2>Mesa {order.table}</h2>
          <StatusBadge status={order.status} />
        </div>

        <h3 className="section-title">Productos</h3>

        <div className="items-list">
          {order.items.map((item, i) => (
            <div key={i} className="item">
              <span>{item.name}</span>
              <span className="price">${item.price}</span>
            </div>
          ))}
        </div>

        <div className="order-total">
          <h3>Total: ${total}</h3>
        </div>

      </div>
    </div>
  );
}
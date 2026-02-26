import StatusBadge from "./StatusBadge";

export default function OrderDetail({ order }) {
  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Mesa {order.table}</h2>

      <StatusBadge status={order.status} />

      <h3>Productos</h3>

      {order.items.map((item, i) => (
        <div key={i} className="item">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  );
}
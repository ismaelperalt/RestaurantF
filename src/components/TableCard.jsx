import StatusBadge from "./StatusBadge";

export default function TableCard({ order, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>Mesa {order.table}</h3>
      <StatusBadge status={order.status} />
      <p>{order.items.length} productos</p>
    </div>
  );
}
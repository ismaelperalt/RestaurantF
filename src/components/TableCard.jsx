import StatusBadge from "./StatusBadge";

export default function TableCard({ order, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      
      <div className="card-header">
        <h3>Mesa {order.table}</h3>
        <StatusBadge status={order.status} />
      </div>

      <p className="card-products">
        {order.items.length} productos
      </p>

    </div>
  );
}
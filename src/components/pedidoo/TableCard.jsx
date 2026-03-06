import StatusBadge from "./StatusBadge";

export default function TableCard({ order, onClick }) {

  const progressClass = {
    pending: "progress-pending",
    preparing: "progress-preparing",
    served: "progress-served"
  };

  return (
    <div className="card" onClick={onClick}>
      
      <div className="card-header">
        <h3>Mesa {order.table}</h3>
        <StatusBadge status={order.status} />
      </div>

      <p className="card-products">
        {order.items.length} productos
      </p>

      {/* progress */}
      <div className="progress-bar">
        <div className={`progress ${progressClass[order.status]}`}></div>
      </div>

    </div>
  );
}
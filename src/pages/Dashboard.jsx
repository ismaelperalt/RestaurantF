import { mockOrders } from "../data/mockOrders";
import TableCard from "../components/TableCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Agrupar pedidos por estado
  const pendingOrders = mockOrders.filter(o => o.status === "pending");
  const preparingOrders = mockOrders.filter(o => o.status === "preparing");
  const servedOrders = mockOrders.filter(o => o.status === "served");

  const renderColumn = (title, orders) => (
    <div className="column">
      <h3>{title}</h3>

      {orders.length === 0 && <p className="empty">Sin pedidos</p>}

      {orders.map(order => (
        <TableCard
          key={order.id}
          order={order}
          onClick={() => navigate(`/order/${order.id}`)}
        />
      ))}
    </div>
  );

  return (
    <div>
      <h2>Gestión de pedidos</h2>

      <div className="board">
        {renderColumn("🟡 Pendiente", pendingOrders)}
        {renderColumn("🔵 En preparación", preparingOrders)}
        {renderColumn("🟢 Servido", servedOrders)}
      </div>
    </div>
  );
}
import { useParams, useNavigate } from "react-router-dom";
import { mockOrders } from "../data/mockOrders";
import OrderDetail from "../components/OrderDetail";

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = mockOrders.find(o => o.id === Number(id));

  if (!order) return <p>Pedido no encontrado</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>← Volver</button>

      <OrderDetail order={order} />
    </div>
  );
}
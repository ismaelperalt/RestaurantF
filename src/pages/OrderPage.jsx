import { useParams, useNavigate } from "react-router-dom";
import { mockOrders } from "../data/mockOrders";
import OrderDetail from "../components/OrderDetail";
import '../styles/OrderPage.css';

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = mockOrders.find(o => o.id === Number(id));

  if (!order) return <p>Pedido no encontrado</p>;

  return (
    <div className="order-page">

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Volver
      </button>

      <OrderDetail order={order} />

    </div>
  );
}
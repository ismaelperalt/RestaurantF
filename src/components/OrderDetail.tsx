import StatusBadge from "./StatusBadge";
import "../styles/carddetalle.css";

/* tipos del sistema */
type Status = "pending" | "preparing" | "served";

interface OrderItem {
  id?: number;
  name: string;
  price: number;
}

interface Order {
  table: number;
  status: Status;
  items: OrderItem[];
}

interface OrderDetailProps {
  order: Order;
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const total = order.items.reduce(
    (sum: number, item: OrderItem) => sum + item.price,
    0
  );

  return (
    <div className="order-container">
      <div className="order-card">

        <div className="order-header">
          <h2>Mesa {order.table}</h2>
          <StatusBadge status={order.status} />
        </div>

        <h3 className="section-title">Productos</h3>

        <div className="items-list">
          {order.items.map((item) => (
            <div
              key={item.id ?? item.name}
              className="item"
            >
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
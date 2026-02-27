import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { mockOrders } from "../data/mockOrders";
import TableCard from "../components/TableCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // estado real de pedidos
  const [orders, setOrders] = useState(mockOrders);

  // agrupar pedidos
  const groupedOrders = {
    pending: orders.filter(o => o.status === "pending"),
    preparing: orders.filter(o => o.status === "preparing"),
    served: orders.filter(o => o.status === "served")
  };

  // cuando termina drag
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const orderId = Number(result.draggableId);
    const newStatus = result.destination.droppableId;

    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const columns = [
    { id: "pending", title: "🟡 Pendiente" },
    { id: "preparing", title: "🔵 En preparación" },
    { id: "served", title: "🟢 Servido" }
  ];

  return (
    <div>
      <h2 className="titulo-pedido">Estado de tu Pedido</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map(column => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{column.title}</h3>

                  {groupedOrders[column.id].map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={String(order.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TableCard
                            order={order}
                            onClick={() => navigate(`/order/${order.id}`)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
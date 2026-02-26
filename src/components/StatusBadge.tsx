import type { Status } from "../types/order";
import "../styles/statusBadge.css";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  const labels = {
    pending: "Pendiente",
    preparing: "En preparación",
    served: "Servido"
  };

  return (
    <span className={`badge badge-${status}`}>
      {labels[status]}
    </span>
  );
}
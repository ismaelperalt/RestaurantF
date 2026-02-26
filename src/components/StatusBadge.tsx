type Status = "pending" | "preparing" | "served";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: { label: "Pendiente", color: "#facc15" },
    preparing: { label: "En preparación", color: "#60a5fa" },
    served: { label: "Servido", color: "#4ade80" }
  };

  const current = styles[status];

  return (
    <span
      style={{
        background: current.color,
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold"
      }}
    >
      {current.label}
    </span>
  );
}
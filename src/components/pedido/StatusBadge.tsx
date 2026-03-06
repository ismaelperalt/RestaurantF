import { statusConfig } from "../../types/data";

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const cfg = statusConfig[status] ?? statusConfig.served;
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20,
      background: cfg.bg, color: cfg.text, letterSpacing: 0.3,
    }}>
      {cfg.label}
    </span>
  );
}
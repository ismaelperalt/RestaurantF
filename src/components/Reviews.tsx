type Review = {
  id: number;
  name: string;
  img: string;
  rating: number;
  comment: string;
};

const reviewsData: Review[] = [
  {
    id: 1, name: "María López", img: "https://i.pravatar.cc/100?img=8", rating: 5,
    comment: "Excelente servicio, muy recomendable. La atención fue rápida y profesional.",
  },
  {
    id: 2, name: "Carlos Pérez", img: "https://i.pravatar.cc/100?img=12", rating: 4,
    comment: "Buen producto, llegó a tiempo y en perfectas condiciones.",
  },
  {
    id: 3, name: "Laura Gómez", img: "https://i.pravatar.cc/100?img=15", rating: 5,
    comment: "Me encantó la experiencia, definitivamente volveré a comprar.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{
          fontSize: 16,
          color: star <= rating ? "#f59e0b" : "#d1d5db",
        }}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {reviewsData.map((review) => (
        <div
          key={review.id}
          style={{
            background: "#fff", borderRadius: 16, padding: "18px 20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            border: "1px solid #f1f5f9",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <img
              src={review.img} alt={review.name}
              style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover",
                border: "2px solid #fef3c7" }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#111" }}>{review.name}</div>
              <StarRating rating={review.rating} />
            </div>
          </div>
          {/* Comentario */}
          <p style={{
            fontSize: 13, color: "#6b7280", lineHeight: 1.6,
            margin: 0, fontStyle: "italic",
            borderLeft: "3px solid #f59e0b", paddingLeft: 12,
          }}>
            "{review.comment}"
          </p>
        </div>
      ))}
    </div>
  );
}
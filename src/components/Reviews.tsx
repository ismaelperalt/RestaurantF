import React from "react";
import '../styles/Reviews.css';

// Definimos un tipo para las reseñas
type Review = {
  id: number;
  name: string;
  img: string;
  stars: string;
  comment: string;
};

// Datos de reseñas
const reviewsData: Review[] = [
  {
    id: 1,
    name: "María López",
    img: "https://i.pravatar.cc/100?img=8",
    stars: "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: "Excelente servicio, muy recomendable. La atención fue rápida y profesional."
  },
  {
    id: 2,
    name: "Carlos Pérez",
    img: "https://i.pravatar.cc/100?img=12",
    stars: "⭐ ⭐ ⭐ ⭐",
    comment: "Buen producto, llegó a tiempo y en perfectas condiciones."
  },
  {
    id: 3,
    name: "Laura Gómez",
    img: "https://i.pravatar.cc/100?img=15",
    stars: "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: "Me encantó la experiencia, definitivamente volveré a comprar."
  }
];

const Reviews: React.FC = () => {
  return (
    <div className="reviews-container">
      {reviewsData.map((review: Review) => (
        <div className="review-card" key={review.id}>
          <div className="review-header">
            <img src={review.img} alt={review.name} />
            <h3>{review.name}</h3>
          </div>
          <div className="review-body">
            <p>{review.stars}</p>
            <p>"{review.comment}"</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
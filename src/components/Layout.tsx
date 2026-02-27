import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import '../styles/layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header className="header">

        {/* Logo fijo */}
        <Link to="/">
          <h1 className="logo">RestaurantF</h1>
        </Link>

        {/* Mensaje animado */}
        <div className="header-message">
          <TypeAnimation
            sequence={[
              "🍔🍔 2 hamburguesas por 1, Hoy!! ⭐",
              2500,
              "", 
              500,
            ]}
            speed={60}
            repeat={Infinity}
            cursor={true}
          />
        </div>

      </header>

      <main className="container">{children}</main>
    </div>
  );
}
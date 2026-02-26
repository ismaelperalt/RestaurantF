import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header className="header">
        <Link to="/">
          <h1>RestaurantF</h1>
        </Link>
      </header>

      <main className="container">{children}</main>
    </div>
  );
}
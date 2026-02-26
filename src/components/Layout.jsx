import { Link } from "react-router-dom";

export default function Layout({ children }) {
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
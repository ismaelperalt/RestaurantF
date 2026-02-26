import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <header className="header">
        <Link to="/">
          <h1>Restaurant Dashboard</h1>
        </Link>
      </header>

      <main className="container">{children}</main>
    </div>
  );
}
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} RestaurantF</p>

        <div className="footer-links">
          <span>Sistema de gestión de restaurante</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  );
}
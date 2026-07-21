import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page center-page">
      <div className="status-card failed">
        <p className="tag">404</p>
        <h1>Page Not Found</h1>
        <p>The page you are trying to open does not exist.</p>

        <Link to="/" className="primary-btn">
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
import { Link } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="nav-container">

        <Link to="/" className="logo">
          <FaCreditCard />
          <span>PayEase</span>
        </Link>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#payment">Payment</a>
        </nav>

      </div>

    </header>
  );
}

export default Navbar;
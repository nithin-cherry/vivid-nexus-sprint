import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingBag,
} from "react-icons/fi";
import { GiCoffeeCup } from "react-icons/gi";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <div className="logo-icon">
            <GiCoffeeCup />
          </div>

          <h2>Brew Haven</h2>
        </a>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#menu" onClick={closeMenu}>
            Menu
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#reviews" onClick={closeMenu}>
            Reviews
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search">
            <FiSearch />
          </button>

          <button className="icon-btn" aria-label="Shopping Cart">
            <FiShoppingBag />
            <span className="cart-count">2</span>
          </button>

          <button className="order-btn">
            Order Now
          </button>

          <button
            className="mobile-btn"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
import "./Hero.css";
import { FaArrowRight, FaStar, FaCoffee } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            <FaCoffee />
            Premium Coffee Experience
          </span>

          <h1>
            Crafted Coffee
            <br />
            For Every
            <span> Moment.</span>
          </h1>

          <p>
            Discover rich aromas, handcrafted beverages and freshly roasted
            beans prepared with passion. Every cup is designed to make your day
            better.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Explore Menu
              <FaArrowRight />
            </button>

            <button className="secondary-btn">
              Book a Table
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <h2>25K+</h2>
              <span>Happy Customers</span>
            </div>

            <div>
              <h2>4.9</h2>
              <span>
                <FaStar />
                Rating
              </span>
            </div>

            <div>
              <h2>12+</h2>
              <span>Years Experience</span>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-image-box">

            <img
              src="/images/home.jpeg"
              alt="Premium Coffee"
            />

            <div className="floating-card top">
              ☕ Freshly Brewed
            </div>

            <div className="floating-card bottom">
              🌱 100% Arabica
            </div>

          </div>

        </div>

      </div>

      <div className="scroll-down">
        Scroll
      </div>

    </section>
  );
}
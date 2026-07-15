import { FaArrowRight, FaBolt, FaLock, FaShieldAlt } from "react-icons/fa";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            Secure Payments • Razorpay Test Mode
          </span>

          <h1>
            Secure Payments
            <br />
            <span>Made Beautiful.</span>
          </h1>

          <p>
            A modern payment experience powered by React and Razorpay Test API.
            Fast, encrypted and designed for seamless online transactions.
          </p>

          <a href="#payment" className="hero-btn">
            Start Payment
            <FaArrowRight />
          </a>

          <div className="hero-features">
            <div>
              <FaShieldAlt />
              Secure
            </div>

            <div>
              <FaBolt />
              Fast
            </div>

            <div>
              <FaLock />
              Encrypted
            </div>
          </div>

        </div>

        <div className="hero-right">

          <div className="payment-card">

            <div className="dashboard-header">
              <h3>Payment Summary</h3>
              <span className="status-badge">Ready</span>
            </div>

            <div className="amount-box">
              <p>Amount</p>
              <h2>₹500</h2>
            </div>

            <div className="dashboard-row">
              <span>Card</span>
              <strong>**** **** **** 4289</strong>
            </div>

            <div className="dashboard-row">
              <span>Gateway</span>
              <strong>Razorpay Test</strong>
            </div>

            <div className="dashboard-row">
              <span>Security</span>
              <strong>256-bit SSL</strong>
            </div>

            <div className="dashboard-row">
              <span>Status</span>
              <strong style={{ color: "#16a34a" }}>Ready to Pay</strong>
            </div>

            <div className="dashboard-footer">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>RuPay</span>
              <span>UPI</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
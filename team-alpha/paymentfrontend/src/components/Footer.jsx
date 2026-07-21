import { FaGithub, FaLinkedin, FaShieldAlt } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">

          <h2>PayEase</h2>

          <p>
            A modern and secure payment portal built with React and designed
            for seamless Razorpay Test API integration.
          </p>

        </div>

        <div className="footer-center">

          <FaShieldAlt className="footer-icon"/>

          <div>
            <h3>Secure Payments</h3>
            <p>Protected • Encrypted • Reliable</p>
          </div>

        </div>

        <div className="footer-right">

          <a href="#">
            <FaGithub/>
          </a>

          <a href="#">
            <FaLinkedin/>
          </a>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 PayEase • Built using React • Razorpay Test API
      </div>

    </footer>
  );
}

export default Footer;
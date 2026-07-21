import { Link } from "react-router-dom";
import { FaCircleXmark, FaArrowLeft } from "react-icons/fa6";
import "../styles/Status.css";

function Failed() {
  return (
    <section className="status-page failed">

      <div className="status-card">

        <FaCircleXmark className="status-icon failed-icon" />

        <h1>Payment Failed</h1>

        <p>
          Something went wrong while processing your payment.
          <br />
          Please try again.
        </p>

        <div className="status-details">
          <div>
            <span>Status</span>
            <strong>Failed</strong>
          </div>

          <div>
            <span>Gateway</span>
            <strong>Razorpay Test</strong>
          </div>
        </div>

        <Link to="/" className="status-btn failed-btn">
          <FaArrowLeft />
          Try Again
        </Link>

      </div>

    </section>
  );
}

export default Failed;
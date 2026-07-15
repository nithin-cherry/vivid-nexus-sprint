import { Link } from "react-router-dom";
import { FaCircleCheck, FaArrowLeft } from "react-icons/fa6";
import "../styles/Status.css";

function Success() {
  return (
    <section className="status-page success">

      <div className="status-card">

        <FaCircleCheck className="status-icon success-icon" />

        <h1>Payment Successful</h1>

        <p>
          Thank you for your payment.
          <br />
          Your transaction has been completed successfully.
        </p>

        <div className="status-details">
          <div>
            <span>Status</span>
            <strong>Completed</strong>
          </div>

          <div>
            <span>Gateway</span>
            <strong>Razorpay Test</strong>
          </div>
        </div>

        <Link to="/" className="status-btn">
          <FaArrowLeft />
          Back to Home
        </Link>

      </div>

    </section>
  );
}

export default Success;
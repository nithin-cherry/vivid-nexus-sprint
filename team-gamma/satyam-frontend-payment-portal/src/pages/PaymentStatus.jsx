import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPaymentStatus } from "../api/paymentApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function PaymentStatus() {
  const { transactionId } = useParams();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStatus() {
      try {
        const data = await getPaymentStatus(transactionId);
        setPayment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, [transactionId]);

  if (loading) {
    return <Loader text="Checking payment status..." />;
  }

  if (error) {
    return (
      <section className="page center-page">
        <ErrorMessage message={error} />
        <Link to="/" className="primary-btn">
          Try Again
        </Link>
      </section>
    );
  }

  const status = payment?.status?.toLowerCase();

  return (
    <section className="page center-page">
      <div className={`status-card ${status}`}>
        <p className="tag">Payment Status</p>

        {status === "success" && <h1>Payment Successful</h1>}
        {status === "failed" && <h1>Payment Failed</h1>}
        {status === "pending" && <h1>Payment Pending</h1>}
        {!["success", "failed", "pending"].includes(status) && (
          <h1>Status Unknown</h1>
        )}

        <div className="status-info">
          <p>
            <strong>Transaction ID:</strong> {payment.transactionId}
          </p>
          <p>
            <strong>Amount:</strong> ₹{payment.amount}
          </p>
          <p>
            <strong>Status:</strong> {payment.status}
          </p>
          <p>
            <strong>Message:</strong> {payment.message || "Status fetched successfully"}
          </p>
        </div>

        <div className="button-row">
          <Link to="/" className="primary-btn">
            New Payment
          </Link>
          <Link to="/transactions" className="secondary-btn">
            View Transactions
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentStatus;
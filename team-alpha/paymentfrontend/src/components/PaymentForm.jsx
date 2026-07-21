import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaLock,
  FaSpinner,
} from "react-icons/fa";
import { createPaymentOrder } from "../services/payment";
import "../styles/Payment.css";

function PaymentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

 // Basic frontend validation
if (!formData.name.trim()) {
  alert("Please enter your full name.");
  return;
}

if (!formData.email.includes("@")) {
  alert("Please enter a valid email address.");
  return;
}

if (Number(formData.amount) <= 0) {
  alert("Amount must be greater than ₹0.");
  return;
}

setLoading(true);

try {
    await createPaymentOrder(formData);

    // Temporary frontend demo
    setTimeout(() => {
      setLoading(false);
      navigate("/success");
    }, 1500);

  } catch (err) {
    setLoading(false);
    navigate("/failed");
  }
};

  return (
    <section className="payment-section" id="payment">

      <div className="payment-container">

        <span className="payment-tag">
          Payment Details
        </span>

        <h2>Complete Your Secure Payment</h2>

        <p>
          Fill in your details below to continue with your payment securely.
        </p>

        <form className="payment-card" onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
           required
disabled={loading}
/>
          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
disabled={loading}
/>

          <label>Amount (₹)</label>

          <input
            type="number"
            name="amount"
            placeholder="500"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
  {loading ? (
    <>
      <FaSpinner className="spin" />
      Processing...
    </>
  ) : (
    <>
      Pay Securely
      <FaArrowRight />
    </>
  )}
</button>

          <div className="payment-info">
            <FaLock />
            Secure payment powered by Razorpay Test Mode
          </div>

          <div className="accepted-methods">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>RuPay</span>
            <span>UPI</span>
          </div>

        </form>

      </div>

    </section>
  );
}

export default PaymentForm;
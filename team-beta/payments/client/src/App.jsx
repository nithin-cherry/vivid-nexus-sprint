import { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost:8080/api/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 500 * 100, currency: "INR" }),
        },
      );

      if (!res.ok) {
        console.log("came here")
        throw new Error(`Server responded with ${res.status}`);
      }

      const { orderId } = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 500 * 100,
        currency: "INR",
        name: "Payment Demo",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
            const verifyPaymentRes = await fetch('http://localhost:8080/api/payments/verify-payment', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature})
            })
            if (!verifyPaymentRes.ok) {
                throw new Error('Payment Failed')
            }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        throw new Error(response.error.description)
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Razorpay Checkout</h1>
      <p>Click below to pay ₹500</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹500"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;

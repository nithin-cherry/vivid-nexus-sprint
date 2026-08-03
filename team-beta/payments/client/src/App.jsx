import { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create Order
      const res = await fetch(
        "http://localhost:8080/api/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 500, currency: "INR" }), //amount in rupee by the frontend
        },
      );

      if (!res.ok) throw new Error("Failed to create order");

      const orderData = await res.json();
      const orderId = orderData.id; // Fixed: accessing 'id' correctly

      // 2. Setup Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 500,
        currency: "INR",
        name: "Payment Demo",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          const payload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyPaymentRes = await fetch(
              "http://localhost:8080/api/payments/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // Send the 3 fields
              },
            );

            if (!verifyPaymentRes.ok) {
              // If it still fails, check the server terminal for the specific error!
              throw new Error("Payment verification failed");
            }

            alert("Payment successful and verified!");
          } catch (err) {
            console.error("Verification error:", err);
            setError(err.message);
          }
        },
      };

      const rzp = new window.Razorpay(options);
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
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹500"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initiatePayment } from "../api/paymentApi";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const initialForm = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  amount: "",
  purpose: ""
};

function PaymentForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "Customer ID is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit mobile number";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function openRazorpay(paymentResponse) {
    const options = {
      key: paymentResponse.razorpayKey,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency || "INR",
      name: "Payment Portal",
      description: formData.purpose,
      order_id: paymentResponse.orderId,

      handler: function () {
        navigate(`/payment-status/${paymentResponse.transactionId}`);
      },

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },

      theme: {
        color: "#2563eb"
      },

      modal: {
        ondismiss: function () {
          navigate(`/payment-status/${paymentResponse.transactionId}`);
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await initiatePayment({
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: Number(formData.amount),
        purpose: formData.purpose
      });

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      openRazorpay(response);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader text="Starting payment..." />;
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <ErrorMessage message={apiError} />

      <div className="form-grid">
        <div className="form-group">
          <label>Customer ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter customer ID"
          />
          {errors.userId && <small>{errors.userId}</small>}
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />
          {errors.phone && <small>{errors.phone}</small>}
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="500"
          />
          {errors.amount && <small>{errors.amount}</small>}
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Course Fee / Registration"
          />
          {errors.purpose && <small>{errors.purpose}</small>}
        </div>
      </div>

      <button type="submit" className="primary-btn">
        Proceed to Pay
      </button>
    </form>
  );
}

export default PaymentForm;
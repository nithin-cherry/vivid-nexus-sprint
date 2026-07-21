import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../api/paymentApi";
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

function createCustomerId() {
  return `VN-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

function getInitialFormData() {
  const params = new URLSearchParams(window.location.search);

  const phoneFromUrl = params.get("phone") || "";
  const cleanPhone = phoneFromUrl.replace(/\D/g, "").slice(-10);

  return {
    userId: params.get("customerId") || createCustomerId(),
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: cleanPhone,
    amount: params.get("amount") || "",
    purpose: params.get("planName") || params.get("purpose") || ""
  };
}

function PaymentForm() {
  const [formData, setFormData] = useState(() => getInitialFormData());
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

  function openRazorpay(orderResponse) {
    const order = orderResponse.order || orderResponse;

    const options = {
      key: orderResponse.razorpayKey || orderResponse.key,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "VividNexus Payment Portal",
      description: formData.purpose,
      order_id: order.id,

      handler: async function (response) {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: formData.userId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            amount: Number(formData.amount),
            purpose: formData.purpose
          });

          navigate(`/payment-status/${response.razorpay_order_id}`);
        } catch (error) {
          setApiError(error.message);
        }
      },

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },

      theme: {
        color: "#111111"
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

      const response = await createOrder({
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
            readOnly
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
            readOnly
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
            readOnly
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
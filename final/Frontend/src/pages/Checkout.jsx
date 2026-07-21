import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Instagram, Mail, CheckCircle2 } from "lucide-react";
import BrowserWindow from "../components/BrowserWindow.jsx";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "https://www.vividnexus.in";
const PAYMENT_PORTAL_URL =
  import.meta.env.VITE_PAYMENT_PORTAL_URL || "http://localhost:5173";

export default function Checkout() {
  const { planSlug = "selected-plan" } = useParams();
  const location = useLocation();

  const plan = location.state || {
    title: planSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    price: null,
    per: "",
    desc: "",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((currentForm) => ({
      ...currentForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientName: form.name,
          email: form.email,
          whatsappNumber: form.phone,
          corporateUrl: FRONTEND_URL,
          selectedPlan: plan.title,
          planPrice: plan.price
            ? `₹${plan.price}${plan.per ? `/${plan.per}` : ""}`
            : "",
          message: form.message || "No message provided",
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit lead");
      }

      const customerId = `VN-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

      const paymentParams = new URLSearchParams({
        customerId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        planName: plan.title || "Selected Service",
        purpose: plan.title || "Selected Service",
        amount: plan.price ? String(plan.price).replace(/,/g, "") : ""
      });

      window.location.href = `${PAYMENT_PORTAL_URL}/?${paymentParams.toString()}#payment-form`;
    } catch (error) {
      console.error("Lead submission failed:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    }
  };

  return (
    <div className="vn-root">
      <header className="vn-nav">
        <div className="vn-nav__inner">
          <Link to="/" className="vn-logo">
            Vivid<span>Nexus</span>
          </Link>
          <Link to="/" className="vn-btn vn-btn--ghost">
            <ArrowLeft size={15} /> Back to site
          </Link>
        </div>
      </header>

      <section className="vn-section vn-checkout">
        <div className="vn-checkout__grid">
          <div>
            <div className="vn-eyebrow">
              <span className="vn-dot" />
              CHECKOUT
            </div>

            <h1 className="vn-h2" style={{ marginTop: 12 }}>
              {plan.title}
            </h1>

            {plan.price && (
              <div className="vn-price vn-price--sm" style={{ marginTop: 14 }}>
                <span className="vn-price__currency">₹</span>
                {plan.price}
                {plan.per && <span className="vn-price__per">/{plan.per}</span>}
              </div>
            )}

            {plan.desc && <p className="vn-checkout__desc">{plan.desc}</p>}

            <BrowserWindow url="vividnexus.in/checkout" className="vn-checkout__window">
              {submitted ? (
                <div className="vn-checkout__success">
                  <CheckCircle2 size={32} />
                  <h3>Request received!</h3>
                  <p>
                    Thanks {form.name || "there"}, we have your details for{" "}
                    <strong>{plan.title}</strong>. Our team will reach out within
                    24 hours to confirm scope and next steps.
                  </p>
                </div>
              ) : (
                <form className="vn-form" onSubmit={handleSubmit}>
                  <div className="vn-form__row">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="vn-form__row">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="vn-form__row">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="vn-form__row">
                    <label htmlFor="message">Anything we should know?</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us a bit about your brand or project"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="vn-btn vn-btn--solid vn-btn--block">
                    Confirm &amp; Get Started
                  </button>
                </form>
              )}
            </BrowserWindow>
          </div>

          <div className="vn-checkout__contact">
            <h3>Prefer to talk it through first?</h3>
            <p>
              DM us on Instagram or email our team directly. We typically reply
              within a few hours.
            </p>

            <div className="vn-hero__actions" style={{ marginTop: 18 }}>
              <a
                href="https://www.instagram.com/vividnexus.in"
                target="_blank"
                rel="noopener noreferrer"
                className="vn-btn vn-btn--solid"
              >
                <Instagram size={16} /> Message on Instagram
              </a>

              <a href="mailto:ceo@vividnexus.in" className="vn-btn vn-btn--ghost">
                <Mail size={16} /> Email Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
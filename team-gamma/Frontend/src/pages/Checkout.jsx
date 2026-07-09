import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Instagram, Mail, CheckCircle2 } from "lucide-react";
import BrowserWindow from "../components/BrowserWindow.jsx";
import { instagramHref, emailHref } from "../config/links";
import { submitLead } from "../services/api";

export default function Checkout() {
  const { planSlug } = useParams();
  const location = useLocation();

  const plan = location.state || {
    title:
      planSlug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
      "Selected Plan",
    price: null,
    per: "",
    desc: "",
  };

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    whatsappNumber: "",
    corporateUrl: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitted(false);

    if (!form.clientName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.whatsappNumber.trim()) {
      setError("Please enter your WhatsApp number.");
      return;
    }

    try {
      setLoading(true);

      await submitLead({
        clientName: form.clientName,
        email: form.email,
        whatsappNumber: form.whatsappNumber,
        corporateUrl: form.corporateUrl,
        selectedPlan: plan.title,
        planPrice: plan.price || "",
        message: form.message,
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not submit your request. Please try again.");
    } finally {
      setLoading(false);
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
                    Thanks {form.clientName || "there"} — we&apos;ve got your
                    details for <strong>{plan.title}</strong>. Our team will
                    reach out within 24 hours to confirm scope and next steps.
                  </p>
                </div>
              ) : (
                <form className="vn-form" onSubmit={handleSubmit}>
                  <div className="vn-form__row">
                    <label htmlFor="clientName">Full name</label>
                    <input
                      id="clientName"
                      name="clientName"
                      type="text"
                      placeholder="Your name"
                      value={form.clientName}
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
                    <label htmlFor="whatsappNumber">Phone / WhatsApp</label>
                    <input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      placeholder="+91"
                      value={form.whatsappNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="vn-form__row">
                    <label htmlFor="corporateUrl">Corporate / business URL</label>
                    <input
                      id="corporateUrl"
                      name="corporateUrl"
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={form.corporateUrl}
                      onChange={handleChange}
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

                  {error && <p className="vn-form__error">{error}</p>}

                  <button
                    type="submit"
                    className="vn-btn vn-btn--solid vn-btn--block"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Confirm & Get Started"}
                  </button>
                </form>
              )}
            </BrowserWindow>
          </div>

          <div className="vn-checkout__contact">
            <h3>Prefer to talk it through first?</h3>

            <p>
              DM us on Instagram or email our team directly — we typically reply
              within a few hours.
            </p>

            <div className="vn-hero__actions" style={{ marginTop: 18 }}>
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="vn-btn vn-btn--solid"
              >
                <Instagram size={16} /> Message on Instagram
              </a>

              <a href={emailHref} className="vn-btn vn-btn--ghost">
                <Mail size={16} /> Email Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
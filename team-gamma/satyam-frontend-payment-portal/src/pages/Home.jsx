import PaymentForm from "../components/PaymentForm";

function Home() {
  return (
    <section className="page">
      <div className="hero">
        <div className="hero-content">
          <p className="tag">
            <span></span>
            Payment Portal - Team Gamma
          </p>

          <h1>
            Secure payments.
            <br />
            Fast tracking.
            <br />
            <span>Clean records.</span>
          </h1>

          <p className="hero-text">
            Process payments, verify customer details, and keep every transaction
            traceable from one clean portal.
          </p>

          <div className="hero-actions">
            <a href="#payment-form" className="primary-btn">
              Make Payment
            </a>
            <a href="/transactions" className="secondary-btn">
              View Transactions <span>→</span>
            </a>
          </div>
        </div>

        <div className="preview-card">
          <div className="browser-bar">
            <span></span>
            <span></span>
            <span></span>
            <div>vividnexus.in/payment</div>
          </div>

          <div className="preview-body">
            <p>payment gateway</p>
            <div className="preview-line long"></div>
            <div className="preview-line medium"></div>

            <div className="preview-buttons">
              <div></div>
              <div></div>
            </div>

            <div className="preview-grid">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div id="payment-form" className="card">
        <div className="section-heading">
          <p className="tag">
            <span></span>
            Initiate Payment
          </p>
          <h2>Payment Details</h2>
        </div>

        <PaymentForm />
      </div>
    </section>
  );
}

export default Home;
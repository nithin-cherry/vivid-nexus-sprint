import React, { useState } from "react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", notes: "" });

  const openBooking = () => {
    setMenuOpen(false);
    setSubmitted(false);
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);

  const handleFormChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Consultation request — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.notes}`
    );
    return `mailto:hello@fenwickcole.com?subject=${subject}&body=${body}`;
  };

  const services = [
    {
      no: "01",
      title: "Operations diagnostic",
      copy: "A four-week audit of your production, logistics, and reporting lines. You get a single document that shows exactly where time and margin are leaking.",
    },
    {
      no: "02",
      title: "Process redesign",
      copy: "We rebuild the workflows that came up short in the diagnostic — staffing models, handoffs, and the systems that hold them together.",
    },
    {
      no: "03",
      title: "Embedded execution",
      copy: "A consultant sits inside your team for the rollout. Nothing ships as a slide deck; it ships as a working process your people run themselves.",
    },
  ];

  const phases = [
    { no: "01", title: "Diagnose", weeks: "Weeks 1–4", copy: "Map the operation as it actually runs, not as the org chart says it does." },
    { no: "02", title: "Redesign", weeks: "Weeks 5–8", copy: "Rebuild the workflows and ownership lines around what the diagnostic found." },
    { no: "03", title: "Install", weeks: "Weeks 9–14", copy: "Put the new process to work on the floor, with a consultant embedded on site." },
    { no: "04", title: "Sustain", weeks: "Ongoing", copy: "Hand off with the metrics and review cadence your team needs to hold the gains." },
  ];

  const stats = [
    { value: "31%", label: "Average cycle-time reduction" },
    { value: "142", label: "Engagements completed" },
    { value: "6.4 wks", label: "Median time to first result" },
    { value: "94%", label: "Clients who extend the engagement" },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        a { color: inherit; }
        ::selection { background: #C9A45C; color: #171D18; }
        .fc-nav-link { position: relative; }
        .fc-nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px;
          width: 0; height: 1px; background: #9C7A3C; transition: width 0.25s ease;
        }
        .fc-nav-link:hover::after { width: 100%; }
        .fc-btn { transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease; cursor: pointer; }
        .fc-btn-primary:hover { background: #23392E !important; }
        .fc-btn-ghost:hover { border-color: #171D18 !important; }
        .fc-card { transition: border-color 0.2s ease, transform 0.2s ease; }
        .fc-card:hover { border-color: #9C7A3C; transform: translateY(-2px); }
        .fc-row:hover .fc-row-arrow { transform: translateX(4px); opacity: 1; }
        .fc-row-arrow { transition: transform 0.2s ease, opacity 0.2s ease; opacity: 0.4; }
        input:focus, textarea:focus { border-color: #2F4A3D !important; }
        .fc-modal-card { animation: fc-modal-in 0.18s ease; }
        @keyframes fc-modal-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 860px) {
          .fc-hero-grid { grid-template-columns: 1fr !important; }
          .fc-services-grid { grid-template-columns: 1fr !important; }
          .fc-phase-grid { grid-template-columns: 1fr !important; }
          .fc-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .fc-desktop-nav { display: none !important; }
          .fc-mobile-toggle { display: flex !important; }
          .fc-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>

      {/* NAV */}
      <header style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>NorthGate Advisory   </div>
          <nav className="fc-desktop-nav" style={styles.navLinks}>
            <a href="#services" className="fc-nav-link" style={styles.navLink}>Services</a>
            <a href="#approach" className="fc-nav-link" style={styles.navLink}>Approach</a>
            <a href="#results" className="fc-nav-link" style={styles.navLink}>Results</a>
            <button onClick={openBooking} className="fc-btn fc-btn-primary" style={styles.navCta}>Book a consultation</button>
          </nav>
          <button
            className="fc-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.mobileToggle}
            aria-label="Toggle menu"
          >
            <span style={{ ...styles.burgerLine, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ ...styles.burgerLine, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...styles.burgerLine, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={styles.mobileMenu}>
            <a href="#services" style={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#approach" style={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Approach</a>
            <a href="#results" style={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>Results</a>
            <button onClick={openBooking} style={{ ...styles.mobileMenuLink, background: "transparent", border: "none", textAlign: "left", cursor: "pointer" }}>Book a consultation</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <div className="fc-hero-grid" style={styles.heroGrid}>
          <div>
            <p style={styles.eyebrow}>Operations &amp; growth consultancy</p>
            <h1 style={styles.h1}>
              We find the six hours a week your operation is losing —
              <span style={styles.h1Accent}> then we get them back.</span>
            </h1>
            <p style={styles.heroCopy}>
              NorthGate Advisory &amp;works inside mid-market manufacturers and
              logistics operators to rebuild the workflows that quietly cost
              them margin. No slide decks left behind — we install the fix
              and stay until it holds.
            </p>
            <div style={styles.heroActions}>
              <button onClick={openBooking} className="fc-btn fc-btn-primary" style={styles.btnPrimary}>Book a consultation</button>
              <a href="#approach" className="fc-btn fc-btn-ghost" style={styles.btnGhost}>See how it works</a>
            </div>
          </div>

          <div style={styles.schematic} aria-hidden="true">
            <p style={styles.schematicLabel}>Engagement schematic</p>
            {phases.map((p, i) => (
              <div key={p.no} style={styles.schematicRow}>
                <div style={styles.schematicRail}>
                  <div style={{ ...styles.schematicDot, background: i === 0 ? "#9C7A3C" : "transparent", borderColor: i === 0 ? "#9C7A3C" : "#B9BBAF" }} />
                  {i < phases.length - 1 && <div style={styles.schematicLine} />}
                </div>
                <div style={styles.schematicText}>
                  <span style={styles.schematicNo}>{p.no}</span>
                  <span style={styles.schematicTitle}>{p.title}</span>
                  <span style={styles.schematicWeeks}>{p.weeks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={styles.trustBar}>
        <p style={styles.trustLabel}>Trusted by operations teams at</p>
        <div style={styles.trustLogos}>
          {["Harrow Freight", "Belmont Steel", "Norse Cold Chain", "Actonville Foods", "Kestrel Logistics"].map((name) => (
            <span key={name} style={styles.trustName}>{name}</span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>What we do</p>
          <h2 style={styles.h2}>Three engagements. One outcome: an operation that runs without you in the room.</h2>
        </div>
        <div className="fc-services-grid" style={styles.servicesGrid}>
          {services.map((s) => (
            <div key={s.no} className="fc-card" style={styles.serviceCard}>
              <span style={styles.serviceNo}>{s.no}</span>
              <h3 style={styles.serviceTitle}>{s.title}</h3>
              <p style={styles.serviceCopy}>{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" style={styles.sectionAlt}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>The approach</p>
          <h2 style={styles.h2}>A fourteen-week engagement, in four phases.</h2>
        </div>
        <div className="fc-phase-grid" style={styles.phaseGrid}>
          {phases.map((p) => (
            <div key={p.no} style={styles.phaseCol}>
              <div style={styles.phaseTop}>
                <span style={styles.phaseNo}>{p.no}</span>
                <span style={styles.phaseWeeks}>{p.weeks}</span>
              </div>
              <h3 style={styles.phaseTitle}>{p.title}</h3>
              <p style={styles.phaseCopy}>{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>Results</p>
          <h2 style={styles.h2}>The numbers our clients ask us to repeat in board meetings.</h2>
        </div>
        <div className="fc-stats-grid" style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.quoteBlock}>
          <p style={styles.quoteText}>
            &ldquo;NorthGate Advisory didn't hand us a report. They rebuilt our
            dispatch process, trained our shift leads on it, and only left
            once it was holding on its own.&rdquo;
          </p>
          <div style={styles.quoteAttr}>
            <div style={styles.quoteAvatar}>MR</div>
            <div>
              <div style={styles.quoteName}>Maren Ridley</div>
              <div style={styles.quoteRole}>COO, Norse Cold Chain</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="contact" style={styles.ctaBanner}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaHeading}>Ready to see where the six hours are going?</h2>
          <p style={styles.ctaCopy}>
            A consultation is 45 minutes, unpaid, and ends with a straight
            answer on whether we can help.
          </p>
          <button onClick={openBooking} className="fc-btn" style={styles.ctaButton}>Book a consultation</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div className="fc-footer-grid" style={styles.footerGrid}>
          <div>
            <div style={styles.logoFooter}>NorthGate Advisory &amp;</div>
            <p style={styles.footerCopy}>Operations and growth consulting for mid-market manufacturers and logistics operators.</p>
          </div>
          <div>
            <p style={styles.footerHead}>Company</p>
            <a href="#services" style={styles.footerLink}>Services</a>
            <a href="#approach" style={styles.footerLink}>Approach</a>
            <a href="#results" style={styles.footerLink}>Results</a>
          </div>
          <div>
            <p style={styles.footerHead}>Contact</p>
            <a href="mailto:hello@northgateadvisory.com" style={styles.footerLink}>hello@northgateadvisory.com</a>
            <a href="tel:+14155550172" style={styles.footerLink}>+1 (415) 555-0172</a>
            <span style={styles.footerLink}>Chicago, IL</span>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2026 NorthGate Advisory </span>
        </div>
      </footer>

      {bookingOpen && (
        <div
          style={styles.modalOverlay}
          onClick={closeBooking}
          role="presentation"
        >
          <div
            className="fc-modal-card"
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-heading"
          >
            <button
              onClick={closeBooking}
              style={styles.modalClose}
              aria-label="Close"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <p style={styles.eyebrow}>Book a consultation</p>
                <h3 id="booking-heading" style={styles.modalHeading}>
                  45 minutes, no cost, straight answer.
                </h3>
                <p style={styles.modalCopy}>
                  Tell us a bit about your operation. We'll follow up within
                  one business day to find a time.
                </p>
                <form onSubmit={handleBookingSubmit} style={styles.form}>
                  <label style={styles.label}>
                    Name
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={handleFormChange("name")}
                      style={styles.input}
                      placeholder="Jordan Blake"
                    />
                  </label>
                  <label style={styles.label}>
                    Work email
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={handleFormChange("email")}
                      style={styles.input}
                      placeholder="jordan@company.com"
                    />
                  </label>
                  <label style={styles.label}>
                    Company
                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={handleFormChange("company")}
                      style={styles.input}
                      placeholder="Company name"
                    />
                  </label>
                  <label style={styles.label}>
                    What's the operation running into?
                    <textarea
                      value={form.notes}
                      onChange={handleFormChange("notes")}
                      style={styles.textarea}
                      placeholder="A short note on what's slowing things down."
                      rows={3}
                    />
                  </label>
                  <button type="submit" style={styles.formSubmit}>
                    Request consultation
                  </button>
                </form>
              </>
            ) : (
              <div style={styles.confirmBlock}>
                <p style={styles.eyebrow}>Request received</p>
                <h3 style={styles.modalHeading}>Thanks, {form.name.split(" ")[0] || "there"}.</h3>
                <p style={styles.modalCopy}>
                  We'll review your note and reply to{" "}
                  <strong style={{ color: colors.ink }}>{form.email}</strong> within
                  one business day to find a time.
                </p>
                <div style={styles.confirmSummary}>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>Name</span>
                    <span style={styles.confirmValue}>{form.name}</span>
                  </div>
                  <div style={styles.confirmRow}>
                    <span style={styles.confirmLabel}>Company</span>
                    <span style={styles.confirmValue}>{form.company}</span>
                  </div>
                  {form.notes && (
                    <div style={styles.confirmRow}>
                      <span style={styles.confirmLabel}>Notes</span>
                      <span style={styles.confirmValue}>{form.notes}</span>
                    </div>
                  )}
                </div>
                <p style={styles.confirmFallback}>
                  Prefer email?{" "}
                  <a href={mailtoHref()} style={{ color: colors.pine }}>
                    Send this as an email instead
                  </a>.
                </p>
                <button onClick={closeBooking} style={styles.formSubmit}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const colors = {
  paper: "#EEF0EA",
  paperAlt: "#E4E7DF",
  ink: "#171D18",
  pine: "#2F4A3D",
  pineDark: "#23392E",
  brass: "#9C7A3C",
  line: "#D3D5C9",
  textSecondary: "#4B534C",
  textMuted: "#7B8177",
};

const fontVoice = "'Source Serif 4', Georgia, serif";
const fontSans = "'Inter', -apple-system, 'Segoe UI', sans-serif";
const fontMono = "'Inter', -apple-system, 'Segoe UI', sans-serif";

const styles = {
  page: {
    background: colors.paper,
    color: colors.ink,
    fontFamily: fontSans,
    minHeight: "100vh",
  },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: colors.paper,
    borderBottom: `1px solid ${colors.line}`,
  },
  navInner: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "18px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontFamily: fontVoice,
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
  navLinks: { display: "flex", alignItems: "center", gap: 36 },
  navLink: { fontSize: 14, color: colors.ink, textDecoration: "none" },
  navCta: {
    background: colors.pine,
    color: colors.paper,
    padding: "10px 20px",
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    border: "none",
    fontFamily: fontSans,
    cursor: "pointer",
  },
  mobileToggle: {
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
    width: 32,
    height: 32,
    background: "transparent",
    border: "none",
    padding: 0,
  },
  burgerLine: { width: 22, height: 1.5, background: colors.ink, transition: "all 0.2s ease" },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 32px 20px",
    borderBottom: `1px solid ${colors.line}`,
  },
  mobileMenuLink: { padding: "10px 0", fontSize: 15, color: colors.ink, textDecoration: "none", borderBottom: `1px solid ${colors.line}` },

  hero: { maxWidth: 1160, margin: "0 auto", padding: "88px 32px 96px" },
  heroGrid: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "start" },
  eyebrow: {
    fontFamily: fontMono,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.brass,
    marginBottom: 18,
    fontWeight: 600,
  },
  h1: {
    fontFamily: fontVoice,
    fontSize: "clamp(34px, 4.4vw, 52px)",
    fontWeight: 500,
    lineHeight: 1.12,
    letterSpacing: "-0.01em",
    margin: 0,
  },
  h1Accent: { color: colors.pine },
  heroCopy: {
    marginTop: 24,
    fontSize: 17,
    lineHeight: 1.65,
    color: colors.textSecondary,
    maxWidth: 480,
  },
  heroActions: { display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" },
  btnPrimary: {
    background: colors.pine,
    color: colors.paper,
    padding: "14px 26px",
    borderRadius: 2,
    fontSize: 15,
    fontWeight: 500,
    textDecoration: "none",
    border: `1px solid ${colors.pine}`,
    fontFamily: fontSans,
    cursor: "pointer",
  },
  btnGhost: {
    color: colors.ink,
    padding: "14px 26px",
    borderRadius: 2,
    fontSize: 15,
    fontWeight: 500,
    textDecoration: "none",
    border: `1px solid ${colors.line}`,
  },

  schematic: {
    border: `1px solid ${colors.line}`,
    background: "#F6F7F2",
    padding: "28px 28px 8px",
    borderRadius: 2,
  },
  schematicLabel: {
    fontFamily: fontMono,
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.textMuted,
    margin: "0 0 20px",
    fontWeight: 600,
  },
  schematicRow: { display: "flex", gap: 18 },
  schematicRail: { display: "flex", flexDirection: "column", alignItems: "center" },
  schematicDot: { width: 10, height: 10, borderRadius: "50%", border: "1.5px solid", flexShrink: 0 },
  schematicLine: { width: 1, flex: 1, background: colors.line, marginTop: 2, marginBottom: 2, minHeight: 34 },
  schematicText: { display: "flex", flexDirection: "column", paddingBottom: 26 },
  schematicNo: { fontFamily: fontMono, fontSize: 11, fontWeight: 600, color: colors.textMuted },
  schematicTitle: { fontFamily: fontVoice, fontSize: 18, fontWeight: 500, marginTop: 2 },
  schematicWeeks: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },

  trustBar: {
    borderTop: `1px solid ${colors.line}`,
    borderBottom: `1px solid ${colors.line}`,
    padding: "28px 32px",
  },
  trustLabel: {
    fontFamily: fontMono,
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.textMuted,
    textAlign: "center",
    margin: "0 0 20px",
    fontWeight: 600,
  },
  trustLogos: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px 44px",
  },
  trustName: { fontFamily: fontSans, fontSize: 15, fontWeight: 600, color: colors.textSecondary, letterSpacing: "0.01em" },

  section: { maxWidth: 1160, margin: "0 auto", padding: "96px 32px" },
  sectionAlt: { background: colors.paperAlt, padding: "96px 32px" },
  sectionHead: { maxWidth: 640, margin: "0 auto 56px" },
  h2: {
    fontFamily: fontVoice,
    fontSize: "clamp(26px, 3vw, 34px)",
    fontWeight: 500,
    lineHeight: 1.25,
    margin: "10px 0 0",
  },

  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
  serviceCard: {
    border: `1px solid ${colors.line}`,
    borderRadius: 2,
    padding: "32px 28px",
    background: colors.paper,
  },
  serviceNo: { fontFamily: fontMono, fontSize: 13, fontWeight: 600, color: colors.brass },
  serviceTitle: { fontFamily: fontVoice, fontSize: 21, fontWeight: 500, margin: "16px 0 12px" },
  serviceCopy: { fontSize: 15, lineHeight: 1.65, color: colors.textSecondary, margin: 0 },

  phaseGrid: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 0,
    borderTop: `1px solid ${colors.line}`,
  },
  phaseCol: { padding: "28px 24px 0", borderLeft: `1px solid ${colors.line}` },
  phaseTop: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
  phaseNo: { fontFamily: fontMono, fontSize: 13, fontWeight: 600, color: colors.brass },
  phaseWeeks: { fontFamily: fontMono, fontSize: 11, fontWeight: 600, color: colors.textMuted },
  phaseTitle: { fontFamily: fontVoice, fontSize: 20, fontWeight: 500, margin: "14px 0 10px" },
  phaseCopy: { fontSize: 14, lineHeight: 1.6, color: colors.textSecondary, margin: 0 },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 72 },
  statCard: { borderLeft: `2px solid ${colors.brass}`, paddingLeft: 18 },
  statValue: { fontFamily: fontVoice, fontSize: 38, fontWeight: 500, color: colors.pine },
  statLabel: { fontSize: 13.5, color: colors.textSecondary, marginTop: 6, lineHeight: 1.4 },

  quoteBlock: {
    maxWidth: 720,
    margin: "0 auto",
    borderTop: `1px solid ${colors.line}`,
    paddingTop: 48,
    textAlign: "center",
  },
  quoteText: {
    fontFamily: fontVoice,
    fontSize: 23,
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.ink,
    margin: "0 0 28px",
  },
  quoteAttr: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12 },
  quoteAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: colors.pine,
    color: colors.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 500,
  },
  quoteName: { fontSize: 14, fontWeight: 500, textAlign: "left" },
  quoteRole: { fontSize: 13, color: colors.textSecondary, textAlign: "left" },

  ctaBanner: { background: colors.pine, padding: "88px 32px" },
  ctaInner: { maxWidth: 640, margin: "0 auto", textAlign: "center" },
  ctaHeading: { fontFamily: fontVoice, fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 500, color: colors.paper, margin: 0, lineHeight: 1.25 },
  ctaCopy: { fontSize: 16, color: "#CFDAD1", marginTop: 16, lineHeight: 1.6 },
  ctaButton: {
    display: "inline-block",
    marginTop: 32,
    background: colors.brass,
    color: colors.ink,
    padding: "15px 30px",
    borderRadius: 2,
    fontSize: 15,
    fontWeight: 500,
    textDecoration: "none",
    border: "none",
    fontFamily: fontSans,
    cursor: "pointer",
  },

  footer: { padding: "64px 32px 28px" },
  footerGrid: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr",
    gap: 48,
    paddingBottom: 48,
  },
  logoFooter: { fontFamily: fontVoice, fontSize: 19, fontWeight: 600, marginBottom: 14 },
  footerCopy: { fontSize: 14, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 320, margin: 0 },
  footerHead: { fontFamily: fontMono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.textMuted, margin: "0 0 16px" },
  footerLink: { display: "block", fontSize: 14, color: colors.ink, textDecoration: "none", marginBottom: 10 },
  footerBottom: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    borderTop: `1px solid ${colors.line}`,
    paddingTop: 24,
    fontSize: 13,
    color: colors.textMuted,
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(23, 29, 24, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 50,
  },
  modalCard: {
    position: "relative",
    background: colors.paper,
    borderRadius: 2,
    border: `1px solid ${colors.line}`,
    maxWidth: 460,
    width: "100%",
    padding: "40px 36px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalClose: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "transparent",
    border: "none",
    fontSize: 22,
    lineHeight: 1,
    color: colors.textSecondary,
    cursor: "pointer",
    padding: 4,
  },
  modalHeading: {
    fontFamily: fontVoice,
    fontSize: 24,
    fontWeight: 500,
    margin: "8px 0 12px",
    lineHeight: 1.25,
  },
  modalCopy: {
    fontSize: 14.5,
    lineHeight: 1.6,
    color: colors.textSecondary,
    margin: "0 0 24px",
  },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: colors.ink,
  },
  input: {
    fontFamily: fontSans,
    fontSize: 14,
    padding: "10px 12px",
    border: `1px solid ${colors.line}`,
    borderRadius: 2,
    background: "#F6F7F2",
    color: colors.ink,
    outline: "none",
  },
  textarea: {
    fontFamily: fontSans,
    fontSize: 14,
    padding: "10px 12px",
    border: `1px solid ${colors.line}`,
    borderRadius: 2,
    background: "#F6F7F2",
    color: colors.ink,
    outline: "none",
    resize: "vertical",
  },
  formSubmit: {
    marginTop: 4,
    background: colors.pine,
    color: colors.paper,
    border: "none",
    borderRadius: 2,
    padding: "13px 22px",
    fontSize: 14.5,
    fontWeight: 500,
    fontFamily: fontSans,
    cursor: "pointer",
  },
  confirmBlock: { paddingTop: 8 },
  confirmSummary: {
    background: "#F6F7F2",
    border: `1px solid ${colors.line}`,
    borderRadius: 2,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  confirmRow: { display: "flex", flexDirection: "column", gap: 2 },
  confirmLabel: {
    fontFamily: fontMono,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  confirmValue: { fontSize: 14, color: colors.ink, lineHeight: 1.5 },
  confirmFallback: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 20,
  },
};

import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, ArrowUpRight, MapPin, Phone, Mail, Clock,
  Send, CheckCircle2, Sofa, Ruler, Palette, Building2, Lamp, KeyRound,
} from "lucide-react";

/* ============================================================== */
/*  TOKENS                                                          */
/* ============================================================== */
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Jost:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const C = {
  ink: "#1B1916",        // base dark
  inkSoft: "#242019",     // dark card surface
  inkLine: "rgba(237,231,220,0.16)",
  plaster: "#EDE7DC",     // base light
  paper: "#F7F3EA",       // light card surface
  paperLine: "rgba(27,25,22,0.13)",
  brass: "#BE8C4C",
  brassSoft: "rgba(190,140,76,0.16)",
  clay: "#A24E33",
  sage: "#69735A",
  textDark: "#2A2620",
  textDarkSoft: "#5C564A",
  textLight: "rgba(237,231,220,0.86)",
  textLightSoft: "rgba(237,231,220,0.58)",
};

const SWATCHES = [
  { name: "Chalk White", hex: "#EDE7DC" },
  { name: "Charcoal Ink", hex: "#1B1916" },
  { name: "Burnt Umber", hex: "#A24E33" },
  { name: "Antique Brass", hex: "#BE8C4C" },
  { name: "Verdigris", hex: "#69735A" },
  { name: "Raw Linen", hex: "#F7F3EA" },
  { name: "Smoked Oak", hex: "#5C4A3A" },
  { name: "Wet Slate", hex: "#4A5054" },
];

const F_DISPLAY = "'Fraunces', serif";
const F_BODY = "'Jost', sans-serif";
const F_MONO = "'IBM Plex Mono', monospace";

/* Small helpers */
function Eyebrow({ children, light }) {
  return (
    <span
      style={{
        fontFamily: F_MONO,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontSize: 11.5,
        color: light ? C.brass : C.clay,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Rule({ light }) {
  return <div style={{ height: 1, width: "100%", background: light ? C.inkLine : C.paperLine }} />;
}

/* Grain overlay — adds tactile plaster/paper texture, used sparingly */
function Grain() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

/* ============================================================== */
/*  SWATCH RAIL — signature element, recurs across the site         */
/* ============================================================== */
function SwatchRail({ dark }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        overflowX: "auto",
        borderTop: `1px solid ${dark ? C.inkLine : C.paperLine}`,
        borderBottom: `1px solid ${dark ? C.inkLine : C.paperLine}`,
      }}
    >
      {SWATCHES.map((s, i) => (
        <div
          key={s.name}
          style={{
            flex: "0 0 auto",
            width: 148,
            padding: "18px 18px 16px",
            borderRight: i === SWATCHES.length - 1 ? "none" : `1px solid ${dark ? C.inkLine : C.paperLine}`,
          }}
        >
          <div style={{ width: "100%", height: 44, background: s.hex, borderRadius: 3, border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}` }} />
          <div style={{ fontFamily: F_MONO, fontSize: 10.5, marginTop: 10, color: dark ? C.textLightSoft : C.textDarkSoft, letterSpacing: "0.03em" }}>
            {s.name.toUpperCase()}
            <br />
            {s.hex}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================== */
/*  HEADER / FOOTER                                                 */
/* ============================================================== */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
];

function Logo({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: F_DISPLAY,
        fontWeight: 600,
        fontSize: 21,
        color: C.textLight,
      }}
    >
      <span style={{ width: 26, height: 26, border: `1px solid ${C.brass}`, borderRadius: "50%", position: "relative", flexShrink: 0 }}>
        <span style={{ position: "absolute", inset: 6, background: C.brass, borderRadius: "50%" }} />
      </span>
      Marlowe <span style={{ fontStyle: "italic", color: C.brass }}>&amp;</span> Oak
    </button>
  );
}

function Header({ page, go }) {
  const [open, setOpen] = useState(false);
  const navigate = (id) => { go(id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(27,25,22,0.88)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.inkLine}` }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo onClick={() => navigate("home")} />
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 34 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: F_MONO, fontSize: 12.5, letterSpacing: "0.05em", textTransform: "uppercase",
                color: page === item.id ? C.brass : C.textLightSoft,
                paddingBottom: 3,
                borderBottom: page === item.id ? `1px solid ${C.brass}` : "1px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navigate("book")}
            style={{
              fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none",
              borderRadius: 2, padding: "11px 24px", fontSize: 13.5, fontWeight: 500,
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            Book a consult <ArrowUpRight size={14} />
          </button>
        </nav>
        <button className="mobile-toggle" onClick={() => setOpen((o) => !o)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} aria-label="Toggle menu">
          {open ? <X size={22} color={C.textLight} /> : <Menu size={22} color={C.textLight} />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu" style={{ borderTop: `1px solid ${C.inkLine}`, padding: "16px 28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} style={{ textAlign: "left", background: "none", border: "none", fontFamily: F_MONO, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.05em", color: page === item.id ? C.brass : C.textLight, cursor: "pointer" }}>
              {item.label}
            </button>
          ))}
          <button onClick={() => navigate("book")} style={{ fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none", borderRadius: 2, padding: "12px 22px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", width: "fit-content" }}>
            Book a consult
          </button>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  const navigate = (id) => { go(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer style={{ background: C.ink, position: "relative" }}>
      <SwatchRail dark />
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "56px 28px 30px", display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 320 }}>
          <Logo onClick={() => navigate("home")} />
          <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>
            A studio for people who notice light, texture, and the small decisions that make a room feel considered.
          </p>
        </div>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <Eyebrow light>Studio</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {[{ id: "about", l: "About" }, { id: "services", l: "Services" }, { id: "book", l: "Book a consult" }].map((x) => (
                <button key={x.id} onClick={() => navigate(x.id)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: F_BODY, fontSize: 14, color: C.textLight }}>{x.l}</button>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow light>Info</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {[{ id: "contact", l: "Contact" }, { id: "privacy", l: "Privacy Policy" }, { id: "terms", l: "Terms of Service" }].map((x) => (
                <button key={x.id} onClick={() => navigate(x.id)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: F_BODY, fontSize: 14, color: C.textLight }}>{x.l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Rule light />
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "18px 28px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.textLightSoft, letterSpacing: "0.03em" }}>
          © {new Date().getFullYear()} MARLOWE &amp; OAK STUDIO — AHMEDABAD
        </span>
        <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.textLightSoft, letterSpacing: "0.03em" }}>EST. 2014</span>
      </div>
    </footer>
  );
}

/* ============================================================== */
/*  HERO — polaroid stack + spotlight cursor                        */
/* ============================================================== */
function Hero({ go }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      style={{
        position: "relative",
        background: C.ink,
        overflow: "hidden",
        backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(190,140,76,0.14), transparent 42%)`,
      }}
    >
      <Grain />
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "72px 28px 90px", position: "relative", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40, alignItems: "center" }} className="hero-grid">
        <div>
          <Eyebrow light>Interior Design Studio — Ahmedabad</Eyebrow>
          <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(40px,5.4vw,66px)", lineHeight: 1.05, color: C.textLight, margin: "20px 0 26px", fontWeight: 500 }}>
            Rooms designed
            <br />
            around how the
            <br />
            <span style={{ fontStyle: "italic", color: C.brass }}>light falls.</span>
          </h1>
          <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 16.5, lineHeight: 1.75, maxWidth: 420 }}>
            We plan spaces the way a good tailor cuts cloth — measured against the person, not the trend. Twelve years, three cities, one process.
          </p>
          <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => go("book")}
              style={{ fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none", borderRadius: 2, padding: "16px 30px", fontSize: 14.5, fontWeight: 500, letterSpacing: "0.01em", cursor: "pointer" }}
            >
              Start a project
            </button>
            <button
              onClick={() => go("services")}
              style={{ fontFamily: F_MONO, background: "transparent", color: C.textLight, border: `1px solid ${C.inkLine}`, borderRadius: 2, padding: "15px 22px", fontSize: 12.5, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              View services <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div style={{ position: "relative", height: 420 }} className="polaroid-wrap">
          <PolaroidImg src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" cap="Study 01 — Living, Bodakdev" style={{ top: 0, left: "8%", width: "62%", rotate: "-4deg", z: 1 }} />
          <PolaroidImg src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" cap="Study 02 — Bedroom, Thaltej" style={{ top: "34%", left: "34%", width: "58%", rotate: "5deg", z: 2 }} />
        </div>
      </div>
    </section>
  );
}

function PolaroidImg({ src, cap, style }) {
  return (
    <figure
      style={{
        position: "absolute",
        top: style.top,
        left: style.left,
        width: style.width,
        margin: 0,
        background: C.paper,
        padding: "10px 10px 34px",
        borderRadius: 2,
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)",
        transform: `rotate(${style.rotate})`,
        zIndex: style.z,
      }}
    >
      <img src={src} alt={cap} style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
      <figcaption style={{ fontFamily: F_MONO, fontSize: 9.5, color: C.textDarkSoft, marginTop: 10, letterSpacing: "0.03em" }}>{cap}</figcaption>
    </figure>
  );
}

/* ============================================================== */
/*  MANIFESTO (light band)                                          */
/* ============================================================== */
function Manifesto() {
  return (
    <section style={{ background: C.plaster, padding: "84px 28px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow>Our Position</Eyebrow>
        <p style={{ fontFamily: F_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(24px,3.4vw,36px)", lineHeight: 1.5, color: C.textDark, margin: "22px 0 0" }}>
          "A home is not finished when the furniture arrives. It's finished when it stops looking designed — and starts looking lived in."
        </p>
        <p style={{ fontFamily: F_MONO, fontSize: 12, color: C.textDarkSoft, marginTop: 22, letterSpacing: "0.04em" }}>— NAOMI FITCHER, FOUNDING DESIGNER</p>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  SPEC-SHEET STATS (light band)                                   */
/* ============================================================== */
const STATS = [
  { k: "PROJECTS DELIVERED", v: "120+" },
  { k: "CLIENT SATISFACTION", v: "98%" },
  { k: "SITE VISITS PER MONTH", v: "40+" },
  { k: "STUDIO TEAM", v: "15" },
];

function SpecStats() {
  return (
    <section style={{ background: C.plaster, padding: "0 28px 90px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {STATS.map((s, i) => (
          <div key={s.k}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "20px 0" }}>
              <span style={{ fontFamily: F_MONO, fontSize: 12.5, color: C.textDarkSoft, letterSpacing: "0.06em" }}>{s.k}</span>
              <span style={{ flex: 1, borderBottom: `1px dotted ${C.paperLine}`, margin: "0 16px", transform: "translateY(-6px)" }} />
              <span style={{ fontFamily: F_DISPLAY, fontSize: 30, color: C.clay, fontWeight: 500 }}>{s.v}</span>
            </div>
            {i < STATS.length - 1 && <Rule />}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================== */
/*  WHY US — asymmetric editorial rows (dark band)                  */
/* ============================================================== */
const WHY_US = [
  { title: "Expertise in creativity", text: "Our designers train across furniture-making, architecture, and textiles before they ever touch a client brief.", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80", swatch: C.brass },
  { title: "A stress-free process", text: "We run procurement, trades, and scheduling behind the scenes — you see decisions, not logistics.", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80", swatch: C.clay },
  { title: "Access to exclusivity", text: "Fabric houses, stonemasons, and joinery workshops we've worked with for a decade, opened up to you.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80", swatch: C.sage },
];

function WhyUs() {
  return (
    <section style={{ background: C.ink, padding: "90px 28px", position: "relative" }}>
      <Grain />
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <Eyebrow light>Why Marlowe &amp; Oak</Eyebrow>
        <h2 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(28px,3.6vw,42px)", color: C.textLight, margin: "16px 0 60px", maxWidth: 560, fontWeight: 500 }}>
          Three things clients mention before we ask.
        </h2>
        {WHY_US.map((w, i) => (
          <div key={w.title} style={{ marginBottom: i === WHY_US.length - 1 ? 0 : 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "0.85fr 1.15fr" : "1.15fr 0.85fr", gap: 40, alignItems: "center" }} className="why-row">
              <div style={{ order: i % 2 === 0 ? 1 : 2 }} className="why-row-text">
                <span style={{ display: "inline-block", width: 10, height: 10, background: w.swatch, marginBottom: 18, borderRadius: 1 }} />
                <h3 style={{ fontFamily: F_DISPLAY, fontSize: 26, color: C.textLight, margin: "0 0 12px", fontWeight: 500 }}>{w.title}</h3>
                <p style={{ fontFamily: F_BODY, fontSize: 15, color: C.textLightSoft, lineHeight: 1.75, maxWidth: 380 }}>{w.text}</p>
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1 }} className="why-row-img">
                <img src={w.img} alt={w.title} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: 2 }} />
              </div>
            </div>
            {i < WHY_US.length - 1 && <div style={{ marginTop: 56 }}><Rule light /></div>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================== */
/*  CTA banner                                                      */
/* ============================================================== */
function CTA({ go }) {
  return (
    <section style={{ background: C.plaster, padding: "90px 28px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", background: C.ink, borderRadius: 4, padding: "56px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 26, position: "relative", overflow: "hidden" }}>
        <Grain />
        <div style={{ position: "relative" }}>
          <Eyebrow light>Next Step</Eyebrow>
          <h3 style={{ fontFamily: F_DISPLAY, fontSize: 30, color: C.textLight, margin: "14px 0 0", fontWeight: 500, maxWidth: 460 }}>
            Bring us a room. We'll bring the plan.
          </h3>
        </div>
        <button
          onClick={() => go("book")}
          style={{ position: "relative", fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none", borderRadius: 2, padding: "16px 30px", fontSize: 14.5, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}
        >
          Book a free consult <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}

function HomePage({ go }) {
  return (
    <>
      <Hero go={go} />
      <SwatchRail />
      <Manifesto />
      <SpecStats />
      <WhyUs />
      <CTA go={go} />
    </>
  );
}

/* ============================================================== */
/*  ABOUT                                                           */
/* ============================================================== */
const TEAM = [
  { name: "Naomi Fitcher", role: "Founding Designer", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80" },
  { name: "Idris Cole", role: "Spatial Planning", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=500&q=80" },
  { name: "Priya Anand", role: "Materials & Colour", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80" },
  { name: "Marcus Odell", role: "Client Experience", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80" },
];

function AboutPage({ go }) {
  return (
    <>
      <section style={{ background: C.ink, padding: "76px 28px 90px", position: "relative" }}>
        <Grain />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <Eyebrow light>About the Studio</Eyebrow>
          <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(32px,4.6vw,50px)", color: C.textLight, margin: "18px 0 22px", fontWeight: 500, maxWidth: 720 }}>
            Started at a kitchen table in 2014, <span style={{ fontStyle: "italic", color: C.brass }}>still that stubborn.</span>
          </h1>
          <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 16, lineHeight: 1.85, maxWidth: 620 }}>
            Marlowe &amp; Oak began as two designers who kept getting hired to fix other studios' finished projects — the pretty renders that were never actually livable. So we built our own process: fewer mood boards, more site visits; fewer trends, more tailoring. A decade on, that's still the whole method.
          </p>
        </div>
      </section>

      <SwatchRail />
      <Manifesto />
      <SpecStats />

      <section style={{ background: C.ink, padding: "90px 28px", position: "relative" }}>
        <Grain />
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
          <Eyebrow light>The People</Eyebrow>
          <h2 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(26px,3.4vw,38px)", color: C.textLight, margin: "16px 0 46px", fontWeight: 500 }}>Four desks, one studio.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: `1px solid ${C.inkLine}`, borderRight: "none" }} className="team-grid">
            {TEAM.map((t) => (
              <div key={t.name} style={{ borderRight: `1px solid ${C.inkLine}`, padding: 18 }}>
                <img src={t.img} alt={t.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 2, filter: "grayscale(0.35)" }} />
                <h4 style={{ fontFamily: F_DISPLAY, fontSize: 17, color: C.textLight, margin: "16px 0 3px", fontWeight: 500 }}>{t.name}</h4>
                <p style={{ fontFamily: F_MONO, fontSize: 10.5, color: C.textLightSoft, letterSpacing: "0.04em", textTransform: "uppercase" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA go={go} />
    </>
  );
}

/* ============================================================== */
/*  SERVICES — spec-sheet listing + real-sequence process           */
/* ============================================================== */
const SERVICES = [
  { icon: Sofa, title: "Full Home Design", price: "$4,800", unit: "from, per home" },
  { icon: Ruler, title: "Single Room Makeover", price: "$1,200", unit: "from, per room" },
  { icon: Palette, title: "Colour & Material Consult", price: "$350", unit: "flat, 2-hour session" },
  { icon: Building2, title: "Commercial Interiors", price: "custom", unit: "quoted after site visit" },
  { icon: Lamp, title: "Lighting Design", price: "$600", unit: "from, per plan" },
  { icon: KeyRound, title: "Move-In Styling", price: "$900", unit: "from, per home" },
];

const PROCESS = [
  { step: "Consult", text: "A conversation about how you live, and what isn't working yet." },
  { step: "Concept", text: "Floor plans, material palette, and a mood board built for your rooms specifically." },
  { step: "Source", text: "We manage procurement, trades, and timelines end to end." },
  { step: "Reveal", text: "Final styling and a walkthrough of a space that finally feels finished." },
];

function ServicesPage({ go }) {
  return (
    <>
      <section style={{ background: C.ink, padding: "76px 28px 60px", position: "relative" }}>
        <Grain />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <Eyebrow light>Services &amp; Rates</Eyebrow>
          <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(32px,4.6vw,50px)", color: C.textLight, margin: "18px 0 20px", fontWeight: 500, maxWidth: 640 }}>
            As much — or as little — <span style={{ fontStyle: "italic", color: C.brass }}>help as you need.</span>
          </h1>
        </div>
      </section>

      <section style={{ background: C.ink, padding: "0 28px 90px", position: "relative" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
          <div style={{ border: `1px solid ${C.inkLine}`, borderBottom: "none" }}>
            {SERVICES.map((s) => (
              <div
                key={s.title}
                style={{ borderBottom: `1px solid ${C.inkLine}`, padding: "24px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 260 }}>
                  <s.icon size={20} color={C.brass} />
                  <span style={{ fontFamily: F_DISPLAY, fontSize: 19, color: C.textLight, fontWeight: 500 }}>{s.title}</span>
                </div>
                <span style={{ fontFamily: F_MONO, fontSize: 11.5, color: C.textLightSoft, letterSpacing: "0.03em", flex: 1, textAlign: "center" }}>{s.unit.toUpperCase()}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                  <span style={{ fontFamily: F_DISPLAY, fontSize: 19, color: C.clay, fontWeight: 500 }}>{s.price}</span>
                  <button onClick={() => go("book")} style={{ background: "none", border: `1px solid ${C.inkLine}`, borderRadius: 2, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, color: C.textLight, fontFamily: F_MONO, fontSize: 11, padding: "8px 14px", letterSpacing: "0.04em" }}>
                    BOOK <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: C.plaster }}><SwatchRail /></div>

      <section style={{ background: C.plaster, padding: "90px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Eyebrow>How a Project Runs</Eyebrow>
          <h2 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(26px,3.4vw,38px)", color: C.textDark, margin: "16px 0 50px", fontWeight: 500 }}>Four stages, start to finish.</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 16, left: 0, right: 0, borderTop: `1px dotted ${C.paperLine}` }} className="process-line" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="why-grid">
              {PROCESS.map((p, i) => (
                <div key={p.step}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.clay, display: "inline-block" }} />
                    <span style={{ fontFamily: F_MONO, fontSize: 11.5, color: C.textDarkSoft }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 style={{ fontFamily: F_DISPLAY, fontSize: 19, color: C.textDark, margin: "14px 0 8px", fontWeight: 500 }}>{p.step}</h4>
                  <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.textDarkSoft, lineHeight: 1.7 }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA go={go} />
    </>
  );
}

/* ============================================================== */
/*  BOOK US                                                          */
/* ============================================================== */
function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 20 }}>
      <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.textLightSoft, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 9 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  fontFamily: F_BODY,
  fontSize: 14.5,
  padding: "13px 15px",
  borderRadius: 2,
  border: `1px solid ${C.inkLine}`,
  background: "rgba(255,255,255,0.03)",
  color: C.textLight,
  boxSizing: "border-box",
  outline: "none",
};

function ErrorText({ text }) {
  return <span style={{ fontFamily: F_MONO, color: "#D98A6E", fontSize: 11, marginTop: 6, display: "block" }}>{text}</span>;
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.inkLine}`, borderRadius: 2, padding: "20px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <Icon size={17} color={C.brass} style={{ marginTop: 3, flexShrink: 0 }} />
      <div>
        <h4 style={{ fontFamily: F_DISPLAY, fontSize: 15, color: C.textLight, margin: "0 0 4px", fontWeight: 500 }}>{title}</h4>
        <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.textLightSoft, lineHeight: 1.55, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function BookPage({ go }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Full Home Design", date: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email.";
    if (!form.phone.trim()) errs.phone = "Please enter a phone number.";
    if (!form.date) errs.date = "Please choose a preferred date.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <section style={{ background: C.ink, minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "80px 28px", textAlign: "center" }}>
          <CheckCircle2 size={46} color={C.brass} />
          <h1 style={{ fontFamily: F_DISPLAY, fontSize: 32, color: C.textLight, margin: "20px 0 14px", fontWeight: 500 }}>Thank you, {form.name.split(" ")[0]}.</h1>
          <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 15.5, lineHeight: 1.8 }}>
            Your request for <strong style={{ color: C.textLight }}>{form.service}</strong> on <strong style={{ color: C.textLight }}>{form.date}</strong> has been received. We'll reach out at {form.email} within one business day.
          </p>
          <button onClick={() => { setSubmitted(false); go("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ marginTop: 30, fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none", borderRadius: 2, padding: "14px 28px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Back to home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: C.ink, padding: "76px 28px 100px", position: "relative" }}>
      <Grain />
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: 580, margin: "0 auto 46px", textAlign: "center" }}>
          <Eyebrow light>Book a Consult</Eyebrow>
          <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(30px,4vw,44px)", color: C.textLight, margin: "16px 0 14px", fontWeight: 500 }}>
            Tell us about the <span style={{ fontStyle: "italic", color: C.brass }}>room.</span>
          </h1>
          <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 15.5, lineHeight: 1.7 }}>We reply within one business day to schedule your first walkthrough.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32, alignItems: "start" }} className="book-grid">
          <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.inkLine}`, borderRadius: 4, padding: "34px 30px" }} noValidate>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
              <Field label="Full name">
                <input style={inputStyle} value={form.name} onChange={update("name")} placeholder="Jane Carter" />
                {errors.name && <ErrorText text={errors.name} />}
              </Field>
              <Field label="Phone">
                <input style={inputStyle} value={form.phone} onChange={update("phone")} placeholder="+1 555 123 4567" />
                {errors.phone && <ErrorText text={errors.phone} />}
              </Field>
            </div>
            <Field label="Email">
              <input style={inputStyle} value={form.email} onChange={update("email")} placeholder="jane@email.com" />
              {errors.email && <ErrorText text={errors.email} />}
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
              <Field label="Service">
                <select style={inputStyle} value={form.service} onChange={update("service")}>
                  {SERVICES.map((s) => (<option key={s.title} style={{ color: "#000" }}>{s.title}</option>))}
                  <option style={{ color: "#000" }}>Just a consultation</option>
                </select>
              </Field>
              <Field label="Preferred date">
                <input type="date" style={inputStyle} value={form.date} onChange={update("date")} />
                {errors.date && <ErrorText text={errors.date} />}
              </Field>
            </div>
            <Field label="About your space (optional)">
              <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical", fontFamily: F_BODY }} value={form.message} onChange={update("message")} placeholder="Room type, style you love, timeline..." />
            </Field>
            <button type="submit" style={{ width: "100%", fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none", borderRadius: 2, padding: "15px 24px", fontSize: 14.5, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6 }}>
              Submit request <Send size={15} />
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <InfoCard icon={Clock} title="Response time" text="We reply to every booking within one business day." />
            <InfoCard icon={MapPin} title="Studio visits" text="In-studio and on-site consultations available." />
            <InfoCard icon={Phone} title="Prefer to talk?" text="Call us directly at +1 555 123 4567." />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  CONTACT                                                          */
/* ============================================================== */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (form.name && /^\S+@\S+\.\S+$/.test(form.email) && form.message) setSent(true);
  };

  return (
    <section style={{ background: C.ink, padding: "76px 28px 100px", position: "relative" }}>
      <Grain />
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <Eyebrow light>Contact</Eyebrow>
        <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(30px,4vw,44px)", color: C.textLight, margin: "16px 0 40px", fontWeight: 500 }}>
          Say <span style={{ fontStyle: "italic", color: C.brass }}>hello.</span>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="book-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <InfoCard icon={MapPin} title="Studio address" text="14 Ashworth Lane, Ahmedabad, Gujarat" />
            <InfoCard icon={Phone} title="Phone" text="+1 555 123 4567" />
            <InfoCard icon={Mail} title="Email" text="hello@marloweoak.studio" />
            <InfoCard icon={Clock} title="Studio hours" text="Mon–Sat, 10am – 7pm" />
          </div>
          {sent ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.inkLine}`, borderRadius: 4, padding: "34px 30px", textAlign: "center" }}>
              <CheckCircle2 size={38} color={C.brass} />
              <h3 style={{ fontFamily: F_DISPLAY, fontSize: 22, color: C.textLight, margin: "14px 0 8px", fontWeight: 500 }}>Message sent</h3>
              <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 14 }}>Thanks, {form.name.split(" ")[0]} — we'll reply to {form.email} shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${C.inkLine}`, borderRadius: 4, padding: "34px 30px" }} noValidate>
              <Field label="Name"><input style={inputStyle} value={form.name} onChange={update("name")} placeholder="Your name" /></Field>
              <Field label="Email"><input style={inputStyle} value={form.email} onChange={update("email")} placeholder="you@email.com" /></Field>
              <Field label="Message"><textarea style={{ ...inputStyle, minHeight: 130, resize: "vertical", fontFamily: F_BODY }} value={form.message} onChange={update("message")} placeholder="How can we help?" /></Field>
              <button type="submit" style={{ width: "100%", fontFamily: F_BODY, background: C.brass, color: C.ink, border: "none", borderRadius: 2, padding: "15px 24px", fontSize: 14.5, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Send message <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  LEGAL                                                            */
/* ============================================================== */
function LegalPage({ title, sections }) {
  return (
    <section style={{ background: C.ink, padding: "76px 28px 100px", position: "relative" }}>
      <Grain />
      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
        <Eyebrow light>Legal</Eyebrow>
        <h1 style={{ fontFamily: F_DISPLAY, fontSize: "clamp(30px,4vw,44px)", color: C.textLight, margin: "16px 0 36px", fontWeight: 500 }}>{title}</h1>
        {sections.map((s, i) => (
          <div key={s.h} style={{ marginBottom: 26 }}>
            <h3 style={{ fontFamily: F_DISPLAY, fontSize: 18, color: C.textLight, marginBottom: 8, fontWeight: 500 }}>{s.h}</h3>
            <p style={{ fontFamily: F_BODY, color: C.textLightSoft, fontSize: 14.5, lineHeight: 1.8 }}>{s.p}</p>
            {i < sections.length - 1 && <div style={{ marginTop: 22 }}><Rule light /></div>}
          </div>
        ))}
      </div>
    </section>
  );
}

const PRIVACY_SECTIONS = [
  { h: "What we collect", p: "When you book a consultation or contact us, we collect your name, email, phone number, and any project details you choose to share." },
  { h: "How we use it", p: "Your information is used only to respond to your enquiry, schedule consultations, and share relevant project updates. We never sell client data." },
  { h: "Data retention", p: "We keep enquiry and project records for as long as needed to deliver our services, and no longer than legally required afterward." },
  { h: "Your rights", p: "You can request a copy of your data, ask us to correct it, or ask us to delete it at any time by contacting hello@marloweoak.studio." },
];

const TERMS_SECTIONS = [
  { h: "Booking a consultation", p: "Submitting the booking form is a request, not a confirmed appointment. We'll confirm your slot by email or phone within one business day." },
  { h: "Project estimates", p: "Prices shown on the Services page are starting estimates. A final quote is provided after your initial consultation, based on scope." },
  { h: "Cancellations", p: "Consultations can be rescheduled or cancelled free of charge up to 24 hours in advance." },
  { h: "Intellectual property", p: "Design concepts, drawings, and mood boards remain the property of the studio until a project is signed and paid in full." },
];

/* ============================================================== */
/*  APP SHELL                                                       */
/* ============================================================== */
export default function App() {
  const [page, setPage] = useState("home");
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  let content;
  if (page === "home") content = <HomePage go={go} />;
  else if (page === "about") content = <AboutPage go={go} />;
  else if (page === "services") content = <ServicesPage go={go} />;
  else if (page === "book") content = <BookPage go={go} />;
  else if (page === "contact") content = <ContactPage />;
  else if (page === "privacy") content = <LegalPage title="Privacy Policy" sections={PRIVACY_SECTIONS} />;
  else if (page === "terms") content = <LegalPage title="Terms of Service" sections={TERMS_SECTIONS} />;
  else content = <HomePage go={go} />;

  return (
    <div style={{ background: C.ink, minHeight: "100vh" }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::selection { background: ${C.brass}; color: ${C.ink}; }
        button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
          outline: 2px solid ${C.brass};
          outline-offset: 2px;
        }
        input::placeholder, textarea::placeholder { color: rgba(237,231,220,0.32); }
        select option { background: ${C.paper}; }
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .polaroid-wrap { height: 340px !important; margin-top: 30px; }
          .why-row { grid-template-columns: 1fr !important; }
          .why-row-img { order: 1 !important; }
          .why-row-text { order: 2 !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .process-line { display: none !important; }
          .book-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .team-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header page={page} go={go} />
      {content}
      <Footer go={go} />
    </div>
  );
}

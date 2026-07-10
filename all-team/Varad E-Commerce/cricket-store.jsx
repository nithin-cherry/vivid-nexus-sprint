import React, { useState, useMemo } from "react";
import {
  ShoppingBag, X, Plus, Minus, Star, ChevronRight, Search,
  Menu, ShieldCheck, Truck, RotateCcw, Award, ArrowRight
} from "lucide-react";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const CATEGORIES = ["All", "Bats", "Gloves", "Pads", "Balls", "Apparel", "Bags"];

const PRODUCTS = [
  { id: 1, name: "Kashmir Willow Pro", cat: "Bats", price: 189, rating: 4.8, tag: "Bestseller", grade: "Grade 1", desc: "Hand-pressed willow, mid-swell profile for power hitters." },
  { id: 2, name: "English Willow Elite", cat: "Bats", price: 449, rating: 5.0, tag: "Premium", grade: "Grade A+", desc: "Tournament-grade willow with a low, thick edge profile." },
  { id: 3, name: "Test Match Opener", cat: "Bats", price: 329, rating: 4.7, tag: null, grade: "Grade 1+", desc: "Classic straight grain, built for the long innings." },
  { id: 4, name: "Velocity Batting Gloves", cat: "Gloves", price: 79, rating: 4.6, tag: "New", grade: null, desc: "Multi-density foam padding with ventilated pittards palm." },
  { id: 5, name: "Pro Series Wicket Gloves", cat: "Gloves", price: 95, rating: 4.9, tag: null, grade: null, desc: "Reinforced webbing built for pace bowling behind the stumps." },
  { id: 6, name: "Titan Batting Pads", cat: "Pads", price: 129, rating: 4.7, tag: "Bestseller", grade: null, desc: "Lightweight shell, triple-density protection." },
  { id: 7, name: "County Wicket Pads", cat: "Pads", price: 149, rating: 4.5, tag: null, grade: null, desc: "Extended knee roll for low, quick movement behind the bails." },
  { id: 8, name: "Match Ball — Red Leather", cat: "Balls", price: 24, rating: 4.8, tag: null, grade: null, desc: "Four-piece hand-stitched leather, first-class standard." },
  { id: 9, name: "Match Ball — White Kookaburra", cat: "Balls", price: 26, rating: 4.6, tag: "New", grade: null, desc: "Engineered for limited-overs seam movement under lights." },
  { id: 10, name: "Elite Playing Shirt", cat: "Apparel", price: 59, rating: 4.4, tag: null, grade: null, desc: "Breathable pique weave with UPF 40+ protection." },
  { id: 11, name: "Performance Trousers", cat: "Apparel", price: 65, rating: 4.5, tag: null, grade: null, desc: "Four-way stretch fabric, reinforced knee stitching." },
  { id: 12, name: "Pro Kit Wheelie Bag", cat: "Bags", price: 219, rating: 4.9, tag: "Premium", grade: null, desc: "Full-length bat compartment, ventilated boot pouch." },
];

const fmt = (n) => `$${n.toFixed(2)}`;

/* ---------------------------------------------------------
   SEAM STITCH DIVIDER (signature element)
--------------------------------------------------------- */
function SeamDivider({ flip = false }) {
  return (
    <div className={`seam-divider ${flip ? "flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none">
        <path d="M0,12 Q 300,2 600,12 T 1200,12" fill="none" stroke="#C1272D" strokeWidth="1.5" strokeDasharray="10 8" />
        <path d="M0,12 Q 300,22 600,12 T 1200,12" fill="none" stroke="#C1272D" strokeWidth="1.5" strokeDasharray="10 8" />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------
   PRODUCT VISUAL (stylized SVG "card art" per category)
--------------------------------------------------------- */
function ProductArt({ cat }) {
  const common = "w-full h-full";
  if (cat === "Bats") {
    return (
      <svg viewBox="0 0 200 200" className={common}>
        <defs>
          <linearGradient id="willow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5E9C8" />
            <stop offset="100%" stopColor="#D8B979" />
          </linearGradient>
        </defs>
        <rect x="90" y="20" width="20" height="90" rx="6" fill="url(#willow)" stroke="#8C6A2F" strokeWidth="1.5" />
        <rect x="85" y="105" width="30" height="70" rx="10" fill="url(#willow)" stroke="#8C6A2F" strokeWidth="1.5" />
        <rect x="93" y="175" width="14" height="18" rx="4" fill="#12203E" />
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="88" y1={112+i*11} x2="112" y2={112+i*11} stroke="#8C6A2F" strokeWidth="0.6" opacity="0.4" />
        ))}
      </svg>
    );
  }
  if (cat === "Balls") {
    return (
      <svg viewBox="0 0 200 200" className={common}>
        <circle cx="100" cy="100" r="55" fill="#B4222A" stroke="#7A1319" strokeWidth="2" />
        <path d="M55,70 A60,60 0 0 1 145,70" fill="none" stroke="#F5F1E8" strokeWidth="2.5" strokeDasharray="4 3" />
        <path d="M55,130 A60,60 0 0 0 145,130" fill="none" stroke="#F5F1E8" strokeWidth="2.5" strokeDasharray="4 3" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="#7A1319" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
  if (cat === "Gloves") {
    return (
      <svg viewBox="0 0 200 200" className={common}>
        <path d="M70,150 Q60,90 70,50 Q75,35 85,50 L85,90 M85,90 L90,45 Q95,32 100,45 L100,92 M100,92 L106,48 Q112,35 117,48 L117,95 M117,95 L124,55 Q130,45 133,58 L130,110 Q140,140 120,165 Q95,178 75,165 Q65,158 70,150 Z"
          fill="#1E4D8C" stroke="#0B1D3A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M75,165 Q95,178 120,165" fill="none" stroke="#F5F1E8" strokeWidth="2" opacity="0.6" />
      </svg>
    );
  }
  if (cat === "Pads") {
    return (
      <svg viewBox="0 0 200 200" className={common}>
        <rect x="70" y="20" width="60" height="150" rx="18" fill="#F5F1E8" stroke="#1E4D8C" strokeWidth="2" />
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x="78" y={30+i*22} width="44" height="14" rx="6" fill="#1E4D8C" opacity={0.85 - i*0.06} />
        ))}
      </svg>
    );
  }
  if (cat === "Apparel") {
    return (
      <svg viewBox="0 0 200 200" className={common}>
        <path d="M70,40 L100,55 L130,40 L155,60 L138,80 L128,72 L128,170 L72,170 L72,72 L62,80 L45,60 Z"
          fill="#FFFFFF" stroke="#1E4D8C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M100,55 L100,90" stroke="#C1272D" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" className={common}>
      <rect x="45" y="60" width="110" height="100" rx="10" fill="#1E4D8C" stroke="#0B1D3A" strokeWidth="2" />
      <rect x="65" y="40" width="70" height="30" rx="8" fill="#12203E" />
      <rect x="45" y="95" width="110" height="10" fill="#F5F1E8" opacity="0.5" />
    </svg>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */
export default function CricketStore() {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p =>
      (activeCat === "All" || p.cat === activeCat) &&
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [activeCat, query]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to bag`);
    setTimeout(() => setToast(null), 1800);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="store-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');

        .store-root {
          --navy: #0B1D3A;
          --blue: #1E4D8C;
          --blue-light: #3E71B8;
          --white: #FFFFFF;
          --cream: #F5F1E8;
          --stitch: #C1272D;
          font-family: 'Inter', sans-serif;
          background: var(--white);
          color: var(--navy);
          min-height: 100vh;
          position: relative;
        }
        .store-root * { box-sizing: border-box; }
        .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }

        /* ---------- HEADER ---------- */
        .header {
          position: sticky; top: 0; z-index: 40;
          background: var(--navy);
          color: var(--white);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .header-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
        }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-mark {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--stitch);
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
        }
        .logo-mark::before, .logo-mark::after {
          content: ''; position: absolute; width: 22px; height: 1.5px;
          background: var(--white); border-radius: 2px;
        }
        .logo-mark::before { transform: rotate(20deg); top: 13px; }
        .logo-mark::after { transform: rotate(-20deg); top: 19px; }
        .logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 0.06em; }
        .logo-text span { color: var(--blue-light); }

        .nav-cats { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
        .nav-cats button {
          background: none; border: none; color: rgba(255,255,255,0.75);
          font-size: 14px; font-weight: 600; letter-spacing: 0.03em;
          cursor: pointer; padding: 4px 0; position: relative; transition: color 0.2s;
        }
        .nav-cats button:hover { color: var(--white); }
        .nav-cats button.active { color: var(--white); }
        .nav-cats button.active::after {
          content: ''; position: absolute; bottom: -6px; left: 0; right: 0;
          height: 2px; background: var(--stitch);
        }
        .header-actions { display: flex; align-items: center; gap: 18px; }
        .search-box {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08); border-radius: 999px;
          padding: 8px 14px; width: 200px;
        }
        .search-box input {
          background: none; border: none; outline: none; color: var(--white);
          font-size: 13px; width: 100%;
        }
        .search-box input::placeholder { color: rgba(255,255,255,0.5); }
        .cart-btn {
          position: relative; background: var(--blue); border: none; color: var(--white);
          width: 40px; height: 40px; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .cart-btn:hover { background: var(--blue-light); }
        .cart-badge {
          position: absolute; top: -6px; right: -6px; background: var(--stitch);
          color: var(--white); font-size: 10px; font-weight: 700;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        /* ---------- HERO ---------- */
        .hero {
          background: linear-gradient(160deg, var(--navy) 0%, var(--blue) 100%);
          color: var(--white);
          position: relative; overflow: hidden;
        }
        .hero-inner {
          max-width: 1280px; margin: 0 auto; padding: 80px 24px 90px;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--stitch); background: rgba(193,39,45,0.12);
          padding: 6px 14px; border-radius: 999px; margin-bottom: 22px;
        }
        .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 84px);
          line-height: 0.98; letter-spacing: 0.01em; margin: 0 0 20px;
        }
        .hero h1 em { font-style: normal; color: var(--blue-light); }
        .hero p {
          font-size: 17px; line-height: 1.6; color: rgba(255,255,255,0.75);
          max-width: 460px; margin: 0 0 32px;
        }
        .hero-ctas { display: flex; gap: 14px; }
        .btn-primary {
          background: var(--stitch); color: var(--white); border: none;
          padding: 15px 28px; border-radius: 8px; font-weight: 700; font-size: 14px;
          letter-spacing: 0.03em; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: transform 0.15s, background 0.2s;
        }
        .btn-primary:hover { background: #A81F26; transform: translateY(-1px); }
        .btn-ghost {
          background: rgba(255,255,255,0.06); color: var(--white);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 15px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;
          cursor: pointer; transition: background 0.2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.14); }
        .hero-stats { display: flex; gap: 36px; margin-top: 48px; }
        .hero-stat .num { font-family: 'Bebas Neue', sans-serif; font-size: 34px; color: var(--white); }
        .hero-stat .lbl { font-size: 12px; color: rgba(255,255,255,0.6); letter-spacing: 0.04em; }

        .hero-visual {
          position: relative; height: 380px;
          display: flex; align-items: center; justify-content: center;
        }
        .hero-visual svg { width: 100%; height: 100%; }

        /* seam divider */
        .seam-divider { width: 100%; height: 24px; overflow: hidden; }
        .seam-divider.flip { transform: scaleY(-1); }
        .seam-divider svg { width: 100%; height: 100%; }

        /* ---------- TRUST STRIP ---------- */
        .trust-strip {
          background: var(--cream); padding: 22px 24px;
          display: flex; justify-content: center; gap: 56px; flex-wrap: wrap;
        }
        .trust-item { display: flex; align-items: center; gap: 10px; color: var(--navy); }
        .trust-item .ic { color: var(--blue); flex-shrink: 0; }
        .trust-item span { font-size: 13px; font-weight: 600; }

        /* ---------- SHOP SECTION ---------- */
        .shop {
          max-width: 1280px; margin: 0 auto; padding: 70px 24px 100px;
        }
        .shop-head {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 36px; flex-wrap: wrap; gap: 20px;
        }
        .shop-head h2 {
          font-family: 'Bebas Neue', sans-serif; font-size: 42px; margin: 0;
          color: var(--navy); letter-spacing: 0.01em;
        }
        .shop-head p { color: #5A6B85; font-size: 14px; margin: 6px 0 0; }
        .cat-filters { display: flex; gap: 10px; flex-wrap: wrap; }
        .cat-filters button {
          border: 1.5px solid #DDE3EE; background: var(--white); color: var(--navy);
          padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
        }
        .cat-filters button:hover { border-color: var(--blue); }
        .cat-filters button.active { background: var(--navy); border-color: var(--navy); color: var(--white); }

        .grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 26px;
        }
        .card {
          background: var(--white); border: 1px solid #E7EBF3; border-radius: 16px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .card:hover { box-shadow: 0 20px 40px -18px rgba(11,29,58,0.25); transform: translateY(-3px); }
        .card-art {
          background: linear-gradient(155deg, var(--cream) 0%, #EDE7D8 100%);
          padding: 30px; height: 190px; position: relative;
        }
        .card-tag {
          position: absolute; top: 14px; left: 14px;
          background: var(--navy); color: var(--white); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.04em; padding: 5px 10px; border-radius: 6px; text-transform: uppercase;
        }
        .card-body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .card-cat { font-size: 11px; font-weight: 700; color: var(--blue); letter-spacing: 0.06em; text-transform: uppercase; }
        .card-name { font-size: 16.5px; font-weight: 700; color: var(--navy); margin: 0; line-height: 1.3; }
        .card-desc { font-size: 12.5px; color: #6B7A93; line-height: 1.5; margin: 0; min-height: 36px; }
        .card-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #8C97AA; }
        .card-meta .stars { display: flex; align-items: center; gap: 3px; color: #E8A93A; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
        .card-price { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--navy); }
        .card-price .grade { display: block; font-family: 'Inter'; font-size: 10.5px; font-weight: 600; color: var(--stitch); margin-top: -2px; }
        .add-btn {
          background: var(--navy); color: var(--white); border: none;
          width: 40px; height: 40px; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.2s;
        }
        .add-btn:hover { background: var(--blue); }

        /* ---------- BANNER ---------- */
        .banner {
          background: var(--navy); color: var(--white);
          display: grid; grid-template-columns: 1fr 1fr; align-items: center;
        }
        .banner-copy { padding: 60px; }
        .banner-copy .eyebrow { color: var(--stitch); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .banner-copy h3 { font-family: 'Bebas Neue', sans-serif; font-size: 40px; margin: 12px 0 16px; }
        .banner-copy p { color: rgba(255,255,255,0.72); font-size: 14.5px; line-height: 1.6; max-width: 420px; margin: 0 0 26px; }
        .banner-visual { background: var(--blue); height: 100%; min-height: 320px; display: flex; align-items: center; justify-content: center; padding: 30px; }

        /* ---------- FOOTER ---------- */
        .footer { background: var(--cream); padding: 60px 24px 30px; }
        .footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px; }
        .footer h4 { font-size: 13px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: var(--navy); margin: 0 0 16px; }
        .footer p { font-size: 13px; color: #6B7A93; line-height: 1.6; }
        .footer ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .footer ul a { color: #5A6B85; text-decoration: none; font-size: 13.5px; }
        .footer ul a:hover { color: var(--blue); }
        .footer-bottom { max-width: 1280px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid #DDE3D9; font-size: 12px; color: #8C97AA; text-align: center; }

        /* ---------- CART DRAWER ---------- */
        .overlay {
          position: fixed; inset: 0; background: rgba(11,29,58,0.5);
          z-index: 50; opacity: 0; pointer-events: none; transition: opacity 0.25s;
        }
        .overlay.open { opacity: 1; pointer-events: auto; }
        .drawer {
          position: fixed; top: 0; right: 0; height: 100vh; width: 400px; max-width: 92vw;
          background: var(--white); z-index: 60; transform: translateX(100%);
          transition: transform 0.3s ease; display: flex; flex-direction: column;
          box-shadow: -20px 0 50px rgba(0,0,0,0.15);
        }
        .drawer.open { transform: translateX(0); }
        .drawer-head { padding: 22px 22px; border-bottom: 1px solid #EEF1F6; display: flex; justify-content: space-between; align-items: center; }
        .drawer-head h3 { font-family: 'Bebas Neue', sans-serif; font-size: 24px; margin: 0; color: var(--navy); }
        .drawer-head button { background: none; border: none; cursor: pointer; color: var(--navy); }
        .drawer-body { flex: 1; overflow-y: auto; padding: 18px 22px; display: flex; flex-direction: column; gap: 16px; }
        .cart-empty { text-align: center; color: #8C97AA; margin-top: 60px; font-size: 14px; }
        .cart-item { display: flex; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid #F0F2F7; }
        .cart-item-art { width: 60px; height: 60px; background: var(--cream); border-radius: 10px; padding: 8px; flex-shrink: 0; }
        .cart-item-info { flex: 1; }
        .cart-item-info .name { font-size: 13.5px; font-weight: 700; color: var(--navy); margin: 0 0 4px; }
        .cart-item-info .price { font-size: 12.5px; color: #6B7A93; }
        .qty-ctrl { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .qty-ctrl button { background: var(--cream); border: none; width: 24px; height: 24px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--navy); }
        .qty-ctrl span { font-size: 13px; font-weight: 700; min-width: 16px; text-align: center; }
        .drawer-foot { padding: 20px 22px 26px; border-top: 1px solid #EEF1F6; }
        .drawer-foot .total-row { display: flex; justify-content: space-between; font-size: 14px; color: #5A6B85; margin-bottom: 6px; }
        .drawer-foot .total-row.grand { font-size: 18px; font-weight: 800; color: var(--navy); margin: 12px 0 18px; }
        .checkout-btn { width: 100%; background: var(--stitch); color: var(--white); border: none; padding: 15px; border-radius: 10px; font-weight: 700; font-size: 14.5px; cursor: pointer; }
        .checkout-btn:hover { background: #A81F26; }

        /* ---------- TOAST ---------- */
        .toast {
          position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
          background: var(--navy); color: var(--white); padding: 13px 22px; border-radius: 10px;
          font-size: 13.5px; font-weight: 600; z-index: 70; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        }

        @media (max-width: 860px) {
          .nav-cats, .search-box { display: none; }
          .hero-inner { grid-template-columns: 1fr; padding-top: 50px; }
          .hero-visual { height: 220px; order: -1; }
          .banner { grid-template-columns: 1fr; }
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-mark" />
            <div className="logo-text">CRICK<span>FORGE</span></div>
          </div>
          <ul className="nav-cats">
            {CATEGORIES.map(c => (
              <li key={c}>
                <button className={activeCat === c ? "active" : ""} onClick={() => setActiveCat(c)}>{c}</button>
              </li>
            ))}
          </ul>
          <div className="header-actions">
            <div className="search-box">
              <Search size={15} color="rgba(255,255,255,0.6)" />
              <input placeholder="Search gear..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">● Grade A+ English Willow, Now In Stock</div>
            <h1>GEARED FOR<br/>THE <em>CHAMPION'S</em><br/>INNINGS.</h1>
            <p>Hand-selected willow, tournament-certified protective gear, and match-standard leather — built for players who never settle for the boundary rope.</p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => document.getElementById("shop-section")?.scrollIntoView({behavior:"smooth"})}>
                Shop The Range <ArrowRight size={16} />
              </button>
              <button className="btn-ghost">Our Craftsmanship</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="num">18k+</div><div className="lbl">PLAYERS EQUIPPED</div></div>
              <div className="hero-stat"><div className="num">4.9★</div><div className="lbl">AVG. RATING</div></div>
              <div className="hero-stat"><div className="num">30</div><div className="lbl">DAY GUARANTEE</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <svg viewBox="0 0 320 380">
              <defs>
                <linearGradient id="heroWillow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F5E9C8" />
                  <stop offset="100%" stopColor="#C89B4A" />
                </linearGradient>
              </defs>
              <ellipse cx="160" cy="350" rx="90" ry="14" fill="rgba(0,0,0,0.25)" />
              <rect x="140" y="20" width="30" height="160" rx="8" fill="url(#heroWillow)" stroke="#7A5A22" strokeWidth="2" />
              <rect x="128" y="175" width="54" height="130" rx="18" fill="url(#heroWillow)" stroke="#7A5A22" strokeWidth="2" />
              <rect x="140" y="300" width="30" height="34" rx="6" fill="#0B1D3A" />
              {[0,1,2,3,4,5,6].map(i => (
                <line key={i} x1="132" y1={190+i*16} x2="176" y2={190+i*16} stroke="#7A5A22" strokeWidth="0.7" opacity="0.35" />
              ))}
              <circle cx="245" cy="90" r="34" fill="#B4222A" stroke="#7A1319" strokeWidth="2" />
              <path d="M215,72 A40,40 0 0 1 275,72" fill="none" stroke="#F5F1E8" strokeWidth="2" strokeDasharray="3 2.5" />
              <path d="M215,108 A40,40 0 0 0 275,108" fill="none" stroke="#F5F1E8" strokeWidth="2" strokeDasharray="3 2.5" />
            </svg>
          </div>
        </div>
      </section>
      <SeamDivider />

      {/* ---------------- TRUST STRIP ---------------- */}
      <div className="trust-strip">
        <div className="trust-item"><ShieldCheck size={18} className="ic" /><span>Tournament Certified Gear</span></div>
        <div className="trust-item"><Truck size={18} className="ic" /><span>Free Shipping Over $150</span></div>
        <div className="trust-item"><RotateCcw size={18} className="ic" /><span>30-Day Returns</span></div>
        <div className="trust-item"><Award size={18} className="ic" /><span>Pro Player Endorsed</span></div>
      </div>

      {/* ---------------- SHOP ---------------- */}
      <section className="shop" id="shop-section">
        <div className="shop-head">
          <div>
            <h2>The Full Range</h2>
            <p>{filtered.length} products{activeCat !== "All" ? ` in ${activeCat}` : ""}</p>
          </div>
          <div className="cat-filters">
            {CATEGORIES.map(c => (
              <button key={c} className={activeCat === c ? "active" : ""} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid">
          {filtered.map(p => (
            <div className="card" key={p.id}>
              <div className="card-art">
                {p.tag && <div className="card-tag">{p.tag}</div>}
                <ProductArt cat={p.cat} />
              </div>
              <div className="card-body">
                <div className="card-cat">{p.cat}</div>
                <h3 className="card-name">{p.name}</h3>
                <p className="card-desc">{p.desc}</p>
                <div className="card-meta">
                  <span className="stars"><Star size={12} fill="#E8A93A" /> {p.rating}</span>
                </div>
                <div className="card-footer">
                  <div className="card-price">
                    {fmt(p.price)}
                    {p.grade && <span className="grade">{p.grade}</span>}
                  </div>
                  <button className="add-btn" onClick={() => addToCart(p)} aria-label={`Add ${p.name} to cart`}>
                    <Plus size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- BANNER ---------------- */}
      <SeamDivider flip />
      <section className="banner">
        <div className="banner-copy">
          <div className="eyebrow">Bespoke Bat Program</div>
          <h3>Knock, Weigh & Balance —<br/>Built To Your Grip.</h3>
          <p>Send us your reach, grip preference, and playing style. Our master craftsmen hand-tune every bat's pick-up and sweet spot before it ships.</p>
          <button className="btn-primary" style={{background:"var(--blue)"}}>Start Your Custom Bat <ChevronRight size={16} /></button>
        </div>
        <div className="banner-visual">
          <svg viewBox="0 0 200 260" width="200">
            <rect x="82" y="10" width="24" height="120" rx="7" fill="#F5E9C8" stroke="#7A5A22" strokeWidth="2" />
            <rect x="70" y="120" width="48" height="110" rx="16" fill="#F5E9C8" stroke="#7A5A22" strokeWidth="2" />
            <rect x="82" y="228" width="24" height="26" rx="5" fill="#0B1D3A" />
          </svg>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="logo" style={{marginBottom:14}}>
              <div className="logo-mark" />
              <div className="logo-text" style={{color:"var(--navy)"}}>CRICK<span style={{color:"var(--blue)"}}>FORGE</span></div>
            </div>
            <p>Premium cricket equipment for players who take the crease seriously. Est. for the game, built by the game.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#">Bats</a></li>
              <li><a href="#">Protective Gear</a></li>
              <li><a href="#">Balls</a></li>
              <li><a href="#">Apparel</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Bat Care</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Craftsmanship</a></li>
              <li><a href="#">Pro Partners</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2026 CrickForge. All rights reserved.</div>
      </footer>

      {/* ---------------- CART DRAWER ---------------- */}
      <div className={`overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <div className={`drawer ${cartOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <h3>Your Bag ({cartCount})</h3>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 && <div className="cart-empty">Your bag is empty.<br/>Add some gear to get started.</div>}
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-art"><ProductArt cat={item.cat} /></div>
              <div className="cart-item-info">
                <p className="name">{item.name}</p>
                <p className="price">{fmt(item.price)}</p>
                <div className="qty-ctrl">
                  <button onClick={() => updateQty(item.id, -1)}><Minus size={12} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}><Plus size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="total-row"><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
            <div className="total-row"><span>Shipping</span><span>{cartTotal >= 150 ? "Free" : fmt(9.99)}</span></div>
            <div className="total-row grand"><span>Total</span><span>{fmt(cartTotal + (cartTotal >= 150 ? 0 : 9.99))}</span></div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>

      {toast && <div className="toast"><ShoppingBag size={15} /> {toast}</div>}
    </div>
  );
}

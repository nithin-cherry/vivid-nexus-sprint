import { useEffect, useState } from "react";
import {
  Coffee,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Specials", href: "#specials" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
];

const PRODUCTS = [
  { name: "Cheeseberry Tart", tag: "Baked fresh", price: "$5.80" },
  { name: "Strawberry Mug Cake", tag: "Single serve", price: "$4.50" },
  { name: "Signature Latte", tag: "House blend", price: "$4.20" },
  { name: "Lavender Cold Foam", tag: "Seasonal", price: "$5.00" },
  { name: "Pistachio Eclair", tag: "Chef's pick", price: "$4.80" },
];

function ContactModal({ onClose }) {
  const [sent, setSent] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1A2420] to-[#0F1512] p-8 shadow-2xl border border-[#D4AF37]/20"
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#F5F1E8]/40 hover:text-[#D4AF37] transition-colors"
        >
          <X size={20} />
        </button>

        {!sent ? (
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-medium">
              Say hello
            </p>
            <h3 className="text-3xl font-serif font-semibold text-[#F5F1E8] mt-2">
              Get in touch
            </h3>
            <form
              className="mt-6 space-y-3"
              onSubmit={function (e) {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/20 bg-[#F5F1E8]/5 text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/20 bg-[#F5F1E8]/5 text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
              <textarea
                required
                rows={3}
                placeholder="Message"
                className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/20 bg-[#F5F1E8]/5 text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#D4AF37] text-sm resize-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8912E] text-[#0F1512] text-sm font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
              >
                Send message
              </button>
            </form>
            <div className="mt-6 pt-5 border-t border-[#D4AF37]/10 space-y-2 text-sm text-[#F5F1E8]/60">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37]" /> +1 992-435-143
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37]" /> contact@catery.com
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8912E] grid place-items-center shadow-lg shadow-[#D4AF37]/30">
              <Coffee className="text-[#0F1512]" size={28} />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-[#F5F1E8] mt-5">
              Message sent
            </h3>
            <p className="text-sm text-[#F5F1E8]/50 mt-2">
              Thanks for reaching out, we will reply shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-7 py-2.5 rounded-full bg-[#D4AF37] text-[#0F1512] text-sm font-semibold hover:bg-[#B8912E] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  const visible = [0, 1, 2, 3].map(function (i) {
    return PRODUCTS[(slide + i) % PRODUCTS.length];
  });

  const nextSlide = function () {
    setSlide(function (s) {
      return (s + 1) % PRODUCTS.length;
    });
  };

  useEffect(function () {
    document.title = "Catery - Savor the Pause, Love the Brew";
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1512] text-[#F5F1E8] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <header className="sticky top-0 z-40 bg-[#0F1512]/85 backdrop-blur-lg border-b border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="h-10 w-10 grid place-items-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6A1F] shadow-lg shadow-[#D4AF37]/20">
              <Coffee size={18} className="text-[#0F1512]" />
            </span>
            <span className="text-lg font-serif font-semibold tracking-widest">
              CATERY
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map(function (l) {
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[#F5F1E8]/60 hover:text-[#D4AF37] transition-colors tracking-wide"
                >
                  {l.label}
                </a>
              );
            })}
            <button
              onClick={function () {
                setContactOpen(true);
              }}
              className="px-5 py-2 rounded-full border border-[#D4AF37]/40 text-sm text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1512] transition-all"
            >
              Contact Us
            </button>
          </nav>

          <button
            className="md:hidden text-[#F5F1E8]"
            onClick={function () {
              setMenuOpen(function (o) {
                return !o;
              });
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4 border-t border-[#D4AF37]/10 bg-[#0F1512]">
            {NAV_LINKS.map(function (l) {
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={function () {
                    setMenuOpen(false);
                  }}
                  className="text-sm pt-3 text-[#F5F1E8]/80"
                >
                  {l.label}
                </a>
              );
            })}
            <button
              onClick={function () {
                setMenuOpen(false);
                setContactOpen(true);
              }}
              className="text-left text-sm font-medium text-[#D4AF37]"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      <section
        id="home"
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(800px 400px at 85% -10%, rgba(212,175,55,0.15), transparent 60%), radial-gradient(600px 400px at 10% 110%, rgba(31,58,46,0.4), transparent 60%), #0F1512",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 md:py-32 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/25 text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            <Sparkles size={12} />
            Small batch, Slow brewed
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight mt-7 max-w-3xl mx-auto">
            Savor the Pause,{" "}
            <span className="italic bg-gradient-to-r from-[#D4AF37] to-[#F0D586] bg-clip-text text-transparent">
              Love
            </span>{" "}
            the Brew.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#F5F1E8]/55 max-w-xl mx-auto leading-relaxed">
            A quiet corner for unhurried mornings, honest coffee, and pastries
            baked before sunrise. Come sit a while, the pot's always on.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={function () {
                setContactOpen(true);
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8912E] text-[#0F1512] text-sm font-semibold shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/40 transition-all"
            >
              Visit Us
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <a
              href="#menu"
              className="text-sm underline underline-offset-4 decoration-[#D4AF37]/50 text-[#F5F1E8]/70 hover:text-[#D4AF37] transition-colors"
            >
              Browse the menu
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 sm:gap-12 text-sm">
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">
                12+
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#F5F1E8]/40 mt-1">
                Years brewing
              </div>
            </div>
            <div className="h-8 w-px bg-[#D4AF37]/20" />
            <div>
              <div className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">
                2
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#F5F1E8]/40 mt-1">
                Locations
              </div>
            </div>
            <div className="h-8 w-px bg-[#D4AF37]/20" />
            <div>
              <div className="font-serif text-2xl sm:text-3xl flex items-center gap-1 justify-center text-[#D4AF37]">
                <Star size={18} className="fill-[#D4AF37]" /> 4.9
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#F5F1E8]/40 mt-1">
                1.2k reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 sm:py-28 bg-gradient-to-b from-[#0F1512] to-[#141B17]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
                The Menu
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl mt-3">
                From the Counter
              </h2>
            </div>
            <button
              onClick={nextSlide}
              className="shrink-0 h-11 w-11 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1512] transition-all grid place-items-center"
              aria-label="Next"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {visible.map(function (p, i) {
              return (
                <div
                  key={p.name + i}
                  className="group rounded-2xl p-6 border border-[#D4AF37]/10 bg-gradient-to-b from-[#1A2420]/60 to-transparent hover:border-[#D4AF37]/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300"
                >
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[#1F3A2E]/60 to-[#0F1512] grid place-items-center mb-5 text-[#D4AF37] group-hover:scale-105 transition-transform duration-300 border border-[#D4AF37]/5">
                    <Coffee size={36} strokeWidth={1.2} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/80 font-medium">
                    {p.tag}
                  </p>
                  <div className="flex items-baseline justify-between mt-2">
                    <h3 className="font-serif text-base sm:text-lg">{p.name}</h3>
                    <span className="font-serif text-[#D4AF37] text-sm">
                      {p.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 sm:py-28 bg-[#141B17]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-3">
              About Catery
            </h2>
            <p className="mt-5 text-[#F5F1E8]/55 leading-relaxed">
              Catery began as a single espresso cart and grew into two
              neighborhood cafes built around one idea: good coffee deserves an
              unrushed moment. Every cup is pulled to order, every pastry baked
              in-house.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#1A2420]/50 border border-[#D4AF37]/10">
                <MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">San Diego</p>
                  <p className="text-sm text-[#F5F1E8]/45">
                    4554 Oak Ave Suite 130, CA 92124
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#1A2420]/50 border border-[#D4AF37]/10">
                <MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Miami</p>
                  <p className="text-sm text-[#F5F1E8]/45">
                    2913 Oak Pl Apt 156, FL 33155
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1F3A2E] via-[#0F1512] to-[#0A0D0B] grid place-items-center shadow-2xl shadow-black/40 border border-[#D4AF37]/10">
            <Coffee size={90} strokeWidth={1} className="text-[#D4AF37]/70" />
          </div>
        </div>
      </section>

      <footer className="bg-[#0A0D0B] text-[#F5F1E8] border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-9 w-9 grid place-items-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6A1F]">
                <Coffee size={16} className="text-[#0F1512]" />
              </span>
              <span className="font-serif text-lg tracking-widest">
                CATERY
              </span>
            </div>
            <p className="mt-4 text-sm text-[#F5F1E8]/40 max-w-xs leading-relaxed">
              Slow coffee, warm rooms, and a reason to stay a little longer.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-4">
              Contact
            </h4>
            <button
              onClick={function () {
                setContactOpen(true);
              }}
              className="flex items-center gap-2 text-sm text-[#F5F1E8]/50 hover:text-[#D4AF37] mb-2.5 transition-colors"
            >
              <Phone size={14} /> +1 992-435-143
            </button>
            <button
              onClick={function () {
                setContactOpen(true);
              }}
              className="flex items-center gap-2 text-sm text-[#F5F1E8]/50 hover:text-[#D4AF37] transition-colors"
            >
              <Mail size={14} /> contact@catery.com
            </button>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-4">
              Social
            </h4>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[#F5F1E8]/50 hover:text-[#D4AF37] transition-colors"
            >
               <span>📷</span>@caterycafe
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 border-t border-[#D4AF37]/5 text-xs text-[#F5F1E8]/25 flex flex-wrap justify-between gap-2">
          <p>Catery. All rights reserved.</p>
          <p>Crafted with care, Brewed with love</p>
        </div>
      </footer>

      {contactOpen && (
        <ContactModal
          onClose={function () {
            setContactOpen(false);
          }}
        />
      )}
    </div>
  );
}

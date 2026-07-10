import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Watches', href: '#featured' },
    { name: 'Collections', href: '#collections' },
    { name: 'Story', href: '#story' },
    { name: 'Features', href: '#features' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${
      isScrolled
        ? 'bg-[#0F0F0F]/85 backdrop-blur-[12px] border-white/5 shadow-lg'
        : 'bg-[#0F0F0F]/40 backdrop-blur-[6px] border-transparent'
    } h-20`}>
      {/* Centered container with max-width 1280px and 32px (px-8) horizontal padding */}
      <div className="max-w-[1280px] h-full mx-auto px-8 flex items-center justify-between relative">
        
        {/* Left: Logo (Compact, no stretch) */}
        <div className="flex items-center shrink-0">
          <a href="#home" className="flex items-center leading-none">
            <span className="font-serif text-2xl font-bold tracking-[0.1em] text-white hover:text-chrono-gold transition-colors duration-300 leading-none">
              CHRONO<span className="text-chrono-gold">LUX</span>
            </span>
          </a>
        </div>

        {/* Center: Navigation Links (centered, guaranteed 80px space from logo/CTA) */}
        <div className="hidden lg:flex items-center justify-center flex-grow mx-[80px] space-x-8 xl:space-x-10 h-full leading-none">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs xl:text-sm font-semibold tracking-wider uppercase text-chrono-lightGray hover:text-white transition-colors duration-300 relative py-2 leading-none after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-chrono-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTA Button (Height: 46px, fits text, aligned to the far right) */}
        <div className="hidden lg:flex items-center shrink-0 leading-none">
          <a
            href="#collections"
            className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-chrono-gold to-chrono-goldDark hover:from-chrono-goldLight hover:to-chrono-gold text-black font-semibold text-xs tracking-wider uppercase h-[46px] px-6 rounded-[12px] transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-chrono-gold transition-colors p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-chrono-dark border-b border-chrono-gold/10 transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 visible h-screen' : 'opacity-0 invisible h-0 overflow-hidden'
      }`}>
        <div className="flex flex-col items-center justify-center space-y-8 pt-16 pb-12 bg-[#0B0B0B]/95 h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium tracking-widest uppercase text-chrono-lightGray hover:text-chrono-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#collections"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 bg-gradient-to-r from-chrono-gold to-chrono-goldDark text-black font-semibold text-sm tracking-widest uppercase h-[46px] px-8 rounded-[12px] transition-all duration-300 w-[80%] justify-center"
          >
            <span>Explore Collection</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

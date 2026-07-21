import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chrono-dark border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16 relative z-10">
        
        {/* Logo and Description */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <a href="#home" className="flex items-center space-x-2 leading-none">
            <span className="font-serif text-2xl font-bold tracking-[0.1em] text-white">
              CHRONO<span className="text-chrono-gold">LUX</span>
            </span>
          </a>
          <p className="text-chrono-gray text-xs sm:text-sm leading-relaxed max-w-sm">
            Crafting precision Swiss watches since 2006. ChronoLux stands as a beacon of luxury, accuracy, and generational heritage.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-chrono-gold hover:text-black text-white transition-all duration-300">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-chrono-gold hover:text-black text-white transition-all duration-300">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-chrono-gold hover:text-black text-white transition-all duration-300">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 flex flex-col space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-2">
            Quick Links
          </h4>
          <a href="#home" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Home
          </a>
          <a href="#featured" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Watches
          </a>
          <a href="#collections" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Collections
          </a>
          <a href="#story" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Story
          </a>
          <a href="#contact" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Contact
          </a>
        </div>

        {/* Collections */}
        <div className="lg:col-span-2 flex flex-col space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-2">
            Collections
          </h4>
          <a href="#collections" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Classic
          </a>
          <a href="#collections" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Sport
          </a>
          <a href="#collections" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Luxury
          </a>
          <a href="#collections" className="text-chrono-gray hover:text-chrono-gold text-xs sm:text-sm transition-colors duration-300">
            Limited Edition
          </a>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-2">
            Contact Information
          </h4>
          <div className="flex items-start space-x-3 text-chrono-gray hover:text-white transition-colors duration-300">
            <Mail size={16} className="text-chrono-gold shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm">concierge@chronolux.ch</span>
          </div>
          <div className="flex items-start space-x-3 text-chrono-gray hover:text-white transition-colors duration-300">
            <Phone size={16} className="text-chrono-gold shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm">+41 22 555 0190</span>
          </div>
          <div className="flex items-start space-x-3 text-chrono-gray hover:text-white transition-colors duration-300">
            <MapPin size={16} className="text-chrono-gold shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm">Rue du Rhône 42, 1204 Geneva, Switzerland</span>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-[1280px] mx-auto px-8 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-center">
        <p className="text-chrono-gray text-[11px] sm:text-xs">
          &copy; {new Date().getFullYear()} ChronoLux. All rights reserved. Made for connoisseurs of time.
        </p>
        <div className="flex space-x-6 text-[11px] sm:text-xs">
          <a href="#privacy" className="text-chrono-gray hover:text-chrono-gold transition-colors">Privacy Policy</a>
          <a href="#terms" className="text-chrono-gray hover:text-chrono-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

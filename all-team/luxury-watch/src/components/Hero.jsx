import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-chrono-dark flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.06),transparent_50%)]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-chrono-gold/3 rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-chrono-gold"></span>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold">
              Swiss Precision &amp; Heritage
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-6"
          >
            Crafted For Those Who <span className="gold-gradient-text block sm:inline">Value Time</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-chrono-lightGray leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
          >
            Experience timeless craftsmanship, premium materials, and elegant designs created for every occasion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#featured"
              className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-chrono-gold to-chrono-goldDark hover:from-chrono-goldLight hover:to-chrono-gold text-black font-semibold tracking-wider text-xs uppercase h-12 px-8 rounded-[12px] shadow-md transition-all duration-300"
            >
              <span>Explore Watches</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <a
              href="#story"
              className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 border border-white/10 hover:border-chrono-gold text-white font-semibold tracking-wider text-xs uppercase h-12 px-8 rounded-[12px] transition-all duration-300"
            >
              <Play size={12} className="text-chrono-gold fill-chrono-gold transition-transform duration-300" />
              <span>Learn More</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Simple & Elegant Watch Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
          {/* Subtle gold spotlight behind the watch */}
          <div className="absolute w-[300px] h-[300px] bg-chrono-gold/5 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Floating Watch Container (entry fade only, no infinite hover loop to distract the user) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 max-w-[360px] sm:max-w-none"
          >
            <img 
              src="/images/hero-watch.jpg" 
              alt="ChronoLux Premium Watch" 
              className="w-full h-auto object-contain rounded-[16px] border border-white/5 bg-chrono-charcoal/20 shadow-2xl p-4 sm:p-6"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

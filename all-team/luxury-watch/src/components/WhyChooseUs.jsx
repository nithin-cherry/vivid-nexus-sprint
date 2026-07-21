import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Gem, Award, Globe } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-chrono-gold" />,
    title: 'Swiss Precision',
    description: 'Every movement is hand-calibrated in Switzerland, achieving Chronometer-grade accuracy and a 72-hour reserve.'
  },
  {
    icon: <Gem className="w-6 h-6 text-chrono-gold" />,
    title: 'Premium Materials',
    description: 'We source only 18k rose gold, grade 5 titanium, scratch-proof sapphire crystal, and premium alligator leather.'
  },
  {
    icon: <Award className="w-6 h-6 text-chrono-gold" />,
    title: '5-Year Warranty',
    description: 'Our commitment to quality allows us to provide a comprehensive, transferrable 5-year guarantee on all components.'
  },
  {
    icon: <Globe className="w-6 h-6 text-chrono-gold" />,
    title: 'Worldwide Shipping',
    description: 'Each order is hand-packaged, fully insured, and delivered globally via private concierge courier service.'
  }
];

const WhyChooseUs = () => {
  return (
    <section id="features" className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-chrono-gold/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold block mb-3">
            Why ChronoLux
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Uncompromising Excellence
          </h2>
          <div className="w-12 h-[1px] bg-chrono-gold mx-auto mb-6"></div>
          <p className="text-chrono-gray text-sm sm:text-base leading-relaxed">
            Discover the values that elevate ChronoLux from a simple watchmaker to an internationally recognized emblem of luxury.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-chrono-charcoal/40 backdrop-blur-sm p-6 rounded-[12px] border border-white/5 hover:border-chrono-gold/20 transition-all duration-300 hover:bg-chrono-charcoal/65 text-left relative overflow-hidden"
            >
              <div className="mb-5 p-3 bg-white/5 inline-block rounded-[8px] transition-colors duration-300 group-hover:bg-chrono-gold/10">
                {feat.icon}
              </div>
              
              <h3 className="font-serif text-lg font-bold text-white mb-3 tracking-wide transition-colors duration-300 group-hover:text-chrono-gold">
                {feat.title}
              </h3>
              
              <p className="text-chrono-lightGray text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-white">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

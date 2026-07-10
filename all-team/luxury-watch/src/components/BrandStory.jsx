import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '120+', label: 'Watch Designs' },
  { value: '98%', label: 'Customer Satisfaction' },
];

const BrandStory = () => {
  return (
    <section id="story" className="py-24 bg-chrono-dark relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-chrono-gold/3 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-chrono-gold/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Images Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden rounded-[16px] border border-white/5 shadow-2xl">
              <img
                src="/images/story-workshop.jpg"
                alt="Watchmaker workshop craft"
                className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chrono-dark/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Side: Copy & Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold block mb-3">
              Our Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Precision Crafted, <br /><span className="gold-gradient-text">Timelessly Designed</span>
            </h2>
            <div className="w-12 h-[1px] bg-chrono-gold mb-8"></div>

            <p className="text-chrono-lightGray text-sm sm:text-base leading-relaxed mb-6">
              At ChronoLux, we believe a watch is more than a tool for keeping time—it is a legacy, an intricate marriage of heritage art and mechanical perfection. Established in Geneva, Switzerland, our master horologists have spent decades refining our signature self-winding movements.
            </p>
            <p className="text-chrono-gray text-xs sm:text-sm leading-relaxed mb-8">
              Each piece requires over a hundred hours of hand-assembly, crafted utilizing pristine 18-karat gold, scratch-proof sapphire crystal, and durable 904L stainless steel. Our commitment to accuracy and luxurious detail ensures that every timepiece holds its value across generations.
            </p>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 border-t border-white/10 pt-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-chrono-gold block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-chrono-gray font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;

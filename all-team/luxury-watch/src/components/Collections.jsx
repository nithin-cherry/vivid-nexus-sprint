import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: 'Classic Collection',
    description: 'Timeless designs with minimalist dials and fine leather straps, epitomizing traditional watchmaking elegance.',
    image: '/images/collections-classic.jpg',
  },
  {
    id: 2,
    title: 'Sport Collection',
    description: 'Durable, high-performance chronographs engineered to survive extreme elements without losing precision.',
    image: '/images/watch5.jpg',
  },
  {
    id: 3,
    title: 'Luxury Collection',
    description: 'Exquisite pieces adorned with precious metals, sapphire dials, and complex self-winding mechanical movements.',
    image: '/images/watch3.jpg',
  },
  {
    id: 4,
    title: 'Limited Edition',
    description: 'Rare masterworks. Separately numbered series created for selective collectors who demand the extraordinary.',
    image: '/images/collections-limited.jpg',
  },
];

const Collections = () => {
  return (
    <section id="collections" className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-chrono-gold/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold block mb-3">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Signature Collections
            </h2>
            <div className="w-12 h-[1px] bg-chrono-gold mt-4 mb-2 md:mb-0"></div>
          </div>
          <p className="text-chrono-gray max-w-md text-sm sm:text-base leading-relaxed">
            Each category represents a philosophy of design, tailored to complement different lifestyles and individual styles.
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[380px] sm:h-[450px] overflow-hidden rounded-[12px] border border-white/5 shadow-2xl transition-all duration-300 hover:border-chrono-gold/20"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-chrono-dark via-chrono-dark/75 to-transparent transition-all duration-300" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-chrono-gold uppercase mb-2">
                  Category {index + 1}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wide">
                  {col.title}
                </h3>
                <p className="text-chrono-lightGray text-xs sm:text-sm leading-relaxed max-w-sm mb-6 opacity-90 transition-opacity duration-300">
                  {col.description}
                </p>
                <div>
                  <button className="group/btn flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-white hover:text-chrono-gold transition-colors duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;

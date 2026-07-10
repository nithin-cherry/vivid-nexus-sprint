import React from 'react';
import { motion } from 'framer-motion';
import { Star, Eye } from 'lucide-react';

const watches = [
  {
    id: 1,
    name: 'ChronoLux Royal Oak',
    description: '18k rose gold case, self-winding movement, signature octagonal bezel.',
    price: '$18,500',
    rating: 4.9,
    image: '/images/hero-watch.jpg',
  },
  {
    id: 2,
    name: 'Obsidian Automatic',
    description: 'Sleek stainless steel case, jet-black watch face, exposed gears detail.',
    price: '$9,200',
    rating: 4.8,
    image: '/images/watch2.jpg',
  },
  {
    id: 3,
    name: 'Mariner Diver Gold',
    description: 'Waterproof up to 300m, polished gold finishes, ceramic rotating bezel.',
    price: '$14,800',
    rating: 4.9,
    image: '/images/watch3.jpg',
  },
  {
    id: 4,
    name: 'Aetheria Chronograph',
    description: 'Hand-stitched Italian leather strap, triple sub-dials, sapphire crystal.',
    price: '$6,500',
    rating: 4.7,
    image: '/images/watch4.jpg',
  },
  {
    id: 5,
    name: 'Excalibur Skeleton',
    description: 'Fully skeletonized mechanism, titanium frame, manual winding power reserve.',
    price: '$22,000',
    rating: 5.0,
    image: '/images/watch5.jpg',
  },
  {
    id: 6,
    name: 'Vanguard Classic',
    description: 'Slim profile design, pristine white dial, elegant rose gold numerals.',
    price: '$7,800',
    rating: 4.8,
    image: '/images/watch6.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const FeaturedWatches = () => {
  return (
    <section id="featured" className="py-24 bg-chrono-dark relative overflow-hidden">
      {/* Subtle background radial spotlight */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-chrono-gold/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold block mb-3">
            Selected Masterpieces
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Featured Collection
          </h2>
          <div className="w-12 h-[1px] bg-chrono-gold mx-auto mb-6"></div>
          <p className="text-chrono-gray text-sm sm:text-base leading-relaxed">
            Explore our curated selection of top-tier luxury timepieces, demonstrating unparalleled precision and exquisite artistic value.
          </p>
        </div>

        {/* Watches Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {watches.map((watch) => (
            <motion.div
              key={watch.id}
              variants={cardVariants}
              className="group bg-chrono-charcoal rounded-[12px] overflow-hidden border border-white/5 hover:border-chrono-gold/20 transition-all duration-300 shadow-xl shadow-black/45"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/20 flex items-center justify-center">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button className="flex items-center space-x-2 bg-white text-black font-semibold text-xs tracking-wider uppercase h-10 px-5 rounded-[8px] transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-chrono-gold">
                    <Eye size={14} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              {/* Watch Details */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-serif text-lg font-bold tracking-wide text-white group-hover:text-chrono-gold transition-colors duration-300">
                      {watch.name}
                    </h3>
                    <div className="flex items-center space-x-1 shrink-0">
                      <Star size={14} className="fill-chrono-gold text-chrono-gold" />
                      <span className="text-xs font-semibold text-white">{watch.rating}</span>
                    </div>
                  </div>
                  <p className="text-chrono-gray text-xs sm:text-sm leading-relaxed mb-6">
                    {watch.description}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-5 mt-auto">
                  <div>
                    <span className="text-[10px] text-chrono-gray uppercase tracking-widest block">Price</span>
                    <span className="text-base font-serif font-bold text-chrono-gold">{watch.price}</span>
                  </div>
                  <button className="text-xs uppercase tracking-widest font-semibold text-white hover:text-chrono-gold transition-colors duration-300">
                    Acquire Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWatches;

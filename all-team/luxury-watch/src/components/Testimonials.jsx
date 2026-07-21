import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Alexander Sterling',
    role: 'Heritage Collector',
    image: '/images/avatar-alexander.jpg',
    review: 'The Royal Oak is a horological masterpiece. The self-winding movement is incredibly precise, and the 18k rose gold finish has a warmth that catches the light beautifully. The ordering process was seamless and prestigious.',
    rating: 5,
  },
  {
    name: 'Sophia Laurent',
    role: 'Executive Director',
    image: '/images/avatar-sophia.jpg',
    review: 'As someone who values both precision and aesthetics, ChronoLux exceeds every expectation. The design is elegant enough for gala dinners and versatile enough for daily executive meetings. Truly a spectacular brand.',
    rating: 5,
  },
  {
    name: 'Julian Vance',
    role: 'Adventure Enthusiast',
    image: '/images/avatar-julian.jpg',
    review: 'My Mariner Diver has been with me through reef dives and mountain runs. Its scratch-proof sapphire crystal and water sealing are bulletproof, yet it maintains its status as an elegant luxury accessory. 10/10.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 bg-chrono-dark relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-chrono-gold/3 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-chrono-gold/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold block mb-3">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-chrono-gold mx-auto mb-6"></div>
          <p className="text-chrono-gray text-sm sm:text-base leading-relaxed">
            Read stories from our distinguished clients who have incorporated ChronoLux timepieces into their legacies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glassmorphism p-6 sm:p-8 rounded-[12px] flex flex-col justify-between relative shadow-xl transition-all duration-300 hover:border-chrono-gold/20"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-chrono-gold/10 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(item.rating)].map((_, index) => (
                    <Star key={index} size={14} className="fill-chrono-gold text-chrono-gold" />
                  ))}
                </div>
                
                {/* Testimonial Review Text */}
                <p className="text-chrono-lightGray text-xs sm:text-sm leading-relaxed italic mb-8">
                  "{item.review}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-4 border-t border-white/5 pt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-chrono-gold/20"
                />
                <div className="text-left">
                  <h4 className="font-serif font-bold text-white text-sm tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-chrono-gray">
                    {item.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-chrono-gold/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glassmorphism p-8 sm:p-16 rounded-[16px] border border-chrono-gold/15 relative overflow-hidden max-w-4xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-chrono-gold block mb-3">
            Exclusive Updates
          </span>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Join The ChronoLux Community
          </h2>
          
          <p className="text-chrono-lightGray text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
            Subscribe to receive private invitations to new releases, limited-edition announcements, and member-only events.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow bg-black/60 border border-white/10 hover:border-chrono-gold/30 focus:border-chrono-gold text-white placeholder-chrono-gray text-sm h-12 px-6 rounded-[12px] outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-chrono-gold to-chrono-goldDark hover:from-chrono-goldLight hover:to-chrono-gold text-black font-semibold tracking-wider text-xs uppercase h-12 px-8 rounded-[12px] shadow-md transition-all duration-300 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center space-y-3 py-4"
            >
              <CheckCircle className="w-10 h-10 text-chrono-gold mb-2" />
              <h3 className="text-white font-serif text-xl font-bold">You are subscribed</h3>
              <p className="text-chrono-gray text-xs sm:text-sm">We have sent a confirmation email to your inbox.</p>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedWatches from './components/FeaturedWatches';
import Collections from './components/Collections';
import BrandStory from './components/BrandStory';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-chrono-dark text-white selection:bg-chrono-gold selection:text-black font-sans">
      <Navbar />
      <Hero />
      <FeaturedWatches />
      <Collections />
      <BrandStory />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;

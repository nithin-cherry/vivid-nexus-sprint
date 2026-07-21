import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import CoreModules from './components/CoreModules'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Marquee text="ERP ADMIN TEMPLATE" />
      <CoreModules />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App

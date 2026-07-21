import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PaymentForm from "../components/PaymentForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <PaymentForm />
      </main>

      <Footer />
    </>
  );
}

export default Home;
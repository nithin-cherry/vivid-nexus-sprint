import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PaymentStatus from "./pages/PaymentStatus";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment-status/:transactionId" element={<PaymentStatus />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
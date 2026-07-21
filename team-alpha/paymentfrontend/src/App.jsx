import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Success from "./pages/Success";
import Failed from "./pages/Failed";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
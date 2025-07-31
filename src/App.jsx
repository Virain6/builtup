import { useState } from "react";
import Hero from "./pages/LandingPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import QuoteSection from "./pages/QuotePage.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hero />
      <ServicesPage />
      <QuoteSection />
    </>
  );
}

export default App;

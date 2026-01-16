import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Success from "./pages/Success";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/success" element={<Success />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

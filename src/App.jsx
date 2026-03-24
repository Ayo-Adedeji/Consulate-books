import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Checkout from "./pages/Checkout";
import CartCheckout from "./pages/CartCheckout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Success from "./pages/Success";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import AnnouncementBar from "./components/AnnouncementBar";
import ToastNotification from "./components/ToastNotification";

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <BrowserRouter>
          <AnnouncementBar />
          <Navbar />
          <ToastNotification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/checkout/cart" element={<CartCheckout />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ToastProvider>
    </CartProvider>
  );
}

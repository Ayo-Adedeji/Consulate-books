import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";
import { FiShoppingCart } from "react-icons/fi";
import consulate from "../assets/consulate.png";

export default function Navbar() {
  const { cartCount } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-primary to-[#1a4a7a] text-white px-6 py-3 flex items-center justify-between fixed top-0 left-0 w-full z-40 shadow-soft backdrop-blur-sm">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={consulate}
            alt="Consulate Books Logo"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-azure transition-all duration-300"
          />
          <span className="text-lg font-montserrat font-bold tracking-wide">Consulate Books</span>
        </a>

        {/* Cart Icon */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="relative p-2 hover:bg-white/15 rounded-xl transition-all duration-300 hover:scale-110"
          aria-label="Open cart"
        >
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span
              key={cartCount}
              className="absolute -top-1 -right-1 bg-azure text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-badgePop shadow-soft"
            >
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

import { createContext, useContext, useState } from "react";
import { getEbookPricing } from "../utils/pricing";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    const { hasEbook, finalPrice } = getEbookPricing(book);
    if (!hasEbook) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        id: book.id,
        title: book.title,
        cover: book.cover,
        ebookPrice: finalPrice,   // always the correct final price
        pdf: book.pdf || null,
        quantity: 1,
      }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, delta) => {
    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item.id === bookId) {
          const newQty = item.quantity + delta;
          if (newQty < 1) return acc;
          return [...acc, { ...item, quantity: newQty }];
        }
        return [...acc, item];
      }, [])
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.ebookPrice * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout/cart");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-card shadow-soft z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-poppins font-bold text-xl text-heading">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-heading transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-3">
              <span className="text-5xl">🛒</span>
              <p className="font-inter">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-start border-b pb-4">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-sm text-heading line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-azure font-semibold text-sm mt-1">
                    ₦{item.ebookPrice.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeFromCart(item.id)
                          : updateQuantity(item.id, -1)
                      }
                      className="w-7 h-7 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-inter text-sm w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-400 hover:text-red-600 text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-4 border-t space-y-3">
            <div className="flex justify-between font-poppins font-bold text-lg text-heading">
              <span>Subtotal</span>
              <span className="text-azure">₦{cartTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-azure to-primary text-white py-3 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

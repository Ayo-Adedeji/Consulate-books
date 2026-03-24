import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useCart } from "../context/CartContext";

export default function CartCheckout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) return null;

  const payWithPaystack = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const fullname = e.target.fullname?.value || "";
    const phone = e.target.phone?.value || "";

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_LIVE_KEY,
      email,
      amount: cartTotal * 100,
      currency: "NGN",
      callback: function () {
        cartItems.forEach((item) => {
          emailjs.send(
            "service_q8o2kpq",
            "template_wp7nkoz",
            {
              to_email: email,
              book_title: item.title,
              purchase_type: "ebook",
              amount: `₦${item.ebookPrice.toLocaleString()}`,
              pdf_link: item.pdf ? window.location.origin + item.pdf : "N/A",
              delivery_message:
                "Thank you for choosing this book. I hope it challenged, informed, or inspired you. Share it with others and leave a review — that support keeps ideas alive.",
            },
            "GFNcO2hqHL5f86mOw"
          ).catch(console.error);
        });

        emailjs.send(
          "service_q8o2kpq",
          "template_8jg8bik",
          {
            admin_email: "admin@consulaterecruitment.co.uk",
            book_title: cartItems.map((i) => i.title).join(", "),
            purchase_type: "ebook (cart)",
            buyer_email: email,
            buyer_name: fullname || "N/A",
            phone: phone || "N/A",
            address: "N/A",
            state: "N/A",
            total: `₦${cartTotal.toLocaleString()}`,
          },
          "GFNcO2hqHL5f86mOw"
        ).catch(console.error);

        const purchasedBooks = [...cartItems];
        clearCart();
        navigate("/success", { state: { purchasedBooks, email, fullname } });
      },
      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-bg via-blue-50 to-white">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-poppins font-bold text-heading mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Form (65%) */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl shadow-card p-8">
              <h2 className="font-poppins font-semibold text-xl text-heading mb-6">Your Details</h2>
              <form onSubmit={payWithPaystack} className="space-y-4">
                <div>
                  <label className="block font-inter text-sm text-gray-600 mb-1">Email address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-azure"
                  />
                </div>
                <div>
                  <label className="block font-inter text-sm text-gray-600 mb-1">Full name (optional)</label>
                  <input
                    name="fullname"
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-azure"
                  />
                </div>
                <div>
                  <label className="block font-inter text-sm text-gray-600 mb-1">Phone (optional)</label>
                  <input
                    name="phone"
                    placeholder="Your phone number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-azure"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-azure to-primary text-white py-4 rounded-xl font-poppins font-bold text-lg hover:scale-105 hover:shadow-soft transition-all duration-300 mt-4"
                >
                  Pay ₦{cartTotal.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary (35%) */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-card p-6 sticky top-32">
              <h2 className="font-poppins font-semibold text-xl text-heading mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins font-semibold text-sm text-heading line-clamp-2">
                        {item.title}
                      </p>
                      <p className="font-inter text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-inter text-sm font-semibold text-azure flex-shrink-0">
                      ₦{(item.ebookPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-poppins font-bold text-heading text-lg">Total</span>
                <span className="font-poppins font-bold text-azure text-xl">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

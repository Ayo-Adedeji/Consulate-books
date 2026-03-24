import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { books } from "../data/books";
import { getFinalPrice, hasDiscount, getDiscountPercent } from "../utils/pricing";

const DELIVERY_FEES = {
  "South West": 1500, "South East": 2000, "South South": 2500,
  "North East": 3000, "North West": 3000, "North Central": 2500,
  "United Kingdom": 8000,
};

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const book = books.find(b => b.id === id);

  const typeParam = new URLSearchParams(location.search).get("type") || "ebook";
  const [purchaseType] = useState(typeParam);
  const [state, setState] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (purchaseType === "hardcopy") setDeliveryFee(DELIVERY_FEES[state] || 0);
  }, [state, purchaseType]);

  if (!book) return <p className="text-center py-20">Book not found</p>;

  const priceObj = book.prices?.[purchaseType] ?? null;
  const originalPrice = priceObj?.original ?? 0;
  const finalPrice = getFinalPrice(priceObj);
  const isDiscounted = hasDiscount(priceObj);
  const discountPct = getDiscountPercent(priceObj);
  const totalAmount = purchaseType === "hardcopy" ? finalPrice + deliveryFee : finalPrice;

  const handleStateChange = (value) => {
    setState(value);
    setDeliveryFee(DELIVERY_FEES[value] || 0);
  };

  const payWithPaystack = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const fullname = e.target.fullname?.value || "";
    const phone = e.target.phone?.value || "";
    const address = e.target.address?.value || "";

    if (purchaseType === "hardcopy" && !state) {
      alert("Please select a delivery location");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_LIVE_KEY,
      email,
      amount: totalAmount * 100,
      currency: "NGN",
      callback: function () {
        const deliveryMessage =
          purchaseType === "ebook"
            ? "Thank you for choosing this book and taking the time to read it. I hope it challenged, informed, or inspired you in a meaningful way. If it did, don't stop—your voice matters. Share the book with others, recommend it, leave a review, or talk about it online or in your community. That support is what keeps ideas alive and helps this work reach the readers who need it next."
            : "Thank you for purchasing the hard copy of this book. Delivery details will be communicated to you shortly. Your book should arrive within 3–5 working days. We appreciate your support and hope this book adds value to you.";

        emailjs.send("service_q8o2kpq", "template_wp7nkoz", {
          to_email: email,
          book_title: book.title,
          purchase_type: purchaseType,
          amount: `₦${totalAmount}`,
          pdf_link: purchaseType === "ebook" ? window.location.origin + book.pdf : "N/A",
          delivery_message: deliveryMessage,
        }, "GFNcO2hqHL5f86mOw");

        emailjs.send("service_q8o2kpq", "template_8jg8bik", {
          admin_email: "admin@consulaterecruitment.co.uk",
          book_title: book.title,
          purchase_type: purchaseType,
          buyer_email: email,
          buyer_name: fullname || "N/A",
          phone: phone || "N/A",
          address: address || "N/A",
          state: state || "N/A",
          total: `₦${totalAmount}`,
        }, "GFNcO2hqHL5f86mOw");

        navigate("/success", { state: { bookId: book.id, purchaseType, email, fullname } });
      },
      onClose: function () { alert("Payment cancelled"); },
    });

    handler.openIframe();
  };

  return (
    <div className="bg-gradient-to-br from-bg to-blue-50 min-h-screen py-20 px-6 pt-28">
      <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-card border border-gray-100 p-8 grid md:grid-cols-2 gap-10">

        {/* Left — order summary */}
        <div>
          <img src={book.cover} alt={book.title} className="w-48 rounded-xl shadow mb-6" />
          <h1 className="text-2xl font-montserrat font-bold text-heading">{book.title}</h1>
          <p className="text-gray-500 font-inter">by {book.author}</p>

          <div className="mt-6 space-y-2 border-t pt-4 font-inter">
            {isDiscounted && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Original Price</span>
                <span className="line-through text-gray-400">
                  ₦{originalPrice.toLocaleString()} {discountPct ? `(${discountPct}% off)` : ""}
                </span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg">
              <span>Price</span>
              <span className="text-azure">₦{finalPrice.toLocaleString()}</span>
            </div>
            {purchaseType === "hardcopy" && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span className="text-azure">₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div>
          <form onSubmit={payWithPaystack} className="space-y-4">
            <input
              name="email" required placeholder="Email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter focus:outline-none focus:ring-2 focus:ring-azure"
            />
            {purchaseType === "hardcopy" && (
              <>
                <input name="fullname" required placeholder="Full name" className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter focus:outline-none focus:ring-2 focus:ring-azure" />
                <input name="phone" required placeholder="Phone number" className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter focus:outline-none focus:ring-2 focus:ring-azure" />
                <textarea name="address" required placeholder="Delivery address" className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter focus:outline-none focus:ring-2 focus:ring-azure" />
                <textarea name="landmark" required placeholder="Nearest Landmark" className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter focus:outline-none focus:ring-2 focus:ring-azure" />
                <select required onChange={e => handleStateChange(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter focus:outline-none focus:ring-2 focus:ring-azure">
                  <option value="">Select location</option>
                  <option value="South West">South West (₦1,500)</option>
                  <option value="South East">South East (₦2,000)</option>
                  <option value="South South">South South (₦2,500)</option>
                  <option value="North East">North East (₦3,000)</option>
                  <option value="North West">North West (₦3,000)</option>
                  <option value="North Central">North Central (₦2,500)</option>
                  <option value="United Kingdom">United Kingdom (₦8,000)</option>
                </select>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-azure to-primary text-white py-3 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300"
            >
              Pay ₦{totalAmount.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

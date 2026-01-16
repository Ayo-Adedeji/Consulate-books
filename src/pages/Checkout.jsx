import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { books } from "../data/books";

const DELIVERY_FEES = { lagos:2000, ogun:2000, southwest:4000, north:5000, uk:15000 };

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const book = books.find(b => b.id === id);

  const typeParam = new URLSearchParams(location.search).get("type") || "ebook";
  const [purchaseType, setPurchaseType] = useState(typeParam);
  const [state, setState] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (purchaseType === "hardcopy") setDeliveryFee(DELIVERY_FEES[state] || 0);
  }, [state, purchaseType]);

  if (!book) return <p className="text-center py-20">Book not found</p>;

  const getOriginalPrice = () => book.prices[purchaseType]?.original || 0;
  const getDiscountedPrice = () => book.prices[purchaseType]?.discounted || getOriginalPrice();
  const totalAmount = purchaseType === "hardcopy" ? getDiscountedPrice() + deliveryFee : getDiscountedPrice();

  const getPercentageOff = () => {
    const original = getOriginalPrice();
    const discounted = getDiscountedPrice();
    if (original === discounted) return null;
    return Math.round(((original - discounted)/original)*100);
  };

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

    if (purchaseType==="hardcopy" && !state) { alert("Please select a delivery location"); return; }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_LIVE_KEY,
      email,
      amount: totalAmount*100,
      currency: "NGN",
      callback: function() {
        // Email buyer
        emailjs.send(
          "service_q8o2kpq",
          "template_wp7nkoz",
          {
            to_email: email,
            book_title: book.title,
            purchase_type: purchaseType,
            amount: `₦${totalAmount}`,
            pdf_link: purchaseType==="ebook" ? window.location.origin + book.pdf : "N/A"
          },
          "GFNcO2hqHL5f86mOw"
        );

        // Email admin
        emailjs.send(
          "service_q8o2kpq",
          "template_8jg8bik",
          {
            book_title: book.title,
            purchase_type: purchaseType,
            buyer_email: email,
            buyer_name: fullname || "N/A",
            phone: phone || "N/A",
            address: address || "N/A",
            state: state || "N/A",
            total: `₦${totalAmount}`
          },
          "GFNcO2hqHL5f86mOw"
        );

        // Redirect
        navigate("/success", { state: { bookId: book.id, purchaseType, email, fullname } });
      },
      onClose: function(){ alert("Payment cancelled"); }
    });

    handler.openIframe();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        {/* Left */}
        <div>
          <img src={book.cover} alt={book.title} className="w-48 rounded-xl shadow mb-6" />
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-500">by {book.author}</p>

          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Original Price</span>
              <span className="line-through text-red-500">
                ₦{getOriginalPrice()} {getPercentageOff() ? `${getPercentageOff()}% off` : ""}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Price</span>
              <span>₦{getDiscountedPrice()}</span>
            </div>
            {purchaseType==="hardcopy" && (
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₦{deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₦{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <form onSubmit={payWithPaystack} className="space-y-4">
            <input name="email" required placeholder="Email" className="w-full border rounded-lg px-4 py-3" />
            {purchaseType==="hardcopy" && (
              <>
                <input name="fullname" required placeholder="Full name" className="w-full border rounded-lg px-4 py-3" />
                <input name="phone" required placeholder="Phone number" className="w-full border rounded-lg px-4 py-3" />
                <textarea name="address" required placeholder="Delivery address" className="w-full border rounded-lg px-4 py-3" />
                <select required onChange={(e)=>handleStateChange(e.target.value)} className="w-full border rounded-lg px-4 py-3">
                  <option value="">Select location</option>
                  <option value="lagos">Lagos (₦2,000)</option>
                  <option value="ogun">Ogun (₦2,000)</option>
                  <option value="southwest">Other SW (₦4,000)</option>
                  <option value="north">North (₦5,000)</option>
                  <option value="uk">UK (₦15,000)</option>
                </select>
              </>
            )}
            <button className="w-full bg-primary text-white py-3 rounded-lg">
              Pay ₦{totalAmount}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

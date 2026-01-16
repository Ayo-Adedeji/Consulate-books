import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { books } from "../data/books";

const DELIVERY_FEES = {
  lagos: 2000,
  ogun: 2000,
  southwest: 4000,
  north: 5000,
  uk: 15000,
};

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  const [purchaseType, setPurchaseType] = useState("ebook");
  const [state, setState] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  if (!book) return <p className="text-center py-20">Book not found</p>;

  const handleStateChange = (value) => {
    setState(value);
    setDeliveryFee(DELIVERY_FEES[value] || 0);
  };

  const getOriginalPrice = () => book.prices[purchaseType]?.original || 0;
  const getDiscountedPrice = () => book.prices[purchaseType]?.discounted || getOriginalPrice();

  const totalAmount =
    purchaseType === "hardcopy"
      ? getDiscountedPrice() + deliveryFee
      : getDiscountedPrice();

  const getPercentageOff = () => {
    const original = getOriginalPrice();
    const discounted = getDiscountedPrice();
    if (original === discounted) return null;
    return Math.round(((original - discounted) / original) * 100);
  };

  const payWithPaystack = (e) => {
    e.preventDefault();

    if (purchaseType === "hardcopy" && !state) {
      alert("Please select a delivery location");
      return;
    }

    const email = e.target.email.value;
    const fullname = e.target.fullname?.value || "";
    const phone = e.target.phone?.value || "";
    const address = e.target.address?.value || "";

    const deliveryMessage =
      purchaseType === "ebook"
        ? `Thank you for choosing this book and taking the time to read it. I hope it challenged, informed, or inspired you in a meaningful way. If it did, don’t stop — your voice matters. Share the book with others, recommend it, leave a review, or talk about it online or in your community. That support is what keeps ideas alive and helps this work reach the readers who need it next.`
        : `Your hard copy will be shipped to the address you provided. Thank you for choosing this book and taking the time to read it. I hope it challenged, informed, or inspired you in a meaningful way. If it did, don’t stop — your voice matters. Share the book with others, recommend it, leave a review, or talk about it online or in your community. That support is what keeps ideas alive and helps this work reach the readers who need it next.`;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_TEST_KEY || "pk_live_XXXXXXXXXXXXXXXX",
      email,
      amount: totalAmount * 100,
      currency: "NGN",
      callback: function () {
        // Email to Buyer
        emailjs.send(
          "service_q8o2kpq",
          "template_wp7nkoz",
          {
            to_email: email,
            book_title: book.title,
            purchase_type: purchaseType,
            amount: `₦${totalAmount}`,
            delivery_fee: purchaseType === "hardcopy" ? `₦${deliveryFee}` : "N/A",
            delivery_message: deliveryMessage,
          },
          "GFNcO2hqHL5f86mOw"
        );

        // Email to Admin
        emailjs.send(
          "service_q8o2kpq",
          "template_8jg8bik",
          {
            book_title: book.title,
            purchase_type: purchaseType,
            buyer_email: email,
            buyer_name: fullname || "N/A",
            phone: phone || "N/A",
            address: address || "E-book order",
            state: state || "N/A",
            total: `₦${totalAmount}`,
          },
          "GFNcO2hqHL5f86mOw"
        );

        // WhatsApp notification
        const message = `
New Book Order 📚

Book: ${book.title}
Format: ${purchaseType}
Email: ${email}

${
  purchaseType === "hardcopy"
    ? `Name: ${fullname}
Phone: ${phone}
Address: ${address}
State: ${state}
Delivery Fee: ₦${deliveryFee}`
    : "E-book purchase"
}
`;
        const whatsappNumber = "2349031978634"; // OWNER NUMBER
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");

        // Redirect to Success page
        navigate("/success", {
          state: {
            bookTitle: book.title,
            purchaseType,
          },
        });
      },
      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div>
          <img src={book.cover} alt={book.title} className="w-48 rounded-xl shadow mb-6" />
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-500">by {book.author}</p>

          <div className="mt-6 space-y-2 border-t pt-4">
            {book.prices[purchaseType] ? (
              <>
                <div className="flex justify-between">
                  <span>Original Price</span>
                  <span className="line-through text-red-500">
                    ₦{getOriginalPrice()}{" "}
                    {getPercentageOff() ? `${getPercentageOff()}% off` : ""}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Price</span>
                  <span>₦{getDiscountedPrice()}</span>
                </div>
              </>
            ) : (
              <p className="text-gray-500 font-semibold">E-book not available</p>
            )}

            {purchaseType === "hardcopy" && (
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

        {/* RIGHT */}
        <div>
          <div className="flex gap-4 mb-6">
            {book.prices.ebook && (
              <button
                type="button"
                onClick={() => setPurchaseType("ebook")}
                className={`flex-1 py-3 rounded-lg border ${
                  purchaseType === "ebook" ? "bg-primary text-white" : ""
                }`}
              >
                Buy E-Book
              </button>
            )}
            {book.prices.hardcopy && (
              <button
                type="button"
                onClick={() => setPurchaseType("hardcopy")}
                className={`flex-1 py-3 rounded-lg border ${
                  purchaseType === "hardcopy" ? "bg-primary text-white" : ""
                }`}
              >
                Buy Hard Copy
              </button>
            )}
          </div>

          <form onSubmit={payWithPaystack} className="space-y-4">
            <input name="email" required placeholder="Email" className="w-full border rounded-lg px-4 py-3" />

            {purchaseType === "hardcopy" && (
              <>
                <input name="fullname" required placeholder="Full name" className="w-full border rounded-lg px-4 py-3" />
                <input name="phone" required placeholder="Phone number" className="w-full border rounded-lg px-4 py-3" />
                <textarea name="address" required placeholder="Delivery address" className="w-full border rounded-lg px-4 py-3" />
                <select required onChange={(e) => handleStateChange(e.target.value)} className="w-full border rounded-lg px-4 py-3">
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

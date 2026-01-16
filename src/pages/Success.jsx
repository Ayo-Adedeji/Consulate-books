import { useLocation, useNavigate } from "react-router-dom";
import { books } from "../data/books";
import { useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { bookId, purchaseType, email, fullname } = state;
  const book = books.find((b) => b.id === bookId);

  useEffect(() => {
    if (email && book && purchaseType === "ebook") {
      // Optionally resend email on load if you want
      emailjs.send(
        "service_q8o2kpq",
        "template_wp7nkoz",
        {
          to_email: email,
          book_title: book.title,
          purchase_type: purchaseType,
          pdf_link: window.location.origin + book.pdf,
          buyer_name: fullname || "N/A",
        },
        "GFNcO2hqHL5f86mOw"
      );
    }
  }, [email, book, purchaseType, fullname]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-700 mb-4">
          Thank you for purchasing <strong>{book?.title}</strong>
        </p>

        {purchaseType === "ebook" && book?.pdf ? (
          <a
            href={book.pdf}
            download
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg mb-4"
          >
            Download Your E-Book
          </a>
        ) : (
          <p className="text-gray-600 mb-6">
            Your order has been received. The book will be shipped to the address you provided.
          </p>
        )}

        <p className="text-gray-600 mb-4">
          A copy has also been sent to your email: <strong>{email}</strong>
        </p>

        <a
          href="/"
          className="inline-block bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

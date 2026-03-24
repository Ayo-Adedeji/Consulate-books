import { useLocation, useNavigate } from "react-router-dom";
import { books } from "../data/books";
import { useEffect } from "react";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) { navigate("/"); }
  }, [state, navigate]);

  if (!state) return null;

  // Multi-book cart success
  if (state.purchasedBooks) {
    const { purchasedBooks, email, fullname } = state;
    const ebookItems = purchasedBooks.filter(item => item.pdf);

    return (
      <div className="min-h-screen bg-gradient-to-br from-bg via-blue-50 to-white flex items-center justify-center px-6 py-20">
        <div className="bg-card rounded-2xl shadow-card p-10 max-w-2xl w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-poppins font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="font-inter text-gray-600 mb-6">
            Thank you{fullname ? `, ${fullname}` : ""}! Your purchase is confirmed.
          </p>

          {/* Download links */}
          {ebookItems.length > 0 && (
            <div className="mb-6 text-left">
              <h2 className="font-poppins font-semibold text-heading text-lg mb-3">Your eBooks:</h2>
              <div className="space-y-3">
                {ebookItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-bg rounded-xl px-4 py-3 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.cover} alt={item.title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0" />
                      <p className="font-inter text-sm text-heading font-medium line-clamp-2">{item.title}</p>
                    </div>
                    <a
                      href={item.pdf}
                      download
                      className="flex-shrink-0 bg-azure text-white px-4 py-2 rounded-xl font-inter text-sm font-semibold hover:bg-primary transition-colors"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="font-inter text-gray-600 mb-6 text-sm">
            Download links have also been sent to: <strong>{email}</strong>
          </p>

          <a
            href="/"
            className="inline-block bg-gradient-to-r from-azure to-primary text-white px-8 py-3 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Single-book success (existing logic — unchanged)
  const { bookId, purchaseType, email, fullname } = state;
  const book = books.find(b => b.id === bookId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-blue-50 to-white flex items-center justify-center px-6 py-20">
      <div className="bg-card rounded-2xl shadow-card border border-gray-100 p-10 max-w-lg text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-montserrat font-bold text-green-600 mb-4">Payment Successful!</h1>

        <p className="text-gray-700 mb-4 font-inter">Thank you for purchasing <strong>{book?.title}</strong></p>

        {purchaseType === "ebook" && book?.pdf ? (
          <a
            href={book.pdf}
            download
            className="inline-block bg-gradient-to-r from-azure to-primary text-white px-6 py-3 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300 mb-4"
          >
            Download Your eBook
          </a>
        ) : (
          <p className="text-gray-600 mb-6 font-inter">
            Your order has been received. The book will be shipped to the address you provided.
          </p>
        )}

        <p className="text-gray-600 mb-6 font-inter text-sm">
          A copy has also been sent to your email: <strong>{email}</strong>
        </p>

        <a
          href="/"
          className="inline-block bg-gradient-to-r from-azure to-primary text-white px-6 py-3 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

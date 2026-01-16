import { useLocation, Link } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const { bookTitle, purchaseType } = state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-700 mb-4">
          Thank you for purchasing <strong>{bookTitle}</strong>
        </p>

        {purchaseType === "ebook" ? (
          <p className="text-gray-600 mb-6">
            Your e-book will be available for download shortly or sent to your email.
          </p>
        ) : (
          <p className="text-gray-600 mb-6">
            Your order has been received. The book will be shipped to the address you provided.
          </p>
        )}

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

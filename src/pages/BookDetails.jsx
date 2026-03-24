import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { books } from "../data/books";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { FaAmazon } from "react-icons/fa";
import { getEbookPricing } from "../utils/pricing";
import DiscountCountdown from "../components/DiscountCountdown";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const book = books.find((b) => b.id === id);

  if (!book) return <p className="text-center py-20 font-inter">Book not found</p>;

  const { hasEbook, finalPrice, originalPrice, discountPercent, isDiscounted } = getEbookPricing(book);

  const handleAddToCart = () => {
    addToCart(book);
    showToast("Book added to cart ✓");
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-bg via-blue-50 to-white relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-azure/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto py-16 px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left: Cover Image */}
          <div className="animate-fadeInLeft flex justify-center">
            <img
              src={book.cover}
              alt={book.title}
              className="animate-float w-full max-w-sm rounded-2xl shadow-card object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="animate-fadeInRight">
            <h1 className="text-4xl font-montserrat font-bold text-heading leading-tight">
              {book.title}
            </h1>
            <p className="mt-3 text-lg font-inter text-gray-500">
              by <span className="font-medium">{book.author}</span>
            </p>

            <div className="w-16 h-1 bg-azure mt-6 mb-6 rounded-full"></div>

            {/* Price */}
            {hasEbook && (
              <div className="mb-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-azure font-poppins font-bold text-3xl">
                    ₦{finalPrice.toLocaleString()}
                  </span>
                  {isDiscounted && (
                    <>
                      <span className="line-through text-gray-400 font-inter text-lg">
                        ₦{originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-accent text-white text-sm px-3 py-1 rounded-full font-bold">
                        -{discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                {isDiscounted && <DiscountCountdown />}
              </div>
            )}

            {/* Description */}
            <p className="font-inter text-gray-700 leading-relaxed whitespace-pre-line mb-8">
              {book.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {hasEbook && (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-azure to-primary text-white py-3 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(`/checkout/${book.id}?type=ebook`)}
                    className="flex-1 border border-azure text-azure py-3 rounded-xl font-poppins font-semibold hover:bg-azure hover:text-white transition-all duration-300"
                  >
                    Buy Now
                  </button>
                </>
              )}
              {book.amazonLink && (
                <a
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 rounded-xl font-poppins font-semibold hover:bg-yellow-500 transition-colors"
                >
                  <FaAmazon size={18} />
                  Buy Hardcopy on Amazon
                </a>
              )}
              {book.hardcopyAvailable && !book.amazonLink && (
                <button
                  disabled
                  className="flex-1 bg-gray-200 text-gray-400 py-3 rounded-xl font-poppins font-semibold cursor-not-allowed"
                >
                  Hard Copy (Coming Soon)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

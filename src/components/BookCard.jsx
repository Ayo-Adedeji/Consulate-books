import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { getEbookPricing } from "../utils/pricing";

export default function BookCard({ book }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { hasEbook, finalPrice, originalPrice, discountPercent, isDiscounted } = getEbookPricing(book);

  const handleAddToCart = () => {
    addToCart(book);
    showToast("Book added to cart ✓");
  };

  return (
    <div className="bg-card shadow-card border border-gray-100 rounded-2xl overflow-hidden flex flex-col animate-fadeInUp hover:-translate-y-1 hover:shadow-soft transition-all duration-300">
      {/* Cover */}
      <div className="overflow-hidden h-56 relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {isDiscounted && discountPercent && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-bold">
            -{discountPercent}%
          </span>
        )}
        {book.amazonLink && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
            Amazon
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-montserrat font-bold text-heading text-base leading-snug line-clamp-2">
          {book.title}
        </h3>
        <p className="font-inter text-sm text-gray-500 line-clamp-2 flex-1">
          {book.shortDescription}
        </p>

        {/* Price */}
        {hasEbook && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-azure font-bold text-lg">
              ₦{finalPrice.toLocaleString()}
            </span>
            {isDiscounted && (
              <span className="line-through text-gray-400 text-sm">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        )}
        {!hasEbook && book.amazonLink && (
          <p className="text-sm text-gray-400 italic">
            Available in hard copy on Amazon
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap mt-auto">
          {hasEbook && (
            <>
              <a
                href={`/book/${book.id}`}
                className="flex-1 text-center border border-azure text-azure rounded-xl px-4 py-2 font-inter text-sm hover:bg-azure hover:text-white transition-all duration-300"
              >
                View Book
              </a>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-azure to-primary text-white rounded-xl px-4 py-2 font-inter text-sm hover:scale-105 hover:shadow-soft transition-all duration-300"
              >
                Add to Cart
              </button>
            </>
          )}
          {!hasEbook && book.amazonLink && (
            <a
              href={book.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-yellow-400 text-black rounded-xl px-4 py-2 font-inter text-sm font-semibold hover:bg-yellow-500 transition-colors"
            >
              Buy on Amazon
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

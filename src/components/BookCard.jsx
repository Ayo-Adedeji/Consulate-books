export default function BookCard({ book }) {
  // Determine which format to show price for (prefer ebook if available)
  const format = book.prices.ebook ? "ebook" : "hardcopy";
  const originalPrice = book.prices[format].original;
  const discountedPrice = book.prices[format].discounted;
  const discountPercent = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return (
    <div className="mt-20 border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl transition-shadow duration-300 bg-white">
      
      {/* Book Cover */}
      <img
        src={book.cover}
        alt={book.title}
        className="w-32 h-48 object-cover rounded-xl flex-shrink-0"
      />

      {/* Book info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-2xl mb-2 text-gray-900">
            {book.title}
          </h3>

          <p className="text-gray-600 text-base mb-4 leading-relaxed">
            {book.shortDescription}
          </p>

          {/* Price Display */}
          <div className="flex items-center gap-3">
            <span className="text-red-600 line-through">
              ₦{originalPrice} ({discountPercent}% off)
            </span>
            <span className="font-semibold text-lg text-gray-800">
              ₦{discountedPrice}
            </span>
          </div>
        </div>

          <a
          href={`/book/${book.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/book/${book.id}`);
          }}
          className="self-start mt-6 rounded-lg bg-primary text-white px-6 py-3 font-medium text-sm hover:bg-primaryHover transition-colors"
        >
          View Book
        </a>
      </div>
    </div>
  );
}

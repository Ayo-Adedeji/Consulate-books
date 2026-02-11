export default function BookCard({ book }) {
  const hasEbook = Boolean(book.prices?.ebook);

  const originalPrice = hasEbook
    ? book.prices.ebook.original
    : null;

  const discountedPrice = hasEbook
    ? book.prices.ebook.discounted
    : null;

  const discountPercent =
    hasEbook && originalPrice
      ? Math.round(
          ((originalPrice - discountedPrice) / originalPrice) * 100
        )
      : null;

  return (
    <div className="mt-20 border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl transition-shadow duration-300 bg-white relative">
      
      {/* AMAZON BADGE */}
      {book.amazonLink && (
        <span className="absolute top-4 right-4 text-xs bg-yellow-400 text-black px-3 py-1 rounded-full font-medium">
          Amazon
        </span>
      )}

      {/* Book Cover */}
      <img
        src={book.cover}
        alt={book.title}
        className="w-32 h-48 object-cover rounded-xl flex-shrink-0"
      />

      {/* Book Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-2xl mb-2 text-gray-900">
            {book.title}
          </h3>

          <p className="text-gray-600 text-base mb-4 leading-relaxed">
            {book.shortDescription}
          </p>

          {/* EBOOK PRICE ONLY */}
          {hasEbook && (
            <div className="flex items-center gap-3">
              <span className="text-red-600 line-through text-sm">
                ₦{originalPrice} ({discountPercent}% off)
              </span>
              <span className="font-semibold text-lg text-gray-800">
                ₦{discountedPrice}
              </span>
            </div>
          )}

          {/* If NO ebook but Amazon exists */}
          {!hasEbook && book.amazonLink && (
            <p className="text-sm text-gray-500 italic">
              Available in hard copy on Amazon
            </p>
          )}
        </div>

        {/* ACTION BUTTON LOGIC */}
        {hasEbook ? (
          /* Ebook exists → Go to details page */
          <a
            href={`/book/${book.id}`}
            className="self-start mt-6 rounded-lg bg-primary text-white px-6 py-3 font-medium text-sm hover:bg-primaryHover transition-colors"
          >
            View Book
          </a>
        ) : book.amazonLink ? (
          /* No ebook but Amazon exists → Go to Amazon */
          <a
            href={book.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start mt-6 inline-flex items-center gap-2 rounded-lg bg-yellow-400 text-black px-6 py-3 font-medium text-sm hover:bg-yellow-500 transition-colors"
          >
            Buy on Amazon
          </a>
        ) : null}
      </div>
    </div>
  );
}

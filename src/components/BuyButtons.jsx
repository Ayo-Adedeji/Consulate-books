import { ShoppingCart, BookOpen, ExternalLink } from "lucide-react";

export default function BuyButtons({ book }) {
  const hasEbook = Boolean(book.prices?.ebook);
  const hasHardcopy = Boolean(book.prices?.hardcopy);
  const hardcopyAvailable = book.hardcopyAvailable !== false;
  const isAmazonHardcopy = Boolean(book.amazonLink);

  return (
    <div className="mt-8">
      {/* EBOOK BUTTON */}
      {hasEbook ? (
        <a
          href={`/checkout/${book.id}?type=ebook`}
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg mb-4 transition"
        >
          <BookOpen size={18} />
          Buy E-Book
        </a>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-600 px-6 py-3 rounded-lg mb-4 cursor-not-allowed"
        >
          E-book not available
        </button>
      )}

      {/* HARDCOPY BUTTON */}
      {hasHardcopy ? (
        hardcopyAvailable && !isAmazonHardcopy ? (
          <a
            href={`/checkout/${book.id}?type=hardcopy`}
            className="flex items-center justify-center gap-2 w-full border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg transition"
          >
            <ShoppingCart size={18} />
            Buy Hard Copy
          </a>
        ) : (
          <a
            href={book.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black px-6 py-3 rounded-lg transition"
          >
            <ExternalLink size={18} />
            Buy on Amazon
            <span className="ml-2 text-xs bg-black text-yellow-400 px-2 py-1 rounded-full">
              Amazon
            </span>
          </a>
        )
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-600 px-6 py-3 rounded-lg cursor-not-allowed"
        >
          Hard copy not available
        </button>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function BookCard({ book }) {
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

          <p className="font-semibold text-lg text-gray-800">
            ₦{book.price}
          </p>
        </div>

        <Link
          to={`/book/${book.id}`}
          className="self-start mt-6 rounded-lg bg-primary text-white px-6 py-3 font-medium text-sm hover:bg-primaryHover transition-colors"
        >
          View Book
        </Link>
      </div>
    </div>
  );
}

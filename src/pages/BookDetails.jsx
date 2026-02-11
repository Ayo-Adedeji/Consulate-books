import { useParams } from "react-router-dom";
import { books } from "../data/books";
import BuyButtons from "../components/BuyButtons";

export default function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);

  if (!book)
    return <p className="text-center py-20">Book not found</p>;

  return (
    <div className="mt-24 max-w-5xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            by <span className="font-medium">{book.author}</span>
          </p>

          <div className="w-16 h-1 bg-black mt-6 mb-8"></div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {book.description}
          </p>

          {/* BUY BUTTONS */}
          <BuyButtons book={book} />
        </div>
      </div>
    </div>
  );
}

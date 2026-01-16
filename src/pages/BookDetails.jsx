import { useParams, Link } from "react-router-dom";
import { books } from "../data/books";

export default function BookDetails() {
  const { id } = useParams();
  const book = books.find(b => b.id === id);

  if (!book) return <p className="text-center py-20">Book not found</p>;

  return (
    <div className="mt-24 max-w-5xl mx-auto py-16 px-6">
      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Book Cover */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover"
        />

        {/* Book Content */}
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            by <span className="font-medium">{book.author}</span>
          </p>

          {/* Divider */}
          <div className="w-16 h-1 bg-black mt-6 mb-8"></div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {book.description}
          </p>

          {/* CTA */}
          <Link
  to={`/checkout/${book.id}`}
  state={{ purchaseType: "ebook" }}
  className="block w-full text-center bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg mb-4"
>
  Buy E-Book
</Link>

<Link
  to={`/checkout/${book.id}`}
  state={{ purchaseType: "hardcopy" }}
  className="block w-full text-center border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg"
>
  Buy Hard Copy
</Link>

        </div>
      </div>
    </div>
  );
}

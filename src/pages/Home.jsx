import { books } from "../data/books";
import BookCard from "../components/BookCard";

export default function Home() {
  return (
    <div>

      {/* SECTION 1 – CONSULATE BOOKS (PUBLISHER INTRO) */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mt-20 mb-10">
            Consulate Books
          </h1>
          <p className="mt-10 text-gray-600 text-xl font-semibold leading-relaxed">
            Consulate Books is dedicated to telling honest, human stories
            that explore healing, recovery, identity, and transformation.
            These books are written to comfort, challenge, and restore hope
            to readers navigating real-life struggles.
          </p>
        </div>
      </section>

      {/* SECTION 2 – ABOUT THE AUTHOR */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex gap-6 items-start">
          
          {/* Author Image */}
          <img
            src="src/assets/author.jpg"
            alt="Author"
            className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          />

          {/* Author Bio */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">Consulate Books</h2>
            <h3 className="text-2xl font-semibold mb-4">
              Public Health Pharmacist(NIG). Business manager and An Author.
            </h3>
            <p className="text-gray-600 text-2xl whitespace-pre-line">
              Olafusi Omotiba is a public health pharmacist and mental health
              advocate dedicated to supporting individuals facing addiction
              and emotional challenges.

              With experience in pharmaceutical care, project management,
              business analysis, drug abuse prevention, community outreach,
              and counselling, he is a seasoned independent author with over
              20 years of experience.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 – BOOKS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Books
          </h2>

          <div className="gap-10">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

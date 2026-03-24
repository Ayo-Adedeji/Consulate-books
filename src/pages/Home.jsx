import { books } from "../data/books";
import BookCard from "../components/BookCard";
import author from "../assets/author.jpg";
import ftpCover from "../assets/ftp.jpg";
import tpgCover from "../assets/tpg.jpg";
import powerCover from "../assets/Power.jpeg";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function FeaturedAddToCart({ book }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  return (
    <>
      <button
        onClick={() => { addToCart(book); showToast("Book added to cart ✓"); }}
        className="flex-1 bg-gradient-to-r from-azure to-primary text-white rounded-xl px-3 py-2 font-inter text-xs font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300"
      >
        Add to Cart
      </button>
      <a
        href={`/book/${book.id}`}
        onClick={e => e.stopPropagation()}
        className="flex-1 text-center border border-azure text-azure rounded-xl px-3 py-2 font-inter text-xs font-semibold hover:bg-azure hover:text-white transition-all duration-300"
      >
        View Book
      </a>
    </>
  );
}

export default function Home() {
  return (
    <div className="pt-16">

      {/* HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center px-6 py-16 bg-gradient-to-br from-bg via-blue-50 to-azure/10 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-azure/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-azure/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text */}
          <div className="text-center md:text-left">
            <span className="inline-block bg-azure/10 text-azure text-xs font-semibold font-inter px-3 py-1 rounded-full mb-5 animate-fadeInUp">
              📚 Premium Digital Books
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold text-heading leading-tight mb-6 animate-fadeInLeft">
              Transform Your Knowledge with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure to-primary">
                Powerful Books
              </span>
            </h1>
            <p className="text-gray-600 text-lg font-inter leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 animate-fadeInUp">
              Explore expertly written books designed to educate, inspire, and empower your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fadeInUp">
              <a
                href="#books"
                className="bg-gradient-to-r from-azure to-primary text-white px-7 py-3.5 rounded-xl font-poppins font-semibold hover:scale-105 hover:shadow-soft transition-all duration-300 text-center"
              >
                Browse Books
              </a>
              <a
                href={`/book/finding-true-pathway`}
                className="border border-azure text-azure px-7 py-3.5 rounded-xl font-poppins font-semibold hover:bg-azure hover:text-white transition-all duration-300 text-center"
              >
                View Featured
              </a>
            </div>
          </div>

          {/* RIGHT: Floating book covers */}
          <div className="relative flex justify-center items-center h-80 md:h-96 animate-fadeInRight">
            {/* Back book */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 translate-x-10 -translate-y-6 opacity-60">
              <img
                src={tpgCover}
                alt="Featured book"
                className="w-36 md:w-44 rounded-xl shadow-soft object-cover"
              />
            </div>
            {/* Middle book */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-6 -translate-x-10 translate-y-4 opacity-80">
              <img
                src={powerCover}
                alt="Featured book"
                className="w-36 md:w-44 rounded-xl shadow-soft object-cover"
              />
            </div>
            {/* Front book — floating */}
            <div className="relative z-10 animate-float">
              <img
                src={ftpCover}
                alt="Finding True Pathway"
                className="w-44 md:w-56 rounded-2xl shadow-[0_20px_60px_rgba(0,127,255,0.25)] object-cover ring-4 ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-y border-gray-100 py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm font-inter text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-accent text-lg">⭐</span>
            <span><strong className="text-heading">Top Rated</strong> Books</span>
          </div>
          <div className="w-px h-5 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-azure text-lg">⚡</span>
            <span><strong className="text-heading">Instant</strong> Digital Access</span>
          </div>
          <div className="w-px h-5 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-lg">🔒</span>
            <span><strong className="text-heading">Secure</strong> Checkout</span>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS SECTION */}
      <section className="py-14 px-6 bg-gradient-to-br from-blue-50/70 via-white to-bg">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl font-montserrat font-bold text-heading leading-tight">
                Best Sellers
              </h2>
              <p className="text-gray-500 font-inter text-sm mt-1">
                Handpicked books to help you grow and succeed
              </p>
            </div>
            <a
              href="#books"
              className="text-azure font-inter text-sm font-semibold hover:underline hidden sm:block flex-shrink-0 ml-4"
            >
              View All →
            </a>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {books
              .filter(b => b.prices?.ebook)
              .slice(0, 3)
              .map((book, i) => {
                const discounted = book.prices.ebook.discounted;
                const original = book.prices.ebook.original;
                const pct = Math.round(((original - discounted) / original) * 100);
                return (
                  <a
                    key={book.id}
                    href={`/book/${book.id}`}
                    className={`group snap-start flex-shrink-0 w-64 md:w-auto bg-card border border-gray-100 rounded-2xl overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-soft transition-all duration-300 animate-fadeInUp flex flex-col`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {/* Cover */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                        Best Seller
                      </span>
                      {pct > 0 && (
                        <span className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{pct}%
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 gap-2">
                      <h3 className="font-montserrat font-bold text-heading text-sm leading-snug line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="font-inter text-xs text-gray-500 line-clamp-2 flex-1">
                        {book.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-azure font-bold text-base">
                          ₦{discounted.toLocaleString()}
                        </span>
                        <span className="line-through text-gray-400 text-xs">
                          ₦{original.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2" onClick={e => e.preventDefault()}>
                        <FeaturedAddToCart book={book} />
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>

          {/* Mobile "View All" */}
          <div className="mt-5 text-center sm:hidden">
            <a href="#books" className="text-azure font-inter text-sm font-semibold hover:underline">
              View All Books →
            </a>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-primary via-[#1a3a6a] to-[#1A2A6C]">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-azure/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10 animate-fadeInUp">
            <span className="inline-block bg-white/10 text-white/80 text-xs font-inter font-semibold px-3 py-1 rounded-full mb-3">
              ⭐ Reader Reviews
            </span>
            <h2 className="text-3xl font-montserrat font-bold text-white">What Our Readers Say</h2>
            <p className="text-white/60 font-inter text-sm mt-2">
              Real feedback from people who have benefited from these books
            </p>
          </div>

          {/* Horizontal scroll — always scroll, no grid switch */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { name: "Adaeze O.", role: "Mental Health Advocate", text: "Pathways to Overcome Anxiety changed how I approach my daily struggles. It's practical, compassionate, and deeply insightful. I recommend it to everyone I know.", stars: 5 },
              { name: "Emeka T.", role: "Entrepreneur", text: "The Power of Modern Entrepreneurship gave me the clarity I needed to start my business. The principles are grounded and actionable — not just motivational fluff.", stars: 5 },
              { name: "Blessing A.", role: "Care Worker", text: "The Practical Guide for Care Workers is the most detailed and useful resource I've come across in my field. It covers everything you actually face on the job.", stars: 5 },
              { name: "Tunde M.", role: "Student", text: "Finding True Pathway resonated with me on a personal level. It's honest, raw, and full of hope. I finished it in one sitting and felt genuinely moved.", stars: 5 },
              { name: "Chisom N.", role: "Pharmacist", text: "Pharmacy Politics in Nigeria is a must-read for every pharmacist. It exposes what nobody talks about openly and gives you a roadmap to make real impact.", stars: 5 },
              { name: "Fatima K.", role: "Reader", text: "I bought three books at once and every single one delivered. The instant download was seamless and the content exceeded my expectations. Highly recommended.", stars: 5 },
            ].map((t, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 w-[80vw] sm:w-[340px] lg:w-[320px] bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1 hover:bg-white/15 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <span key={s} className="text-accent text-base">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-inter text-sm text-white/85 leading-relaxed flex-1">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-2 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-azure to-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-white text-sm">{t.name}</p>
                    {t.role && <p className="font-inter text-xs text-white/50">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className={`rounded-full transition-all ${i === 0 ? "w-5 h-1.5 bg-azure" : "w-1.5 h-1.5 bg-white/30"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE AUTHOR */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex gap-6 items-start animate-fadeInUp">
          <img
            src={author}
            alt="Author"
            className="w-24 h-24 rounded-full object-cover flex-shrink-0 ring-4 ring-azure/20 shadow-soft"
          />
          <div>
            <h2 className="text-3xl font-montserrat font-semibold text-heading mb-3">Consulate Books</h2>
            <h3 className="text-xl font-poppins font-semibold text-primary mb-4">
              Public Health Pharmacist (NIG). Business Manager and Author.
            </h3>
            <p className="text-gray-600 text-lg font-inter leading-relaxed whitespace-pre-line">
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
      <section id="books" className="relative py-12 px-6 bg-gradient-to-br from-blue-50/60 to-bg overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-azure/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-3xl font-montserrat font-bold text-heading mb-10 text-center">
            Our Books
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

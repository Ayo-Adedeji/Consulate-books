export default function Footer() {
  return (
    <footer className="bg-footerBg text-white py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="text-footerText">
          <h3 className="font-bold mb-2">Books</h3>
          <p>Finding True Pathway</p>
          <p>Sample Book Two</p>
          <p>Sample Book Three</p>
        </div>
        <div>
          <p className="text-footerText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </footer>
  );
}

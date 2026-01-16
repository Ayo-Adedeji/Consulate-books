
import consulate from "../assets/consulate.png"; // Replace with your actual image path

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-4 flex items-center gap-3 fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3">
        <img
          src={consulate}
          alt="Consulate Books Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-xl font-bold">Consulate Books</span>
      </a>
    </nav>
  );
}

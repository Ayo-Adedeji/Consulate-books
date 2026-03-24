import { Link } from "react-router-dom";
import consulate from "../assets/consulate.png";

export default function Footer() {
  return (
    <footer className="bg-footerBg text-footerText mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1: Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={consulate} alt="Consulate Books" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20" />
            <span className="font-montserrat font-bold text-lg text-white">Consulate Books</span>
          </div>
          <p className="font-inter text-sm text-footerText/80 leading-relaxed">
            Honest, human stories that explore healing, recovery, identity, and transformation.
          </p>
          <p className="font-inter text-xs text-footerText/50 mt-4 italic">
            "Knowledge! The bedrock for Wisdom."
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-montserrat font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 font-inter text-sm">
            <li><Link to="/" className="text-footerText/80 hover:text-azure transition-colors">Home</Link></li>
            <li><a href="/#books" className="text-footerText/80 hover:text-azure transition-colors">Books</a></li>
            <li><a href="mailto:admin@consulaterecruitment.co.uk" className="text-footerText/80 hover:text-azure transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Col 3: Resources */}
        <div>
          <h4 className="font-montserrat font-semibold text-white mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 font-inter text-sm">
            <li><span className="text-footerText/50 cursor-default">Privacy Policy</span></li>
            <li><span className="text-footerText/50 cursor-default">Terms of Service</span></li>
            <li><span className="text-footerText/50 cursor-default">Refund Policy</span></li>
          </ul>
        </div>

        {/* Col 4: Contact & Socials */}
        <div>
          <h4 className="font-montserrat font-semibold text-white mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
          <ul className="space-y-2 font-inter text-sm">
            <li>
              <a href="mailto:admin@consulaterecruitment.co.uk" className="text-footerText/80 hover:text-azure transition-colors break-all">
                admin@consulaterecruitment.co.uk
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a
              href="https://www.amazon.com/author/consulatebooks"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-azure flex items-center justify-center transition-colors text-sm font-bold"
              aria-label="Amazon"
            >
              A
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-4">
        <p className="text-center font-inter text-xs text-footerText/50">
          © {new Date().getFullYear()} Consulate Books. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

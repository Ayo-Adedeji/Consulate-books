import { FaAmazon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BuyButtons = ({ book }) => {
  const navigate = useNavigate();
  const hasEbook = Boolean(book.prices?.ebook);
  const ebookPrice = book.prices?.ebook?.discounted;

  const handleEbookBuy = () => {
    navigate(`/checkout/${book.id}?type=ebook`);
  };

  const handleHardcopyBuy = () => {
    if (book.amazonLink) {
      window.open(book.amazonLink, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      {hasEbook && (
        <button
          onClick={handleEbookBuy}
          className="bg-primary text-white py-3 rounded-xl font-poppins font-semibold hover:bg-azure transition-colors"
        >
          Buy eBook – ₦{ebookPrice?.toLocaleString()}
        </button>
      )}
      {book.amazonLink && (
        <button
          onClick={handleHardcopyBuy}
          className="flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 rounded-xl hover:bg-yellow-500 transition font-semibold"
        >
          <FaAmazon size={18} />
          Buy Hardcopy on Amazon
        </button>
      )}
    </div>
  );
};

export default BuyButtons;

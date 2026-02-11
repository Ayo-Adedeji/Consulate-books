import { FaAmazon } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const BuyButtons = ({ book }) => {
  const navigate = useNavigate()

  const handleEbookBuy = () => {
    navigate(`/checkout/${book.id}?type=ebook`)
  }

  const handleHardcopyBuy = () => {
    if (book.amazonLink) {
      window.open(book.amazonLink, "_blank")
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Ebook Button */}
      <button
        onClick={handleEbookBuy}
        className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Buy eBook – ₦{book.ebookPrice}
      </button>

      {/* Hardcopy via Amazon */}
      {book.amazonLink && (
        <button
          onClick={handleHardcopyBuy}
          className="flex items-center justify-center gap-2 bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
        >
          <FaAmazon size={18} />
          Buy Hardcopy on Amazon
        </button>
      )}
    </div>
  )
}

export default BuyButtons

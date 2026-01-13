import { useState } from "react"
import { X, Star } from "lucide-react"
import { toast } from "react-hot-toast"
import { addReview } from "../../services/reviewService"
import { useUser } from "../../context/UserContext"

const ReviewModal = ({ movie, onClose }) => {
  const { user } = useUser()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const submitReview = async () => {
    if (!rating || !text.trim()) {
      toast.error("Please select rating & write review")
      return
    }

    try {
      setLoading(true)
      await addReview(movie.id, {
        username: user?.displayName || "Cinemood User",
        rating,
        text
      })

      toast.success("Review published 🎉")
      onClose()
    } catch (err) {
      toast.error("Failed to post review")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-zinc-900 w-[90%] max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Review – {movie.title}</h2>
          <button onClick={onClose}>
            <X size={20} className="text-neutral-400 hover:text-white" />
          </button>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-4">
          {[1,2,3,4,5].map((n) => (
            <Star
              key={n}
              size={34}
              className={`cursor-pointer transition ${
                (hover || rating) >= n
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-neutral-500"
              }`}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
            />
          ))}
        </div>

        <p className="text-center text-sm text-neutral-400 mb-3">
          {rating ? `You rated ${rating} stars` : "Tap to rate"}
        </p>

        {/* Review Box */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your honest thoughts..."
          className="w-full h-28 bg-black/40 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submitReview}
            className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Review"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal

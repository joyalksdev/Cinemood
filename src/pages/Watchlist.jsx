import { useWatchlist } from "../context/WatchlistContext"
import QuickViewModal from "../components/modals/QuickViewModal"
import { useState } from "react"
import FadeLoader from "react-spinners/FadeLoader"

const Watchlist = () => {
  const { watchlist, removeFromWatchlist, loading } = useWatchlist()
  const [selectedMovie, setSelectedMovie] = useState(null)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <FadeLoader
          color="#FFC509"
          radius={-5}
          speedMultiplier={1}
          width={4}
          loading
        />
      </div>
    )
  }

  return (
    <div className="px-8 py-6">
      <h2 className="text-3xl font-bold mb-6">⭐ Your Watchlist</h2>

      {watchlist.length === 0 && (
        <p className="text-neutral-400">No movies added yet.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {watchlist.map(movie => (
          <div key={movie.id} className="group relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              onClick={() => setSelectedMovie(movie)}
              className="rounded-lg cursor-pointer hover:scale-105 transition"
            />

            <button
              onClick={() => removeFromWatchlist(movie.id)}
              className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <QuickViewModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default Watchlist

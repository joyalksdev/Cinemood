import React, { useEffect, useState } from 'react'
import { fetchPersonalizedMovies } from '../../services/tmbdApi'
import { GoPlusCircle } from "react-icons/go"
import { useUser } from '../../context/UserContext'
import QuickViewModal from '../ui/QuickViewModal'

const RecommendationCard = () => {
  const { user } = useUser()
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    if (!user?.genres?.length) return

    fetchPersonalizedMovies(user.genres, user.language)
      .then(data => setMovies(data))
  }, [user])

  return (
    <>
      {selectedMovie && (
        <QuickViewModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <div className="flex gap-5 overflow-x-auto scrollbar-hide px-6 py-4">
        {movies.length === 0 && (
          <p className="text-neutral-400 px-4">
            Select genres during onboarding to get personalized recommendations.
          </p>
        )}

        {movies.map(movie => (
          <div
            key={movie.id}
            className="relative min-w-[240px] max-w-[240px] bg-zinc-900 border border-gray-500/40 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full h-[320px] object-cover"
              alt={movie.title}
            />

            <div className="p-4">
              <h3 className="text-white text-sm font-semibold truncate">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setSelectedMovie(movie)}
                  className="text-md px-7 py-1 rounded-2xl  cursor-pointer bg-[#FFC509] hover:bg-amber-300 font-medium text-black"
                >
                  View Details
                </button>

                <button className="text-3xl text-[#FFC509] cursor-pointer hover:scale-110 transition">
                  <GoPlusCircle />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default RecommendationCard

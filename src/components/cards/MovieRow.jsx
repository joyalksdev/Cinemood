import React, { useEffect, useRef, useState } from 'react'
import QuickViewModal from '../modals/QuickViewModal'
import { fetchTrendingMovies } from '../../services/tmbdApi'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GoPlusCircle } from "react-icons/go"
import { useWatchlist } from '../../context/WatchlistContext';
import WatchlistButton from "../ui/WatchlistButton"
import userPlaceholder from "../../assets/user-placeholder.png"
import moviePlaceholder from "../../assets/m-placeholder.png"



const MovieRow = ({title, fetchFn}) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const {addToWatchlist} = useWatchlist()
    

    useEffect(()=>{
        setLoading(true)
        fetchFn().then(data=>{
            setMovies(data)
            setLoading(false)
        })
    }, [fetchFn])

    const rowRef = useRef(null)

    const scroll = (direction) => {
    const width = rowRef.current.clientWidth
    rowRef.current.scrollBy({
        left: direction === "left" ? -width : width,
        behavior: "smooth"
    })
    }


  return (
    <section>
      {selectedMovie && (
        <QuickViewModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <div className="flex justify-between items-center">
        <h2 className="font-bold heading text-xl md:text-2xl">{title}</h2>

        <div className="hidden lg:flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="group flex items-center justify-center w-10 h-10 
            rounded-full bg-black/40 backdrop-blur-md hover:bg-[#FFC509] 
            transition-all duration-200"
          >
            <ChevronLeft className="text-white group-hover:text-black" size={26} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="group flex items-center justify-center w-10 h-10 
            rounded-full bg-black/40 backdrop-blur-md hover:bg-[#FFC509] 
            transition-all duration-200"
          >
            <ChevronRight className="text-white group-hover:text-black" size={26} />
          </button>
        </div>
      </div>

      <div ref={rowRef} className="flex gap-2 md:gap-6 overflow-x-auto scrollbar-hide px-1 md:px-6 py-4">
        
        {!loading && movies.length === 0 && (
        
        <p className="text-neutral-400 px-4">No movies found</p>
        )}


        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative min-w-[120px] md:min-w-[250px] max-w-[200px] md:max-w-[490px] bg-zinc-900 border border-gray-500/40 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : moviePlaceholder}
              className="w-full h-[180px] md:h-[320px] object-cover"
              alt={movie.title}
            />

            <div className="p-4 hidden md:block">
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

                <WatchlistButton movie={movie} variant="card" />

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MovieRow
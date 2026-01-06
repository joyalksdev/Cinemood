import React, { useEffect, useRef, useState } from 'react'
import QuickViewModal from '../ui/QuickViewModal'
import { fetchTrendingMovies } from '../../services/tmbdApi'
import { IoIosArrowDropleft,IoIosArrowDropright } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go"
import { useWatchlist } from '../../context/WatchlistContext';

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
        <h2 className="text-2xl font-bold">{title}</h2>

        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="hover:text-amber-300 focus:text-amber-300"
          >
            <IoIosArrowDropleft size={40} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hover:text-amber-300 focus:text-amber-300"
          >
            <IoIosArrowDropright size={40} />
          </button>
        </div>
      </div>

      <div ref={rowRef} className="flex gap-5 overflow-x-auto scrollbar-hide px-6 py-4">
        
        {!loading && movies.length === 0 && (
        
        <p className="text-neutral-400 px-4">No movies found</p>
        )}


        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative min-w-[220px] md:min-w-[220px] min-h-[300px]
             rounded-xl overflow-hidden bg-neutral-900/40
             border border-white/10 shadow-lg
             hover:scale-105 transition-all duration-300 cursor-pointer"
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

                <button onClick={()=> addToWatchlist(movie)} className="text-3xl text-[#FFC509] cursor-pointer hover:scale-110 transition">
                  <GoPlusCircle />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MovieRow
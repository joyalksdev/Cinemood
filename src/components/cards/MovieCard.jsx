import React from 'react'
import { fetchTrendingMovies } from "../../services/tmbdApi"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoPlusCircle } from "react-icons/go";


const MovieCard = () => {
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        fetchTrendingMovies().then(data => setMovies(data))
    },[])
  return (
    <div className="grid grid-cols-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {movies?.map(movie => (
        <Link>
            <div key={movie.id} className="bg-zinc-900 border border-gray-500/40 rounded-xl overflow-hidden hover:scale-105 transition">
            <img
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                loading='lazy'
                className="w-full h-50 object-cover"
            />

            <div className="p-5">
                <h3 className="text-white h-15 text-lg font-semibold">{movie.title}</h3>
                <p className="text-xs text-gray-400">⭐ {movie.vote_average.toFixed(1)}</p>

                <div className=' hidden justify-between pt-3'>
                    <div className='flex flex-col items-center gap-1'>
                        <span className='text-sm'>Add to Watchlist</span>
                        <button className='text-4xl cursor-pointer'><GoPlusCircle /></button>
                    </div>
                </div>

            </div>
            </div>
        </Link>
      ))}
    </div>
  )
}

export default MovieCard
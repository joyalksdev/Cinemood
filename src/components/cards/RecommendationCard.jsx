import React, { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '../../services/tmbdApi'
import { Link } from 'react-router-dom'
import { GoPlusCircle } from "react-icons/go";
import { Tooltip } from 'react-tooltip';


const RecommendationCard = () => {
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        fetchTrendingMovies().then(data => setMovies(data))
    },[])
  return (
    
    <div className="flex gap-5 overflow-x-auto scrollbar-hide px-6 py-4">
    {movies?.map(movie => (
        <div key={movie.id}
        className="relative min-w-[240px] max-w-[240px] bg-zinc-900 border border-gray-500/40 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
        <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className="w-full h-[320px] object-cover"
        />

        <div className="p-4">
            <h3 className="text-white text-sm font-semibold truncate">
            {movie.title}
            </h3>
            <p className="text-xs text-gray-400">⭐ {movie.vote_average.toFixed(1)}</p>

            <div className="flex justify-between  pt-2">
            <button className='text-md px-7 py-1 text-black rounded-2xl cursor-pointer hover:bg-amber-300 font-medium bg-[#FFC509]'>View Details</button>
            <button className="text-3xl text-[#FFC509] hover:scale-110 cursor-pointer transition"><GoPlusCircle /></button>
            </div>
        </div>
        </div>
    ))}
    </div>

    
  )
}

export default RecommendationCard
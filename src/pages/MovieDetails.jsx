import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails } from '../services/tmbdApi'
import { div } from 'motion/react-client'
const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(()=>{
    fetchMovieDetails(id).then(setMovie)
  },id)

  if(!movie) return <p className='p-6 text-amber-400/98 '>Loading...</p>

  return (
    <div className='px-8 py-6'>

      <div className='flex flex-col md:flex-row gap-8'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-72 rounded-xl shadow-xl"
        />
        <div>
          <h2 className='heading font-semibold text-3xl'>{movie.title}</h2>
          <p className="text-neutral-400 mt-2">
            {movie.release_date} • {movie.runtime} min
          </p>

            <p className="mt-4 text-lg leading-relaxed text-neutral-200">
            {movie.overview}
          </p>
          
        </div>
      </div>

    </div>
  )
}

export default MovieDetails
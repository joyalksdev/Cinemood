import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails, fetchSimilarMovies } from "../services/tmbdApi"
import QuickViewModal from '../components/ui/QuickViewModal'
import TrailerModal from '../components/ui/TrailerModal'
import { FadeLoader } from 'react-spinners'

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)

  useEffect(()=>{
    fetchMovieDetails(id).then(setMovie)
    fetchSimilarMovies(id).then(setSimilar)
  },[id])
  
  useEffect(() => {
  setSelectedMovie(null)
  setTrailerKey(null)
}, [id])

  if(!movie) return <div className='p-6 '>
<FadeLoader
      className='mx-auto mb-5'
  color="#FFC509"
  radius={-5}
  speedMultiplier={1}
  width={4}
  loading />
</div>

  const trailer = movie.videos?.results?.find(
  v => v.type === "Trailer" && v.site === "YouTube"
)


  return (
    <div className='px-8 py-6'>

      <div className='flex flex-col md:flex-row gap-8'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="w-72 rounded-xl shadow-xl"
        />
        <div>
          <h2 className='heading font-semibold text-3xl'>{movie.title}</h2>

          {trailer && (
            <button
              onClick={() => setTrailerKey(trailer.key)}
              className="mt-4 px-5 py-2 bg-[#FFC509] hover:bg-amber-300 rounded-lg text-black font-medium"
            >
              ▶ Watch Trailer
            </button>
          )}

          <p className="text-neutral-400 mt-2">
            {movie.release_date} • {movie.runtime} min
          </p>

            <p className="mt-4 text-lg leading-relaxed max-w-300 text-neutral-200">
            {movie.overview}
          </p>

          <div className='flex gap-3 mt-3'>
            {movie.genres.map(g=>(
              <span key={g.id} className='px-3 py-2 text-sm rounded-full border border-neutral-500'>
                {g.name}
              </span>
            ))

            }
            
          </div>

          <section className='mt-4 px-2'>
            <h2 className='py-3 text-xl font-bold'>Cast Crew</h2>
            <div className='grid grid-cols-4 md:flex gap-5 '>
              {
                movie.credits.cast.slice(0,10).map(actor=>(
                  <div key={actor.id} className='text-center max-w-[70px]'>
                    <img src={actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/avatar-placeholder.png"
                      }
                      className="rounded-full aspect-square object-cover"
                    />

                    <p className='text-sm mt-1'>{actor.name} </p>
                  </div>
                ))
              }
            </div>
          </section>
          
        </div>
      </div>

      <section className='mt-10'>
        <h2 className='text-2xl heading font-bold '>🎬 Similar Movies</h2>
        <div className='flex p-10 gap-5 overflow-x-auto overflow-auto scrollbar-hide'>
           {similar.map(movie => (

          <div key={movie.id}
              className="group relative min-w-[180px] md:min-w-[220px] rounded-xl overflow-hidden bg-neutral-900/40 border 
              border-white/10 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-full h-full object-cover"
                loading='lazy'
                alt={movie.title}
                 onClick={() => setSelectedMovie(movie)}
              />
              
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              
              <p className="absolute pointer-events-none bottom-3 left-3 right-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition">
                {movie.title}
              </p>
              
            </div>

          ))}
        </div>
        {selectedMovie && (
        <QuickViewModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      </section>

        {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}

    </div>

    
  )
}

export default MovieDetails
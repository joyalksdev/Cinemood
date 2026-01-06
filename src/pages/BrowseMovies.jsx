import React from 'react'
import { fetchTrendingMovies } from "../services/tmbdApi"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import QuickViewModal from '../components/ui/QuickViewModal'
import { FadeLoader } from 'react-spinners'
import { TfiReload } from "react-icons/tfi";
import CardSkelton from '../components/cards/CardSkelton';



const BrowseMovies = () => {
  const [movie, setMovie] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
 
  
  useEffect(()=>{
      setLoading(true)
    fetchTrendingMovies().then(data => {
      setMovie(data)
      setLoading(false)
    })
  },[])

  // if(loading) return <FadeLoader
  //   className='mx-auto mb-5'
  //   color="#FFC509"
  //   radius={-5}
  //   speedMultiplier={1}
  //   width={4}
  //   loading />
  
  
  
  return (
    <div className='px-6'>
     
      {selectedMovie && (
        <QuickViewModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}


      <h2 className='mb-10  text-3xl font-bold'>Browse Movies On <span className='text-[#FFC509] font-bold m-0'>Cine</span>mood</h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6'>

        {loading && (
          <div className="flex gap-5 px-6 py-4">
            {[...Array(6)].map((_, i) => (
              <CardSkelton key={i} />
            ))}
          </div>
        )}


        {!loading && movie.map(movie=>(
            <div key={movie.id} className="bg-zinc-900 border group relative border-gray-500/40 rounded-xl overflow-hidden hover:scale-105 transition">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
               alt={movie.title}
                loading='lazy'
                className="w-full cursor-pointer object-cover"
                 onClick={() => setSelectedMovie(movie)} />

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              
              <p className="absolute pointer-events-none bottom-3 left-3 right-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition">
                {movie.title}
              </p>
            </div>
          ))
        }

      </div>
      <div className='flex justify-center mt-5'>
        {!loading && movie.length > 0 && (
          <button className='flex gap-2 items-center px-3 py-2 rounded-lg cursor-pointer bg-transparent border border-neutral-600 hover:bg-neutral-800 transition ease-in'>
              <TfiReload /> Load More Movies
          </button>
        )}
      </div>
    </div>
  )
}

export default BrowseMovies
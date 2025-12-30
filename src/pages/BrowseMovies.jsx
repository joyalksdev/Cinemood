import React from 'react'
import MovieCard from '../components/cards/MovieCard'

const BrowseMovies = () => {
  return (
    <div className='px-6'>
      <h2 className='mb-10  text-3xl font-bold'>Browse Movies On <span className='text-[#FFC509] font-bold m-0'>Cine</span>mood</h2>
      <MovieCard />
    </div>
  )
}

export default BrowseMovies
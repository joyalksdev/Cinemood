import React from 'react'
import { useUser } from '../context/UserContext'
import RecommendationCard from '../components/cards/RecommendationCard'
import MovieRow from '../components/cards/MovieRow'
import { fetchTrendingMovies, fetchTopRatedMovies, fetchNowPlayingMovies, fetchPopularAnime,fetchPopularMovies, fetchPopularKDramas  } from '../services/tmbdApi'



const Home = () => {

  const {user} = useUser()

  return (
    <div className='px-5'>
      <div className='flex flex-col justify-center items-center py-5'>
        <h2 className='text-4xl heading font-medium text-center'>Welcome back,<span className='font-bold pl-2'> {user.name}</span>👋</h2>
        <p className='p-2 text-lg text-center'>Ready to find your next favorite movie?</p>
        <p className='text-amber-200 text-center'>Your mood. Your movies. Your CineMood.</p>
      </div> 
      
      <section className='flex flex-col gap-10'>

        <RecommendationCard />
        
        <MovieRow title="🔥 Trending Movies" fetchFn={fetchTrendingMovies} /> 

        <MovieRow title="🏆 Top 20 Movies" fetchFn={fetchTopRatedMovies} />

        <MovieRow title="🎬 Latest Movies" fetchFn={fetchNowPlayingMovies} />

        <MovieRow title="🍿 Popular Movies" fetchFn={fetchPopularMovies} />

        <MovieRow title="🇰🇷 Popular K-Dramas" fetchFn={fetchPopularKDramas} />

        <MovieRow title="🍥 Popular Anime" fetchFn={fetchPopularAnime} />

                
      </section>

    </div>
  )
}

export default Home
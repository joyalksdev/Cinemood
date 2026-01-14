import React from 'react'
import { useUser } from '../context/UserContext'
import RecommendationCard from '../components/cards/RecommendationCard'
import MovieRow from '../components/cards/MovieRow'
import { fetchTrendingMovies, fetchTopRatedMovies, fetchNowPlayingMovies, fetchPopularAnime,fetchPopularMovies, fetchPopularKDramas  } from '../services/tmbdApi'
import MoodMatcher from '../components/sections/MoodMatcher'


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
        
        <MovieRow rowId="trending" title="🔥 Trending Movies" fetchFn={fetchTrendingMovies} /> 
        
        <MoodMatcher />
        
        <MovieRow rowId="top_rated" title="🏆 Top 20 Movies" fetchFn={fetchTopRatedMovies} />

        <MovieRow rowId="now_playing" title="🎬 Now Playing Movies" fetchFn={fetchNowPlayingMovies}/>
        
        <MovieRow rowId="popular_movies" title="🍿 Popular Movies" fetchFn={fetchPopularMovies} />
        
        <MovieRow rowId="popular_kdrama" title="🇰🇷 Popular K-Dramas" fetchFn={fetchPopularKDramas} />
        
        <MovieRow rowId="popular_anime" title="🍥 Popular Anime" fetchFn={fetchPopularAnime} />

            
                                                                                       
        



                
      </section>

    </div>
  )
}

export default Home
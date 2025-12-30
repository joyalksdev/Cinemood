import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/tmbdApi"


export default function Hero() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => setMovies(data));
  }, []);

  const scrollingMovies = [...movies, ...movies]
// absolute inset-0 grid grid-cols-7 gap-3 scale-125 -rotate-12 animate-scroll
  return (
   <div className="relative h-screen rounded-2xl w-full overflow-hidden">
        <div className="absolute -top-50 left-0 w-[200%] grid grid-cols-14 scale-125 -rotate-12 gap-3 animate-scroll">
          {[...movies, ...movies].map((movie, i) => (
            <img
              key={movie.id + i}
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              className="w-full h-full object-cover rounded-lg"
              alt={movie.title} loading="lazy"
            />
          ))}
        </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-[90%] text-center px-6">
          <div className="max-w-180 flex flex-col mb-3 gap-3">
            <h2 className="heading text-6xl font-normal"><span className="font-semibold">Discover cinema</span> the way it was <span className="font-semibold">meant to be explored.</span></h2>
            <p className="text-lg">Explore trending titles, deep-dive into film details, build your watchlist and discover movies made just for your taste.</p>
          </div>

          <div className="flex gap-3">
            <Link to='/Browse'><button className="px-5 py-2 bg-[#FFC509] text-black font-medium rounded-lg hover:bg-amber-300 cursor-pointer hover:shadow-xl shadow-amber-300/10 transition-all">Start Exploring</button></Link>
            <button className="px-5 py-2 border border-[#FFC509] text-[#FFC509] font-medium rounded-lg backdrop-blur-sm cursor-pointer hover:shadow-xl shadow-amber-300/10 transition-all ease-linear">Browse Trending</button>
          </div>
        
      </div>
          
           <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 35s linear infinite;
          }
        `}
      </style>

    </div>
  )
}

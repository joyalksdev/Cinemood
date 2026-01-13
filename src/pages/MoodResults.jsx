import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { discoverByGenre, searchByMoodKeyword } from '../services/tmbdApi'
import { FadeLoader } from 'react-spinners'
import QuickViewModal from '../components/ui/QuickViewModal'
import moviePlaceholder from "../assets/m-placeholder.png"

const MoodResults = () => {

    const { state } = useLocation()
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

 useEffect(() => {
    const onScroll = () => {
        if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200 &&
        !loading
        ) {
        setPage(p => p + 1)
    }
  }
  window.addEventListener("scroll", onScroll)
  return () => window.removeEventListener("scroll", onScroll)
}, [loading])


  useEffect(() => {
    if (!state) return

    setLoading(true)

    if (state?.genres) {
      discoverByGenre(state.genres.join(","), page)
        .then(data => setMovies(prev => [...prev, ...data]))
        .finally(() => setLoading(false))
    }
    else if (state?.mood) {
      searchByMoodKeyword(state.mood, page)
        .then(data => setMovies(prev => [...prev, ...data]))
        .finally(() => setLoading(false))
    }
  }, [state, page])

  return (
    <div className="pt-24 px-6 text-white">

          {selectedMovie && (
        <QuickViewModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}


      <h1 className="text-3xl font-bold mb-6">
        Movies for your mood: {state?.mood}
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
        {movies.map(movie => (
          <div key={movie.id} className="hover:scale-105 transition" onClick={()=> setSelectedMovie(movie)}>
            <img
               src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : moviePlaceholder}
              className="rounded-xl w-full"
            />
            <p className="mt-2 text-sm font-medium">{movie.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        {loading ? (
            <FadeLoader
            className="mx-auto mb-5"
            color="#FFC509"
            radius={-5}
            speedMultiplier={1}
            width={4}
            loading
            />
        ) : (
            <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300"
            >
            Scroll! or Click to Load More 🎬
            </button>
        )}
        </div>

    </div>
  )
}

export default MoodResults

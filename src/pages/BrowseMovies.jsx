import React, { useEffect, useRef, useState } from 'react'
import { fetchBrowseMovies } from "../services/tmbdApi"
import QuickViewModal from '../components/modals/QuickViewModal'
import { FadeLoader } from 'react-spinners'
import CardSkelton from '../components/cards/CardSkelton'
import FilterBar from '../components/search/FilterBar'
import moviePlaceholder from "../assets/m-placeholder.png"

const BrowseMovies = () => {

  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef(null)

  const [filters, setFilters] = useState({
    genre: "",
    language: "",
    sort: "rating"
  })

  // Fetch Movies
  useEffect(() => {
    setLoading(true)

    fetchBrowseMovies({ ...filters, page }).then(data => {
      setMovies(prev => page === 1 ? data : [...prev, ...data])
      setHasMore(data.length > 0)
      setLoading(false)
    })
  }, [filters, page])

  // Reset when filter changes
  useEffect(() => {
    setMovies([])
    setPage(1)
    setHasMore(true)
  }, [filters])

  // Infinite Scroll 
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setPage(p => p + 1)
      }
    }, { threshold: 1 })

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loading, hasMore])


  return (
    <div className="md:px-6">

      {selectedMovie && (
        <QuickViewModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="mb-5 px-6 text-3xl font-bold">Browse Movies</h2>
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
        {movies.map(movie => (
          <div key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="bg-zinc-900 group relative rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition cursor-pointer">

            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : moviePlaceholder}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
              opacity-0 group-hover:opacity-100 transition" />

            <p className="absolute bottom-3 left-3 text-sm text-white opacity-0 group-hover:opacity-100 transition">
              {movie.title}
            </p>
          </div>
        ))}

        {loading && [...Array(6)].map((_, i) => <CardSkelton key={i} />)}
      </div>


      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-10">
          <FadeLoader color="#FFC509" />
        </div>
      )}
    </div>
  )
}

export default BrowseMovies
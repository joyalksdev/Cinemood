import { useState, useEffect } from "react"
import { searchMovies } from "../../services/tmbdApi"
import { Link } from "react-router-dom"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const delay = setTimeout(() => {
      searchMovies(query).then(data => setResults(data.slice(0, 6)))
    }, 500)

    return () => clearTimeout(delay)
  }, [query])

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 outline-none focus:border-amber-400"
      />

      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl z-50">
          {results.map(movie => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-800"
              onClick={() => setQuery("")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                className="w-10 rounded"
              />
              <div>
                <p className="text-sm font-medium">{movie.title}</p>
                <p className="text-xs text-neutral-400">
                  {movie.release_date?.slice(0,4)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

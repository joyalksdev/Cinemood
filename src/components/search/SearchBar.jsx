import { useState, useEffect, useRef } from "react"
import { searchMovies, searchPeople } from "../../services/tmbdApi"
import { HiOutlineSearch } from "react-icons/hi"
import { Link } from "react-router-dom"
import userPlaceholder from "../../assets/user-placeholder.png"
import moviePlaceholder from "../../assets/m-placeholder.png"

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("")
  const [movieResults, setMovieResults] = useState([])
  const [peopleResults, setPeopleResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const boxRef = useRef(null)

  // Fetch Movies + People
  useEffect(() => {
    if (!query.trim()) {
      setMovieResults([])
      setPeopleResults([])
      return
    }

    const delay = setTimeout(() => {
      searchMovies(query).then(d => setMovieResults(d.slice(0, 4)))
      searchPeople(query).then(d => setPeopleResults(d.slice(0, 4)))
    }, 400)

    return () => clearTimeout(delay)
  }, [query])

  // Close only dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Close everything on ESC
  useEffect(() => {
    const esc = e => {
      if (e.key === "Escape") {
        setShowResults(false)
        onClose()
      }
    }
    document.addEventListener("keydown", esc)
    return () => document.removeEventListener("keydown", esc)
  }, [onClose])

  return (
    <div className={`
      fixed lg:static inset-0 z-50 flex
      ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"}
      bg-black/90 lg:bg-transparent
      items-start lg:items-center justify-center
      pt-24 lg:pt-0 transition-all duration-300
    `}>

      <button
        onClick={() => {
          setShowResults(false)
          onClose()
        }}
        className="absolute top-6 right-6 text-2xl text-white lg:hidden"
      >
        ✕
      </button>

      <div ref={boxRef} className="relative w-[90%] lg:w-full max-w-md">
        <HiOutlineSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          autoFocus
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          placeholder="Search movies or actors..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 outline-none focus:border-amber-400"
        />

        {showResults && (movieResults.length > 0 || peopleResults.length > 0) && (
          <div className="absolute mt-2 w-full bg-neutral-900/95 border border-neutral-700 rounded-lg shadow-xl z-50">

            {movieResults.map(movie => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                onClick={() => {
                  setQuery("")
                  setShowResults(false)
                  onClose()
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-800"
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : moviePlaceholder}
                  className="w-10 rounded"
                />
                <div>
                  <p className="text-sm font-medium">{movie.title}</p>
                  <p className="text-xs text-neutral-400">{movie.release_date?.slice(0,4)}</p>
                </div>
              </Link>
            ))}

            {peopleResults.map(person => (
              <Link
                to={`/person/${person.id}`}
                key={person.id}
                onClick={() => {
                  setQuery("")
                  setShowResults(false)
                  onClose()
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-800"
              >
                <img
                  src={person.profile_path ? `https://image.tmdb.org/t/p/w92${person.profile_path}` : userPlaceholder}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-neutral-400">{person.known_for_department}</p>
                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar

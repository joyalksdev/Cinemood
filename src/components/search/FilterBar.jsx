import { useEffect, useRef, useState } from "react"

const GENRES = [
  { id: "", name: "All Genres" },
  { id: "28", name: "Action" },
  { id: "35", name: "Comedy" },
  { id: "12", name: "Adventure" },
  { id: "878", name: "Sci-Fi" },
  { id: "18", name: "Drama" },
  { id: "10749", name: "Romance" },
]

const LANGUAGES = [
  { id: "", name: "All Languages" },
  { id: "en", name: "English" },
  { id: "ml", name: "Malayalam" },
  { id: "hi", name: "Hindi" },
  { id: "ta", name: "Tamil" },
  { id: "te", name: "Telugu" },
]

const SORTS = [
  { id: "rating", name: "Top Rated" },
  { id: "new", name: "Latest" },
  { id: "old", name: "Oldest" }
]


const FilterBar = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }))
    setOpen(null)
  }

  return (
    <div ref={dropdownRef} className="flex gap-6 px-6 relative">

      <div className="relative">
        <button
          onClick={() => setOpen(open === "sort" ? null : "sort")}
          className="bg-neutral-800 px-4 py-2 rounded-lg"
        >
          {SORTS.find(s => s.id === filters.sort)?.name || "Sort"}
        </button>

        {open === "sort" && (
          <div className="absolute mt-2 w-40 bg-zinc-900 border border-neutral-600 rounded-lg shadow-lg z-50">
            {SORTS.map(s => (
              <div
                key={s.id}
                onClick={() => updateFilter("sort", s.id)}
                className="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
              >
                {s.name}
              </div>
            ))}
          </div>
        )}
      </div>


    
      <div className="relative">
        <button
          onClick={() => setOpen(open === "genre" ? null : "genre")}
          className="bg-neutral-800 px-4 py-2 rounded-lg"
        >
          {GENRES.find(g => g.id === filters.genre)?.name || "Genres"}
        </button>

        {open === "genre" && (
          <div className="absolute mt-2 w-44 bg-zinc-900 border border-neutral-600 rounded-lg shadow-lg z-50">
            {GENRES.map(g => (
              <div
                key={g.id}
                onClick={() => updateFilter("genre", g.id)}
                className="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
              >
                {g.name}
              </div>
            ))}
          </div>
        )}
      </div>

    
      <div className="relative">
        <button
          onClick={() => setOpen(open === "lang" ? null : "lang")}
          className="bg-neutral-800 px-4 py-2 rounded-lg"
        >
          {LANGUAGES.find(l => l.id === filters.language)?.name || "Languages"}
        </button>

        {open === "lang" && (
          <div className="absolute mt-2 w-44 bg-zinc-900 border border-neutral-600 rounded-lg shadow-lg z-50">
            {LANGUAGES.map(l => (
              <div
                key={l.id}
                onClick={() => updateFilter("language", l.id)}
                className="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
              >
                {l.name}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default FilterBar

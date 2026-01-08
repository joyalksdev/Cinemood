import { createContext, useContext, useEffect, useState, useRef } from "react"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useUser } from "./UserContext"

const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const { user } = useUser()
  const [watchlist, setWatchlist] = useState([])
  const isLoaded = useRef(false)

  // 🔥 LOAD FROM FIRESTORE
  useEffect(() => {
    if (!user) return

    const loadWatchlist = async () => {
      const snap = await getDoc(doc(db, "watchlists", user.uid))

      if (snap.exists()) {
        setWatchlist(snap.data().movies || [])
      } else {
        await setDoc(doc(db, "watchlists", user.uid), { movies: [] })
        setWatchlist([])
      }

      isLoaded.current = true
    }

    loadWatchlist()
  }, [user])

  // 🔥 SAVE TO FIRESTORE ONLY AFTER LOAD
  useEffect(() => {
    if (!user || !isLoaded.current) return

    setDoc(doc(db, "watchlists", user.uid), { movies: watchlist })
  }, [watchlist, user])

  const addToWatchlist = (movie) => {
    setWatchlist(prev =>
      prev.find(m => m.id === movie.id) ? prev : [...prev, movie]
    )
  }

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== id))
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)

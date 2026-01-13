import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { getDocs, collection, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useUser } from "./UserContext"
import { deleteDoc } from "firebase/firestore"


const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const { user } = useUser()
  const [watchlist, setWatchlist] = useState([])
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => setAuthReady(true))
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!authReady || !user?.uid || !auth.currentUser) return
    migrateAndLoad()
  }, [authReady, user?.uid])

  const migrateAndLoad = async () => {
    const snap = await getDocs(
      collection(db, "watchlists", auth.currentUser.uid, "movies")
    )
    setWatchlist(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

const addToWatchlist = async (movie) => {
  if (!auth.currentUser) return

  const ref = doc(db, "watchlists", auth.currentUser.uid, "movies", movie.id.toString())

  await setDoc(ref, movie)

  setWatchlist(prev =>
    prev.some(m => m.id === movie.id) ? prev : [...prev, movie]
  )
}


  const removeFromWatchlist = async (id) => {
  if (!auth.currentUser) return

  await deleteDoc(
    doc(db, "watchlists", auth.currentUser.uid, "movies", id.toString())
  )

  setWatchlist(prev => prev.filter(movie => movie.id !== id))
}


  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)

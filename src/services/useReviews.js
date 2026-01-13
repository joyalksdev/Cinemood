import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const useReviews = (movieId) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!movieId) return

    const load = async () => {
      setLoading(true)

      const q = query(
        collection(db, "movieReviews", movieId.toString(), "reviews"),
        orderBy("createdAt", "desc")
      )

      const snap = await getDocs(q)
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }

    load()
  }, [movieId])

  return { reviews, loading }
}

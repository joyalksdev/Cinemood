import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { auth } from "../firebase/firebase"

export const addReview = async (movieId, data) => {
  return await addDoc(
    collection(db, "movieReviews", movieId.toString(), "reviews"),
    {
      ...data,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      source: "cinemood"
    }
  )
}

import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const saveUserProfile = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data, { merge: true })
}

export const getUserProfile = async (uid) => {
  try {
    const snap = await getDoc(doc(db, "users", uid))
    if (!snap.exists()) {
      console.log("Profile not found yet — first login flow")
      return null
    }
    return snap.data()
  } catch (err) {
    console.error("Error fetching user profile:", err)
    return null
  }
}


import { auth, googleProvider } from "../firebase/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth"
import { saveUserProfile, getUserProfile } from "./profileService"

export const registerUser = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password)

  // Create empty profile doc
  await saveUserProfile(res.user.uid, {
    email: res.user.email,
    onboarded: false,
    createdAt: new Date().toISOString()
  })

  return res.user
}
// Email & Password Login
export const loginUser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
  const profile = await getUserProfile(res.user.uid)

  return { user: res.user, profile }
}
// Google Login
export const googleLogin = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  const user = res.user

  const userProfile = {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    onboarded: false,
    createdAt: new Date().toISOString()
  }

  // Always save / update profile
  await saveUserProfile(user.uid, userProfile)

  return { user, profile: userProfile }
}


export const logoutUser = () => signOut(auth)

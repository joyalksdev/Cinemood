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

export const loginUser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
  const profile = await getUserProfile(res.user.uid)

  return { user: res.user, profile }
}

export const googleLogin = async () => {
  const res = await signInWithPopup(auth, googleProvider)

  let profile = await getUserProfile(res.user.uid)

  if (!profile) {
    await saveUserProfile(res.user.uid, {
      email: res.user.email,
      onboarded: false,
      createdAt: new Date().toISOString()
    })
    profile = { onboarded: false }
  }

  return { user: res.user, profile }
}


export const logoutUser = () => signOut(auth)

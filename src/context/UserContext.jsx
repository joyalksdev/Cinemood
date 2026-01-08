import { createContext, useContext, useEffect, useState } from "react"
import { getUserProfile } from "../services/profileService"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const loadUser = async () => {
    try {
      const saved = localStorage.getItem("cinemood_user")

      if (!saved) {
        setLoading(false)
        return
      }

      const authUser = JSON.parse(saved)

      let profile = null
      try {
        profile = await getUserProfile(authUser.uid)
        console.log("Fetching profile for UID:", uid)
      } catch (err) {
        console.warn("Profile fetch failed — continuing without profile")
      }

      setUser(profile ? { ...authUser, ...profile } : authUser)
    } catch (err) {
      console.error("User load failed:", err)
      localStorage.removeItem("cinemood_user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  loadUser()
}, [])




  const saveUser = (data) => {
    setUser(data)
    localStorage.setItem("cinemood_user", JSON.stringify(data))
  }

  const logout = () => {
    localStorage.removeItem("cinemood_user")
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, saveUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

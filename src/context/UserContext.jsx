import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("cinemood_user")
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
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

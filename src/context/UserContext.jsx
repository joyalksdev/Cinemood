import React from 'react'
import { useEffect, useState, useContext, createContext } from "react";

const UserContext = createContext()

 export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const storedUser = localStorage.getItem("cinemood_user_v1")
        if(storedUser)setUser(JSON.parse(storedUser))
        setLoading(false)
    },[])

    const saveUser = (data) =>{
        localStorage.setItem("cinemood_user_v1", JSON.stringify(data))
        setUser(data)
    }

    const logout = () =>{
        localStorage.removeItem("cinemood_user_v1")
        setUser(null)
    }

  return (
    <UserContext.Provider value={{user, saveUser, logout, loading}}>
        {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)                                                                                                                  
import React, { useContext, createContext, useEffect, useState } from 'react'

const WatchlistContext = createContext()

export const WatchlistProvider = ({children}) => {
    const [watchlist, setWatchlist] = useState(()=>{
        return JSON.parse(localStorage.getItem("watchlist")) || []
    })

    useEffect(()=>{
        localStorage.getItem("watchlist", JSON.stringify(watchlist))
    },[watchlist])

    const addToWatchlist = (movie) =>{
        if(!watchlist.find(m=> m.id === movie.id)){
            setWatchlist(prev=>[...prev, movie])
        }
    }

    const removeFromWatchlist = (id) =>{
        setWatchlist(prev => prev.filter(movie => moveBy.id !== id))
    }
    return(
        <WatchlistContext.Provider value={{watchlist, addToWatchlist, removeFromWatchlist,}}>
            {children}
        </WatchlistContext.Provider>
    )
}

export const useWatchlist = () => useContext(WatchlistContext)
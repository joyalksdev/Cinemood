import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import BrowseMovies from './pages/BrowseMovies'
import Watchlist from './pages/Watchlist'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="browse" element={<BrowseMovies />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
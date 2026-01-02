import { Routes, Route, Navigate } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import BrowseMovies from './pages/BrowseMovies'
import Watchlist from './pages/Watchlist'
import GetStarted from './pages/GetStarted'
import ProtectedRoute from './routes/ProtectedRoute'
import { useUser } from './context/UserContext'
import Landing from './pages/Landing'

const App = () => {
  const { user, loading } = useUser()
  if (loading) return null

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/landing" />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/landing" element={<Landing />} />

      <Route element={
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      }>
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<BrowseMovies />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Route>
    </Routes>
  )
}

export default App

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
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import OnboardingRoute from "./routes/OnboardingRoute"
import Login from './pages/Login'
import Register from './pages/Register'



const App = () => {
  const { user, loading } = useUser()
  if (loading) return null

  return (
   <Routes>

    <Route path="/" element={user ? <Navigate to="/home" /> : <Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/get-started" element={
       <OnboardingRoute>
        <GetStarted />
      </OnboardingRoute>
    } />

    <Route path="*" element={<NotFound />} />

    <Route element={
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    }>
      <Route path="/home" element={<Home />} />
      <Route path="/browse" element={<BrowseMovies />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Route>

  </Routes>

  )
}

export default App

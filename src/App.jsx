import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import BrowseMovies from "./pages/BrowseMovies";
import Watchlist from "./pages/Watchlist";
import GetStarted from "./pages/GetStarted";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useUser } from "./context/UserContext";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import OnboardingRoute from "./routes/OnboardingRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CastCrewDetails from "./pages/CastCrewDetails";
import PersonDetails from "./pages/PersonDetails";
import MovieReviews from "./pages/MovieReviews";
import MoodResults from "./pages/MoodResults";
import { Toaster } from "react-hot-toast";
import MovieRowPage from "./pages/MovieRowPage";

const App = () => {
  const { user, loading } = useUser();
  if (loading) return null;

  return (
    <>
     <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1b1b1b",
            color: "#fff",
            border: "1px solid #333"
          },
          success: {
            iconTheme: {
              primary: "#FFC509",
              secondary: "#000"
            }
          }
        }}/>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Landing />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/get-started"
          element={
            <OnboardingRoute>
              <GetStarted />
            </OnboardingRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/browse" element={<BrowseMovies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies/:type" element={<MovieRowPage />} />
          <Route path="/movie/:id/cast-crew" element={<CastCrewDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} />
          <Route path="/movie/:id/reviews" element={<MovieReviews />} />
          <Route path="/mood/:type" element={<MoodResults />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

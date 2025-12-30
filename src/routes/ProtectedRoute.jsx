import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return null;      // ← WAIT for localStorage
  if (!user) return <Navigate to="/onboarding" replace />;

  return children;
};

export default ProtectedRoute;

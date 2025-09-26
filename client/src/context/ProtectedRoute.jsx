import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user, role, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/loginpage" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

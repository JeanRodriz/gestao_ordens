import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Certifique-se de que o caminho está correto

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

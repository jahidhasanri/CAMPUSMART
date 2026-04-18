import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <span>Loading...</span>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;
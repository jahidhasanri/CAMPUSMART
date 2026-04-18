import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";




const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);


  if (user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }


  return children;
};


export default AdminRoute;

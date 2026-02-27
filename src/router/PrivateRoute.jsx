import React, { use, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <span>loading.....</span>;
  }

  if(user,user?.email){
    return children
  }

  return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRoute;

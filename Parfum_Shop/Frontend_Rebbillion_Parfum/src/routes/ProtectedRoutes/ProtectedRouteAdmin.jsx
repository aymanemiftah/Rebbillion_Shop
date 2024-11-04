import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ user, children }) => {
 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/*" />; 
  }

  return children; 
};

export default ProtectedRouteAdmin;
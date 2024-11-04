import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteManager = ({ user, children }) => {
  
  console.log('protected',user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== "manager") {
    return <Navigate to="*" replace />;
  }

  return children; 
};

export default ProtectedRouteManager;
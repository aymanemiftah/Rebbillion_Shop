import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteLogin =({user,children})=>{
   
    if(user && user?.role === 'admin'){
        return <Navigate to={'/Admin/Dashboard'} />;
    }else{} 
    if(user && user?.role === 'manager'){
        return <Navigate to={'/Manager/Dashboard'} />;
   }else{}
    if(user && user?.role === 'user'){
        return <Navigate to={'/'} />;
    }

     
    return children;

}
export default ProtectedRouteLogin;
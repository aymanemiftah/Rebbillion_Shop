import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRouteIsLogin=({user,children})=>{

    if(!user){
        return <Navigate to={'/Login'} />
    }
    return children
}

export default ProtectedRouteIsLogin;
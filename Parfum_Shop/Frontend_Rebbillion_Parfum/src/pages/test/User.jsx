import React from "react"
import { AuthContext } from "../../components/Context/AuthContext/AuthContext";
import { useContext } from "react";
export default function User(){
    const {logout}=useContext(AuthContext)
    const handleLogout =() => { 
        logout();
    };
    return(<>
    <h3>page User</h3>
    <button onClick={handleLogout}>logout</button>
    </>)
}
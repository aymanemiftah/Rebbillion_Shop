import React from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/AuthContext/AuthContext";
import { useContext } from "react";
export default function Manger(){
    const {logout}=useContext(AuthContext)
    const navigate = useNavigate('');
    const handleLogout =() => { 
        logout();
        navigate("/");
    };
    return(<>
    <h3 >page Manger</h3>
    <button onClick={handleLogout}>logout</button>
    </>)
}
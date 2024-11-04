import React from "react";
import { AuthContext } from "../../components/Context/AuthContext/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function Admin(){
    const {logout}=useContext(AuthContext)
    const navigate = useNavigate('');
    const handleLogout =() => { 
        logout();
        navigate("/");
    };
    return(<>
    <h3>page Adminsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</h3>
    <button onClick={handleLogout}>logout</button>
    </>)
}
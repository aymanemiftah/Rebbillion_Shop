import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";

export default function Logout(props) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate('');

    const handleLogout = () => { 
        logout();
        navigate("/"); 
    };

    return (
        <button onClick={handleLogout} className={props.disign}>
           LogOut
        </button>
    );
}
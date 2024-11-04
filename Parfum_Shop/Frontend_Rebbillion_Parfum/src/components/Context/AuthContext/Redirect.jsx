import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Redirect= () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate('');

    useEffect(()=>{
        if(user){
            if(user.role === 'admin'){
                navigate('/Admin/Dashboard')
            }else if(user.role === 'manager'){
                navigate('/Manager/Dashboard')
            }else{
                navigate('/')
            }
        }
    },[user,navigate]);
    return null;
}

export default Redirect;
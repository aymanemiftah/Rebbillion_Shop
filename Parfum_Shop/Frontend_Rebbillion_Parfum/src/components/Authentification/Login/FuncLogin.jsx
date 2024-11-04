import React,{useContext} from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import FormLogin from "./FormLogin";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { useState } from "react";
export default function FuncLogin(){
    const navigate = useNavigate('');
    const {login}=useContext(AuthContext);
    const [errors, setErrors] = useState({});
    
    

    const handlelogin = async (e, email, password) => {
        e.preventDefault();
        try {
          await login({ email, password });
          showSuccessAlert('Login Successful');
          navigate('/Redirect');
        } catch (error) {
          if (error && error.data && error.data.errors) {
            setErrors(error.data.errors);
            showFailedAlert("Failed to Login, try again");
        } else if (error.response && error.response.status === 401) {
            setErrors({ email: ["The email or password is incorrect."]});
            showFailedAlert("The password is incorrect.");
        } else {
            setErrors({ general: ["An unexpected error occurred. Please try again."] });
            showFailedAlert("An unexpected error occurred.");
        }
            }
      };
    return(
    <>
    <FormLogin handlelogin={handlelogin}  errors={errors} Successefuly={showSuccessAlert} Faild={showFailedAlert} />
    </>
    )


}
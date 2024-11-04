import React, { useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import FormRegistre from "./FormRegistre";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
export default function FuncRegistre(){
    const {Registre}=useContext(AuthContext)
    const [errors,setErrors]=useState({});
    

    const navigate=useNavigate('');

    const handleRegistre =async (e,name,email,address,phonenumber,password,confirmation_password)=>{
        e.preventDefault();
        try {
            const user={name:name,email:email,address:address,phonenumber:phonenumber,password:password,confirmation_password:confirmation_password};
            await Registre(user);
            showSuccessAlert("You Have Account Now try to login ")
            navigate('/login')
        } catch (error) {
            if(error.data.errors){
                setErrors(error.data.errors)
                showFailedAlert('Failed to create Account try again')
            }
        }
        
    }
    return (
    <>
    <FormRegistre handleRegistre={handleRegistre}  Successefuly={showSuccessAlert} Faild={showFailedAlert} errors={errors}  />
    </>)

}
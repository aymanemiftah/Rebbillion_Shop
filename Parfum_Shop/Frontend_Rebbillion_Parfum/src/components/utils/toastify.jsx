import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";


export const showSuccessAlert = (message)=>{
    
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        
        });
}
export const showFailedAlert = (message)=>{
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
       
        });
}
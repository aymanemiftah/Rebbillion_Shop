import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { axiosClient } from '../../../api/axios';
import { showSuccessAlert } from '../../utils/toastify';
import MyButton from '../../ButtonLoading/Button';

export default function ForgetPassword ()  {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading,setloading]=useState(false)
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            const response = await axiosClient.post("/api/forget-password", { email });
            setMessage(response.data.message); 
            showSuccessAlert("Check your Email")
        } catch (error) {
            setMessage(error.response.data.email); 
        }finally{
            setloading(false)
        }
    };

    return (
<>
    {message && (
        showSuccessAlert
    )}
    <div className="flex items-center justify-center min-h-screen bg-gray-200"> {/* Light gray background */}
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"> {/* Card style for the form with shadow */}
            <h1 className="text-gray-800 font-bold text-3xl text-center mb-4">Forgot Password</h1> {/* Centered title */}
            <p className="text-sm font-normal text-gray-600 text-center mb-6">Don't worry! Enter your email and we'll help you reset your password.</p> {/* Subtitle */}
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg py-2 px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none w-full"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                </div>
                <MyButton type={'submit'} text={'Reset Password'} loading={loading}  />
            </form>
        </div>
    </div>
</>
    );
};


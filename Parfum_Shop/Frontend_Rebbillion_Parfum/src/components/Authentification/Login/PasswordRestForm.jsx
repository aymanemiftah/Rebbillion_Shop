import { axiosClient } from '../../../api/axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showFailedAlert, showSuccessAlert } from '../../utils/toastify';
import MyButton from '../../ButtonLoading/Button';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
    const query = useQuery();
    const token = query.get('token');  
    const email = query.get('email'); 
    const navigate = useNavigate(); 

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading,setloading]=useState(false)
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)

        try {
            const response = await axiosClient.post('/api/reset-password', {
                email: email,
                token: token,
                password: password,
                password_confirmation: passwordConfirmation,
            });

            console.log('Password reset successful:', response.data);
            showSuccessAlert('Your Password Changed Successfuly');

            navigate("/login"); 
        } catch (error) {
            showFailedAlert('Error resetting password');
        }finally{
            setloading(false);
        }
    };

    return (
       
        
    <div className="flex items-center justify-center min-h-screen bg-gray-200"> 
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"> 
            <h1 className="text-gray-800 font-bold text-3xl text-center mb-4">Reset Password</h1> 
            
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg py-2 px-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none w-full "
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            type="password"
                            placeholder="New Password"
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 border-gray-300 rounded-lg py-2 px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none w-full"
                            onChange={(e) => setPasswordConfirmation(e.target.value)} 
                            value={passwordConfirmation} 
                            type="password"
                            placeholder=" Confirmation password"
                            required
                        />
                    </div>
                </div>
                <MyButton text={'Reset Password'} type={'submit'} loading={loading}/>
            </form>
        </div>
    </div>
    
    
    );
};

export default ResetPassword;